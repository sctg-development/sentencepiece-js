# Token Count React App

This directory contains a simple React 18 application that demonstrates the use of the Meta Llama 3.1 tokenizer model for counting tokens. The application is built with React 18, Vite, and the Fluent UI v9 framework.

## Overview

The main component of the application is defined in `App.tsx`. It uses Fluent UI components to create a card layout that includes a header, a text analyzer, and a footer. The text analyzer allows users to input text and count the tokens using the Llama 3.1 tokenizer model.

### Key Features

- **React 18**: Utilizes the latest features of React 18.
- **Vite**: A fast build tool for modern web projects.
- **Fluent UI v9**: Provides a consistent and modern UI framework.

## File Structure

- `App.tsx`: The main component that sets up the layout and integrates the text analyzer.
- `TextAnalyzer.tsx`: A component that handles text input and token counting.
- `vite.config.ts`: Configuration file for Vite.

## Usage

To run the application locally, follow these steps:

1. **Install dependencies**:

    ```sh
    npm install
    ```

2. **Start the development server**:

    ```sh
    npm run dev
    ```

3. **Build the application**:

    ```sh
    npm run build
    ```

4. **Preview the production build**:

    ```sh
    npm run preview
    ```

## Deployment

The application can be deployed to GitHub Pages. Ensure that the `base` property in `vite.config.ts` is set correctly to the URL where the app will be hosted.

## Example

You can see the application in action on GitHub Pages: [Sentencepiece Token Counter](https://sctg-development.github.io/sentencepiece-js/).

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.

## Author

Ronan Le Meillat

For more information, visit the [GitHub repository](https://github.com/sctg-development/sentencepiece-js).
