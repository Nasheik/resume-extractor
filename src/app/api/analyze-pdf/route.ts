import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: Request) {
    const { text } = await request.json();

    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });

    try {
        const response = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 500,
            messages: [
                {
                    role: 'user',
                    content: `Using this resume text, tell me all relevant information, such as, name, email, website, education, work experience, etc. \n Don't summerize anything. I do not want to lose any information :\n\n${text}`
                }
            ]
        });

        return Response.json({
            analysis: response.content[0].text
        });
    } catch (error) {
        console.error('Anthropic API error:', error);
        return Response.json(
            { error: 'Failed to analyze PDF' },
            { status: 500 }
        );
    }
}
