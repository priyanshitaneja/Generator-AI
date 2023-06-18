export default function buildPrompt({ tone, title, keywords }) {
  return `Generate a ${tone} blog post on ${title}. Ensure that the response is formatted in modern, semantic HTML5 with a focus on SEO optimization. Incorporate the following keywords throughout the article: ${keywords.join(
    ', '
  )}.`;
}
