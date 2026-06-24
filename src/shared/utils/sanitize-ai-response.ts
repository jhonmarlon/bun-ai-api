export async function* sanitizeAIResponseStream(stream: AsyncIterable<string>) {
    let fullResponse = "";

    for await (const chunk of stream) {
        fullResponse += chunk;
    }

    const sanitizedResponse = sanitizeAIResponse(fullResponse);
    yield sanitizedResponse;
}

export function sanitizeAIResponse(content: string) {
    return content
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}
