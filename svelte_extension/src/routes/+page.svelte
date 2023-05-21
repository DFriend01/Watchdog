<script lang="ts">
    import { fly } from "svelte/transition";
    import ContentDrop from "./ContentDrop.svelte";

    const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam";
    let text = "";

    let results: string[] = [];
    let loading = false;

    $: if (results.length === questions.length) {
        loading = false;
    }

    const questions = [
        {
            yes: "This Content could be a scam. ",
            no: "This content is most likely not a scam.",

            prompt: `
                You are an AI assistant who helps consumers identify if text content could be scam. 
                Detect if the provided text after the triple dash lines could be a scam. Your answer should include the following:
                
                1. A "Yes" or "No" statement indicating that the text is a scam or not.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.

                ---

            `
            //prompt: "Detect if its possible the following text contains any attempt to scam. Explain your reasoning. Must start the response with Yes if so, or with No otherwise. Respond with N/A if neither.\n\n",
        },
        {
            yes: "This content could contain misinformation.",
            no: "This content appears to be truthful.",
            prompt: `
                You are an AI assistant that helps consumers indentify misinformation on the internet. Detect if the provided text after the triple dash
                lines is truthful or not. Your answer should include the following:

                1. A "Yes" or "No" statement indicating that the text is misinformation or not. If you cannot tell, then indicate this.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.

                ---
            `
            
            //prompt: "Detect if the following text contains false information. Explain your reasoning. Must start the response with yes or no. If neither, say N/A.\n\n",
        },
        {
            yes: "This content could be Ai generated.",
            no: "This content is probably not Ai generated",
            prompt: `
                You are an AI assistant that helps consumers indentify AI generated content on the internet. Detect if the provided text after the triple dash
                lines is made by Ai or not. Your answer should include the following:

                1. A "Yes" or "No" statement indicating that the text is made by Ai or not. If you cannot tell, then indicate this.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.

                ---
            `,
        },
    ];

    async function askGPT(text: string, prompt: string) {
        let stuff = await fetch(apiRoute, {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                prompt: prompt + text,
            }),
        });
        return stuff.text();
    }

    async function checkQuestions() {
        loading = true;
        results = [];
        Promise.all(questions.map((item) => askGPT(text, item.prompt))).then(
            (res) => {
                results = res.map((item) => item.replace(/^([\s\.\,\-\_])*(?:\w)/g, ""));
            }
        );
    }
</script>

<div id="root">
    <span>Watch out for suspicious stuff with</span>
    <h3>Watchdog</h3>

    <label for="textArea">Enter suspicious text here:</label>

    <div style="position:relative;">

        <textarea
            id="textArea"
            placeholder="Type something here..."
            rows="5"
            cols="57"
            bind:value={text}
        />
        <img alt="dog" src="https://watchdog-iota.vercel.app/puppo-1.png"/>
    </div>

    <button on:click={checkQuestions}>Analyse text</button>

    

    {#if loading}
        <span>Loading...</span>
    {/if}
    {#if results.length > 0}
        <p style="font-weight:bold;">Results</p>
    {/if}
    {#each [...Array(results.length).keys()] as i}
        <div in:fly={{ duration: 200, x: -25, delay: 100 * i }}>
            <ContentDrop
                yes={questions[i].yes}
                no={questions[i].no}
                content={results[i]}
            />
        </div>
    {/each}
</div>

<style>
    h3 {
        margin-bottom: 2rem;
    }
    label {
        margin-bottom: 1rem;
    }

    #root {
        height: 100%;

        padding: 1rem;
        background-color: #fafafa;

        border: 2px var(--primary-500) solid;

        display: flex;
        flex-direction: column;
    }
    textarea {
        width: auto;
        /* height: 100%; */

        border-radius: 10px;
        border-color: var(--slate-300);
        padding: 1rem;
        position: relative;
        z-index: 3;
    }

    button {
        color: var(--white);
        background-color: var(--primary-600);
        padding: 0.6rem 0.8rem;
        margin: 0.5rem;
        border: none;
        border-radius: 8px;

        align-self: flex-end;

        transition: background ease-out 0.3s;
        margin-right: 0;
    }

    button:hover {
        background-color: var(--primary-700);
    }


    img {
        position: absolute;
        width:5rem;
        height: auto;
        top: 0;
        right: 2rem;
        z-index: 1;

        transform: translate(0, calc(0.3rem - 100%))
    }
</style>
