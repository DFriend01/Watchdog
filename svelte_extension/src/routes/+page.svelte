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
            prompt: "Detect if its possible the following text contains any attempt to scam. Explain your reasoning. Must start the response with Yes if so, or with No otherwise. Respond with N/A if neither.\n\n",
        },
        {
            yes: "This content could contain misinformation.",
            no: "This content appears to be truthful.",
            prompt: "Detect if the following text contains false information. Explain your reasoning. Must start the response with yes or no. If neither, say N/A.\n\n",
        },
        {
            yes: "This content could be Ai generated.",
            no: "This content is probably not Ai generated",
            prompt: "Detect if the following text is Ai generated? Explain your reasonings. Must start the response with yes or no. If neither, say N/A.\n\n",
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
                results = res.map((item) => item.trim());
            }
        );
    }
</script>

<div id="root">
    <span>Watch out for suspicious stuff with</span>
    <h3>Watchdog</h3>

    <label for="textArea">Enter suspicious text here:</label>
    <textarea
        id="textArea"
        placeholder="Type something here..."
        rows="5"
        cols="57"
        bind:value={text}
    />

    <button on:click={checkQuestions}>Analyse text</button>

    <p style="font-weight:bold;">Results</p>

    {#if loading}
        <span>Loading...</span>
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
    }

    button:hover {
        background-color: var(--primary-700);
    }
</style>
