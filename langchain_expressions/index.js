import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";


const topic = "ice cream";
const message = ["human", "Tell me a short joke about {topic}"];

const prompt = ChatPromptTemplate.fromMessages([
  message
]);

const model = new ChatOpenAI({});
const outputParser = new StringOutputParser();

// Notice in this line we're chaining our prompt, LLM model and output parser together:
const chain = prompt.pipe(model).pipe(outputParser);

const response = await chain.invoke({
  topic
});
console.log(topic, message)
console.log(response);


// source: https://js.langchain.com/docs/expression_language/get_started
// The .pipe() method allows for chaining together any number of runnables. 
// It will pass the output of one through to the input of the next.

// Here, the prompt is passed a topic and when invoked it returns a formatted string with the {topic} input variable replaced with the string we passed to the invoke call. 
// That string is then passed as the input to the LLM which returns a BaseMessage object. 
// Finally, the output parser takes that BaseMessage object and returns the content of that object as a string.

// And lastly we pass our model output to the outputParser, 
// which is a BaseOutputParser meaning it takes either a string or a BaseMessage as input. 
// The StringOutputParser specifically simple converts any input into a string.