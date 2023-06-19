import { useRef, useState } from 'react';
import Card from '../../ui/card/Card';
import Button from '../../ui/button/Button';
import useApp from '../../../hooks/useApp';
import Close from '../../ui/Close';

import styles from './create-task.module.css';

export default function CreateTask({ closeModal }) {
  const [title, setTitle] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState([]);
  const { store, setStore, active } = useApp();
  const ref = useRef();

  const addTask = e => {
    e.preventDefault();
    const currentCategory = active.category;
    const newTask = {
      id: new Date().getTime(),
      title,
      keywords,
    };
    const tasksClone = store[currentCategory].tasks;
    tasksClone.push(newTask);
    setStore({
      ...store,
      [currentCategory]: { ...store[currentCategory], tasks: tasksClone },
    });
    closeModal();
  };

  const handleKeywordInputChange = e => {
    setKeywordInput(e.target.value);
  };

  const handleDelete = delIndex => {
    const newKeywords = keywords.filter((keyword, index) => index !== delIndex);
    setKeywords(newKeywords);
  };

  const handleKeyDown = e => {
    const newKeyword = keywordInput.trim();

    if (e.key === 'Enter' && newKeyword) {
      e.preventDefault(); // prevent form from submitting
      // add new keyword
      setKeywords([...keywords, newKeyword]);
      // reset keyword input
      setKeywordInput('');
    } else if (e.key === 'Backspace' && newKeyword.length === 0) {
      setKeywords(keywords.slice(0, keywords.length - 1));
    }
  };

  return (
    <Card>
      <form className={styles.form} onSubmit={addTask}>
        <p>add new task</p>
        <div className={styles.container}>
          <label htmlFor="title">title</label>
          <input
            className={styles.title}
            type="text"
            id="title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="title">keywords</label>
          <div
            className={styles.keywords}
            tabIndex={0}
            onFocus={() => ref.current.focus()}
            onBlur={() => ref.current.blur()}
          >
            {keywords.map((keyword, index) => {
              return (
                <div className={styles.keyword} key={index}>
                  {keyword}
                  <Close
                    className={styles.close}
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  />
                </div>
              );
            })}
            <input
              ref={ref}
              className={styles.keywordInput}
              type="text"
              value={keywordInput}
              onChange={handleKeywordInputChange}
              onKeyDown={handleKeyDown}
              placeholder={keywords.length === 0 ? 'Type and press enter' : ''}
            />
          </div>
        </div>
        <Button>
          <input
            type="submit"
            className={styles.submit}
            value={'+  Add Task'}
          />
        </Button>
      </form>
    </Card>
  );
}
