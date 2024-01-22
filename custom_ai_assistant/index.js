import { OpenAI } from "openai";
import "dotenv/config";

const ASSISTANT_ID = process.env.ASSISTANT_ID;

const client = new OpenAI({
});

const messages = [
  {
    "role": "user",
    "content": "What's the most livable city in the world?",
  }
]
// # Create a thread with a message.
const thread = await client.beta.threads.create({
  messages
});
console.log(thread);

// # Submit the thread to the assistant (as a new run).
const run = await client.beta.threads.runs.create(
  thread.id, { assistant_id: ASSISTANT_ID }
);
console.log(run);

// # Wait for run to complete.
const response = await client.beta.threads.runs.retrieve(thread.id, run.id)
console.log(response);


// # Get the latest message from the thread.
const messageResponse = await client.beta.threads.messages.list(thread.id);
const answer = messageResponse.data
console.log(answer);
