const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function GET(request: Request) {
  console.log('-------------------')
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyCfKBbqWJdSZ0S0paOdr3HCjd9YeeGACLY");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";


    const result = await model.generateContentStream(prompt);

    // Print text as it comes in.
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText);
    }

    return Response.json(
      { success: true, messages: 'I wanna stream response to frontend ' },
      {
        status: 200,
      }
    );


  } catch (error) {
    console.log('error-->', error)
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}





