
import { openai } from "$lib/server/gptAccess.ts"

import { error } from "@sveltejs/kit";



export async function POST({
    url, request
}) {
    const json = (await request.json());
    const prompt = json.prompt
    const temp = json.temp
    try {
        const res = await openai.createCompletion(
            {
                model: "text-davinci-003",
                prompt: prompt,
                temperature: temp,
                max_tokens: 1000,
                best_of: 1
            }
        )

        return new Response(res.data.choices[0].text);
    }
    catch (err) {
        throw error(400, err.response.data)
    }

}

