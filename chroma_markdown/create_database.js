import "dotenv/config";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  JSONLoader,
  JSONLinesLoader,
} from "langchain/document_loaders/fs/json";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";

// load documents
// https://js.langchain.com/docs/modules/data_connection/document_loaders/custom
const loader = new DirectoryLoader(
  "chroma_markdown/data",
  {
    ".json": (path) => new JSONLoader(path, "/texts"),
    ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
    ".txt": (path) => new TextLoader(path),
    ".md": (path) => new TextLoader(path),
    ".csv": (path) => new CSVLoader(path, "text"),
  }
);
const docs = await loader.load();
// console.log(docs);


// split text
// https://js.langchain.com/docs/modules/data_connection/document_transformers/recursive_text_splitter
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300,
  chunkOverlap: 100,
});

const chunks = await splitter.splitDocuments(docs);
console.log(`Split ${docs.length} documents into ${chunks.length} chunks.`)

// save to chroma
// https://js.langchain.com/docs/integrations/vectorstores/chroma

const vectorStore = await Chroma.fromDocuments(chunks, new OpenAIEmbeddings(), {
  collectionName: "alice-test-collection",
  url: "http://localhost:8000", // Optional, will default to this value
});
console.log('Saved chunks to Chroma')
