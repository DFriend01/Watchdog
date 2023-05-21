<script lang="ts">
    import Divider from "./Divider.svelte";


    const apiRoute = "https://watchdog-iota.vercel.app/api/gpt/scam"
    let url: string;

    let text = ""

    let response = ""


    async function askGPT(){
        response = "Loading response"

        fetch(apiRoute, {
    
            method:"POST",
            body: JSON.stringify({
                prompt: "Check if there are anything scam related in the following text." + text
            })
        }).then(res=>res.text()).then(
            txt => response = txt
        )
    }
</script>

<div id="root" >

    <h1>
        Watch_Dog 
    </h1>
    <p>Enter your scam here</p>
    <textarea placeholder="woof woof"  bind:value={text}/>
    <button on:click={askGPT}>GO</button>

    {#if response}
        <Divider/>
        GPT Response:
        <p>{response}</p>

    {:else}
        Nothing here yet.

    {/if}
</div>

<style>
    #root {
        padding: 1rem;
        font-family: "Courier New", monospace;
    }

    h1 {
        margin: 0.5rem;
        font-size: larger;
        text-shadow: 2px 2px #0000005e;

        background: linear-gradient(to left, black 30%, transparent 100%),
            url(https://grainy-gradients.vercel.app/noise.svg);
        filter: contrast(200%) brightness(1000%);
    }

    textarea {
        width: 380px;
        height: 200px;
    }

    /*  url(https://grainy-gradients.vercel.app/noise.svg);  */
</style>
