# ask-youtube-ai
An application, named ask-youtube-ai, that loads a list of YouTube URLs into an in-memory vector database, asks questions about the content of those videos, and provides the generated answers along with an indication of which videos contained the information.

https://developer.salesforce.com/blogs/2023/11/building-ai-applications-with-langchain-and-node-js

add .env file with OpenAPI Key (see .env.example)

run `npm install` to install dependencies

`npm run start` to run the code, this will consume your OPENAI free credits and may incur charges


# langchain expressions

run `node langchain_expressions` for basic prompt example

run `node langchain_expressions/rag.js` to run a retrieval-augmented generation chain 


# compare vector of two words with openai

run `node chroma_markdown/compare_embeddings.js`


# rag with markdown and chroma

run `node chroma_markdown/create_database.js` to create the chroma database with chunks of the data files

run `TBD` to retrieve top 3 chunks and ask LLM questions about those relevant chunks