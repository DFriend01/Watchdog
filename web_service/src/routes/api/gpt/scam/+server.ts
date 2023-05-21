
import { openai } from "$lib/server/gptAccess.ts"

import { error } from "@sveltejs/kit";



export async function POST({
    request
}) {
    const json = (await request.json());
    const prompt = json.prompt
    const temp = json.temp ? json.temp : 0.4
    try {
        const res = await openai.createCompletion(
            {
                model: "text-davinci-003",
                prompt: prompt,
                temperature: temp,
                max_tokens: 1000,
                best_of: 1,
            }
        )
        //
            const response =  new Response(res.data.choices[0].text +`(temp: ${temp}, model:${"text-davinci-003"}, prompt:${prompt})`);
            response.headers.append('Access-Control-Allow-Origin', "*")
            
        return response
    }
    catch (err) {
        throw error(400, err.response.data)
    }

}

