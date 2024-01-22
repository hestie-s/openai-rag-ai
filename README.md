
# Retrieval-augmented generation using LangChain and OpenAI

See examples below:

# Ask-youtube-ai
An application, named ask-youtube-ai, that loads a list of YouTube URLs into an in-memory vector database, asks questions about the content of those videos, and provides the generated answers along with an indication of which videos contained the information.

https://developer.salesforce.com/blogs/2023/11/building-ai-applications-with-langchain-and-node-js

add .env file with OpenAPI Key (see .env.example)

run `npm install` to install dependencies

`npm run start` to run the code, this will consume your OPENAI free credits and may incur charges


# Langchain expressions

run `node langchain_expressions` for basic prompt example

run `node langchain_expressions/rag.js` to run a retrieval-augmented generation chain with two custom documents as context


# Compare vector of two words with openai

This example just shows how words are stored as vector and the comparison between words return a value based on the relevance.  A lower score is more relevant e.g. same word would equal 0

run `node chroma_markdown/compare_embeddings.js`


# Rag with markdown and chroma vector database

This example reads a markdown a file, splits into chunks and save to chroma. It then finds the top 3 chunks from chroma that are relevant to the question based on the relevance score and feeds this to the open ai model as context to answer the question.


Step 1: Run Chroma with Docker on your computer

https://docs.trychroma.com/deployment

`docker pull chromadb/chroma`

`docker run -p 8000:8000 chromadb/chroma`

Step 2: Create Chroma Database with documents

run `node chroma_markdown/create_database.js` to create the chroma database with chunks of the data files

Step 3: Query Documents

run `node chroma_markdown/query_data.js` to retrieve top 3 chunks and ask OpenAI Model questions answering from the relevant chunks


# Chat with custom ai assistant 

Create an AI Asssitant using platform.openai.com/assistants and save the Assistant ID in the .env file

run `node custom_ai_assistant` to ask the custom assistant a question and get a response


# Source

LangChain: 

https://js.langchain.com/docs/get_started/introduction

https://api.js.langchain.com/index.html