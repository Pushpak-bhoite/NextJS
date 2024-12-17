import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const genAI = new GoogleGenerativeAI("AIzaSyCfKBbqWJdSZ0S0paOdr3HCjd9YeeGACLY");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

        const result = await model.generateContentStream(prompt);

        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          process.stdout.write('-'+chunkText)
          controller.enqueue(encoder.encode(`event: chunk\ndata: ${JSON.stringify({ chunk: chunkText })}\n\n`));
        }

        const finalQuestions = (await result.response).text().split('||');
        controller.enqueue(encoder.encode(`event: end\ndata: ${JSON.stringify({ questions: finalQuestions })}\n\n`));
      } catch (error) {
        console.error('Error:', error);
        controller.enqueue(encoder.encode(`event: error\ndata: ${JSON.stringify({ error: 'An error occurred' })}\n\n`));
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

