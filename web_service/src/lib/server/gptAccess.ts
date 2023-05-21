
import { Configuration, OpenAIApi } from "openai";

import { KEY } from "$env/static/private";



const gptconfig = new Configuration(
    {
        apiKey: KEY
    }
)

export const openai = new OpenAIApi(gptconfig)


