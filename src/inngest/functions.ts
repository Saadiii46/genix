import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event, step }) => {
    const summarizerAgent = createAgent({

      name: "summarizer",
      system: "You are an expert summarizer. You summarize in 2 words.",
      model: gemini({ model: "gemini-1.5-flash" }),
    });

    const { output } = await summarizerAgent.run(
      `summarize the following text ${event.data.value}`
    );
    console.log(output);
    

    return { output };
  }
);
