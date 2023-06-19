import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "./menu-bar/MenuBar";
import Button from "../ui/button/Button";
import useApp from "../../hooks/useApp";
import useGenerate from "../../hooks/useGenerate";
import buildPrompt from "../../utils/buildPrompt";
import LinearLoading from "../ui/linear-loading/LinearLoading";

import { SSE } from "sse.js";

import styles from "./editor.module.css";

const URL = "https://xzcrqccpdldulsshrrci.supabase.co/functions/v1/openai";
const streamEndIndicator = "[DONE]";

export default function Editor() {
  const [content, setContent] = useState({ id: null, text: "" });

  const { store } = useApp();
  const [{ tone, isLoading, isGenerating }, dispatch] = useGenerate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const taskId = searchParams.get("task");
  const prompt = buildPrompt({
    tone,
    ...store[category].tasks.filter((task) => task.id == taskId)[0],
  });

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content.text,
  });

  const editorRef = useRef(editor);

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  useEffect(() => {
    if (editorRef.current) editorRef.current.commands.setContent("");
    setContent({ id: null, text: "" });
  }, [tone]);

  useEffect(() => {
    if (!isLoading) return;
    editorRef.current.setOptions({ editable: false }); // make editor read-only when loading

    const retryLimit = 3;
    let retryCount = 0;

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
      payload: JSON.stringify({
        prompt: prompt,
      }),
    };

    let eventSource = new SSE(URL, config);

    eventSource.addEventListener("error", (e) => {
      console.error("Error occurred:", e);
      eventSource.close();

      if (retryCount < retryLimit) {
        console.log(`Retrying (${retryCount + 1}/${retryLimit})...`);
        retryCount++;
        setTimeout(() => {
          eventSource = new SSE(URL, config);
        }, 2000); // Retry after 2 seconds
      } else {
        dispatch({ type: "set status", isLoading: false, isGenerating: false });
        editorRef.current.setOptions({ editable: true });
      }
    });
    eventSource.addEventListener("message", (e) => {
      editorRef.current.commands.focus("end");

      if (!isGenerating)
        dispatch({ type: "set generating", isGenerating: true });

      const response = e.data;
      if (response === streamEndIndicator) {
        console.log(response, streamEndIndicator);
        dispatch({ type: "set status", isLoading: false, isGenerating: false });
        eventSource.close();
        editorRef.current.setOptions({ editable: true });
        return;
      }
      const json = JSON.parse(response);
      const text = json.choices[0].text;
      const id = json.id;
      console.log(text);

      setContent(({ text: prevText }) => {
        editorRef.current.commands.setContent(prevText + text);
        return { id, text: prevText + text };
      });
    });

    eventSource.stream();

    return () => {
      eventSource.close();
    };
  }, [prompt, isLoading, isGenerating, dispatch]);

  const handleImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className={styles.container}>
      <MenuBar editor={editor} />
      {isLoading && <LinearLoading />}
      <div className={styles.img_btn}>
        <Button onClick={handleImage}>
          Add image from URL
        </Button>
      </div>
      <EditorContent editor={editor} className={styles.editor} />
    </div>
  );
}
