import { inngest } from "./client";
import { createAgent, gemini } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("genix-nextjs-saad");
      return sandbox.sandboxId;
    })

    const summarizerAgent = createAgent({

      name: "summarizer",
      system: "You are an expert summarizer. You summarize in 2 words.",
      model: gemini({ model: "gemini-1.5-flash-8b" }),
    });

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    })

    const { output } = await summarizerAgent.run(
      `summarize the following text ${event.data.value}`
    );
    console.log(output);
    

    return { output, sandboxUrl };
  }
);
