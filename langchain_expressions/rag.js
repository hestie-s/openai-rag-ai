import "dotenv/config";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  RunnableLambda,
  RunnableMap,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const vectorStore = await HNSWLib.fromDocuments(
  [
    new Document({ pageContent: "Hestie works at Waracle" }),
    new Document({ pageContent: "Hestie likes ice cream." }),
  ],
  new OpenAIEmbeddings()
);
const retriever = vectorStore.asRetriever(1);

const prompt = ChatPromptTemplate.fromMessages([
  [
    "ai",
    `Answer the question based on only the following context:
  
{context}`,
  ],
  ["human", "{question}"],
]);
const model = new ChatOpenAI({});
const outputParser = new StringOutputParser();

const setupAndRetrieval = RunnableMap.from({
  context: new RunnableLambda({
    func: (input) =>
      retriever.invoke(input).then((response) => response[0].pageContent),
  }).withConfig({ runName: "contextRetriever" }),
  question: new RunnablePassthrough(),
});
const chain = setupAndRetrieval.pipe(prompt).pipe(model).pipe(outputParser);

const questions = ["Where does Hestie work?", "What does Hestie do?", "What does Hestie like?"];

for (const question of questions) {
  const response = await chain.invoke(question);
  console.log(question, response);
}


// context -> this is a RunnableLambda which takes the input from the .invoke() call, 
// makes a request to our vector store, and returns the first result.

// question -> this uses a RunnablePassthrough which simply passes whatever the input was through to the next step, 
// and in our case it returns it to the key in the object we defined.

// Both of these are wrapped inside a RunnableMap. 
// This is a special type of runnable that takes an object of runnables and executes them all in parallel.