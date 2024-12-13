// const { GoogleGenerativeAI } = require("@google/generative-ai");

// export async function GET(request: Request) {
//   console.log('-------------------')
//   try {
//     const genAI = new GoogleGenerativeAI("AIzaSyCfKBbqWJdSZ0S0paOdr3HCjd9YeeGACLY");
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";


//     const result = await model.generateContentStream(prompt);

//     // Print text as it comes in.
//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       process.stdout.write(chunkText);
//     }

//     return Response.json(
//       { success: true, messages: 'I wanna stream response to frontend ' },
//       {
//         status: 200,
//       }
//     );


//   } catch (error) {
//     console.log('error-->', error)
//     return Response.json(
//       { message: 'Internal server error', success: false },
//       { status: 500 }
//     );
//   }
// }








// src/app/api/ai-messages/route.ts
import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request: NextRequest) {
  // Set up streaming headers
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-open',
    'Access-Control-Allow-Origin': '*'
  };

  // Create a TransformStream for streaming
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
console.log('------------>>>>-----------')
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Write initial event
    await writer.write(encoder.encode(`event: start\ndata: Generating questions...\n\n`));

    const result = await model.generateContentStream(prompt);
    let fullText = '';

    // Stream the response
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      process.stdout.write(chunkText);
      // Send each chunk to the client
      await writer.write(encoder.encode(`event: chunk\ndata: ${JSON.stringify({ chunk: chunkText })}\n\n`));
    }

    // Parse and send final questions
    const questions = fullText.split('||').map(q => q.trim()).filter(q => q);
    await writer.write(encoder.encode(`event: end\ndata: ${JSON.stringify({ questions })}\n\n`));

    // Close the stream
    await writer.close();

    // Return the readable stream with appropriate headers
    return new Response(readable, { 
      headers,
      status: 200 
    });

  } catch (error) {
    console.error('Error generating questions:', error);
    
    // Write error event
    await writer.write(encoder.encode(`event: error\ndata: ${JSON.stringify({ 
      message: 'Failed to generate questions',
      error: error instanceof Error ? error.message : 'Unknown error'
    })}\n\n`));

    await writer.close();

    return new Response(readable, { 
      headers,
      status: 500 
    });
  }
}