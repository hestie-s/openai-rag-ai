import "dotenv/config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PairwiseEmbeddingDistanceEvalChain } from 'langchain/evaluation'

const embedding_functions = new OpenAIEmbeddings();

// # Get embedding for a word.
const vector = await embedding_functions.embedQuery("apple");
console.log(`Vector for 'apple': ${vector}`)
console.log(`Vector length: ${(vector.length)}`)

//  # Compare vector of two words
const evaluator = new PairwiseEmbeddingDistanceEvalChain();
const words = ["apple", "iphone"];
const x = await evaluator.evaluateStringPairs({
  prediction: words[0],
  predictionB: words[1]
});
console.log(`Comparing (${words[0]}, ${words[1]})`)
console.log(x)
