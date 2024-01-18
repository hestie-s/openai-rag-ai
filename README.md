# ask-youtube-ai
An application, named ask-youtube-ai, that loads a list of YouTube URLs into an in-memory vector database, asks questions about the content of those videos, and provides the generated answers along with an indication of which videos contained the information.

https://developer.salesforce.com/blogs/2023/11/building-ai-applications-with-langchain-and-node-js

add .env file with OpenAPI Key (see .env.example)

run `npm install` to install dependencies

`npm run start` to run the code, this will consume your OPENAI free credits and may incur charges


# langchain expressions

run `node langchain_expressions` for basic prompt example

run `node langchain_expressions/rag.js` to run a retrieval-augmented generation chain with two custom documents as context


# compare vector of two words with openai

run `node chroma_markdown/compare_embeddings.js`


# rag with markdown and chroma 
This example reads a markdown a file, splits into chunks and save to chroma. It then finds the top 3 chunks from chroma that are relevant to the question based on the relevance score and feeds this to the open ai model as context to answer the question.

run `node chroma_markdown/create_database.js` to create the chroma database with chunks of the data files

run `TBD` to retrieve top 3 chunks and ask LLM questions about those relevant chunks


# chat with custom ai assistant 

Create an AI Asssitant using platform.openai.com/assistants and save the Assistant ID in the .env file

run `node custom_ai_assistant` to ask the custom assistant a question and get a response