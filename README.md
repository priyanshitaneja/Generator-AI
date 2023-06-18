# Topic Manager and Blog Editor

This repository contains a web application built using React, Vite, Tiptap, and Supabase Edge Functions that allows users to manage topics and write blogs with generated content using ChatGPT.

## Features

- Categorized Topic Manager: Users can view a list of topics arranged by category. Each topic displays its name and associated keywords.
- Topic Deletion: Users can delete topics from the list.
- Blog Editor: Users can open the blog editor to write new blog posts.
- Content Generation: The blog editor integrates with ChatGPT to generate blog content based on user-selected tones.
- Undo Functionality: The blog editor supports the undo feature using the Ctrl+Z keyboard shortcut.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Usage

1. Access the application in your browser at `http://localhost:3000`.
2. View the list of topics and their associated keywords.
3. Delete topics by clicking the delete button.
4. Click the "Write" button to open the blog editor.
5. Select a tone for the blog content and press the "Generate" button to generate the blog text.
6. Edit the blog text as needed.
7. Use the Ctrl+Z keyboard shortcut to undo changes in the editor.

## Running supabase edge function locally

1. [Edge Functions](https://supabase.com/docs/guides/functions)
2. [Developing Functions locally](https://supabase.com/docs/guides/functions/local-development)

## Technologies Used

- React
- Vite (Build tool for fast development)
- Tiptap (WYSIWYG editor for blog content)
- Supabase Edge Functions (Serverless functions for calling OpenAI)
- ChatGPT (Integration for content generation)

## Continued Development

This project is currently in active development. Planned enhancements include:

- Generate keywords given a topic.
- Improved keyword highlighting in the topic list.
- Image support in the blog editor. (Explore other alternatives to TipTap)
- Implementation of a search feature for topics.
- Incorporating user-provided references for content modeling to generate more personalized and targeted blog posts.
- Add options to export content generated (Copy, Download etc)

## Known Issues

- **Token Limit**: To manage the usage of free tokens, I have set a response limit of 500 tokens. This means that in some cases, the generated blog might be cut off if it exceeds this limit.

- **Token Availability**: Please note that since I am using the free tier of ChatGPT, there is a chance that I might run out of free tokens, resulting in the blog not being generated. However, I've implemented a 3x retry mechanism to handle this situation before giving up.

- **API Demand**: The ChatGPT API may experience high demand, which can lead to initial request failures. In such cases, the retry mechanism will attempt the request multiple times before giving up.

## Contributing

Contributions to the project are welcome. If you have any suggestions, bug fixes, or feature implementations, please create a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
