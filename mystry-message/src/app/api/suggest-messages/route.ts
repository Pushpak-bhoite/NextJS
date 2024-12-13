    import { NextRequest, NextResponse } from 'next/server';
    import { OpenAI } from 'openai';

    // Initialize OpenAI SDK
    const openai = new OpenAI({
    });

    // Define the API route handler
    export async function GET(req: NextRequest) {
    try {
        // Make the API call to OpenAI

        const { choices } = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Use 'gpt-4' if needed
        messages: [
            {
            role: 'user',
            content: 'Generate three random, engaging questions suitable for a diverse audience on an anonymous messaging platform like Qooh.me.',
            },
        ],
        });

        // Return the generated questions
        const questions = choices[0]?.message?.content?.trim();
        return Response.json({ questions });
    } catch (error) {
        console.error('Error fetching from OpenAI:', error);
        return Response.json({ error: 'Failed to generate questions' }, { status: 500 });
    }
    }
