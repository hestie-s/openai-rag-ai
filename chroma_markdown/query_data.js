
import "dotenv/config";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const queryText = "How does Alice meet the Mad Hatter?"


const vectorStore = await Chroma.fromExistingCollection(
  new OpenAIEmbeddings(),
  { collectionName: "alice-test-collection" }
);

const results = await vectorStore.similaritySearchWithScore(queryText, 3);
// console.log(response)

const context = results.reduce((result, currentObj) => {
  return result + currentObj[0].pageContent + '\n\n---\n\n';
}, '');

// console.log(context)

// https://js.langchain.com/docs/modules/model_io/prompts/quick_start
const prompt = PromptTemplate.fromTemplate(
  `Answer the question based only on the following context:

  {context}
  
  ---
  
  Answer the question based on the above context: {question}`
);
const formattedPrompt = await prompt.format({
  context,
  question: queryText
});

console.log(formattedPrompt)


const llm = new OpenAI({});
const response = await llm.invoke(formattedPrompt);
console.log(`Response: ${response}`);


const source = results.map(el => el[0].metadata.source);
console.log(`Source: ${source}`);


// Chat see https://js.langchain.com/docs/modules/model_io/chat/quick_start