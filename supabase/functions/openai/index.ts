import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from './../_shared/cors.ts';

serve(async req => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  try {
    const { prompt } = await req.json();
    return fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0.2,
        presence_penalty: 0,
        stream: true,
      }),
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
});

/**
 * 
   curl -i --location --request POST 'http://localhost:54321/functions/v1/openai' \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
  --header 'Content-Type: application/json' \
  --data '{"prompt":"Generate a Engaging blog post on Crafting a compelling elevator pitch. Ensure that the response is formatted in modern, semantic HTML5 with a focus on SEO optimization. Incorporate the following keywords throughout the article: elevator pitch, startup, communication, idea, business, pitching, presentation."}'
 */
