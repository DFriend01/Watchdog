<script context="module">
</script>

<script lang="ts">
  import ContentDrop from "$lib/ContentDrop.svelte";

  import PromptButton from "$lib/promptButton.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  // import Device from 'svelte-device-info'
  let keyBoardPadding = false;

  function DeviceIsPhone() {
    var ViewportWidth = window.innerWidth;
    var ViewportHeight = window.innerHeight;
    var smallerEdgeSize = Math.min(ViewportWidth, ViewportHeight);
    var largerEdgeSize = Math.max(ViewportWidth, ViewportHeight);
    return smallerEdgeSize <= 480 && largerEdgeSize <= 896;
  }

  let mobile: boolean = false;
  $: {
    if (mobile && keyBoardPadding) {
      setTimeout(() => {
        scrollTo({
          top: 10000,
          behavior: "smooth",
        });
      }, 100);
    }
  }
  onMount(() => {
    mobile = DeviceIsPhone();
  });

  let prompt = "";

  const apiRoute = "/api/gpt/scam";

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

            `,
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
            `,

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
    Promise.all(questions.map((item) => askGPT(prompt, item.prompt))).then(
      (res) => {
        results = res.map((item) => item.replace(/^[^\w]*/g, ""));
      }
    );
  }
</script>

<div class="watchdog-container" class:padBottom={keyBoardPadding && mobile}>
  <div class="watchdog-content-container">
    {#if loading}
      <h4>Currently Loading...</h4>
    {/if}

    {#if results.length === 0 && !loading}
      <h4>Watch out for suspicious stuff with Watchdog</h4>
      <p class="paragraph">
        Watch out for scams and stuff with Watchdog, your AI-powered protector
        from suspicious stuff online. Try it with the following prompts below.
      </p>
      <div class="prompts-container">
        <PromptButton content="LinkedIn Job Offer Scam" on:click={()=>prompt=`Hi Mary, I took a look at your LinkedIn profile and I think you have some relevant experience for a part-time role that my firm is hiring for. I realize that you might not have experience in finance, but would you be interested in making an extra 3k-4k on a flexible basis? You will only be require to work 7 hours a week.

          Let me know if you are interested and we can set up a 30 minute Zoom call. I can present a PowerPoint presentation describing your role and what you would be doing.
          
          Cheers,
          John`}/>
        <div class="prompts-container">
          <PromptButton content="Package Delivery Scam" on:click={()=>prompt=`Sorry, we seem to have misplaced your Amazon order.

            Don't worry, we're ready to help find it and get it back to you as soon as possible.
            
            All we need is for you to click on the button and fill out your information so we can get your order back to you.
            
            We will also throw in an Amazon gift card, as an apology. Recover your Amazon order and receive your gift card here:
            
            Thank you for choosing Amazon and sorry for any inconvenience.`}/>
        </div>
        <div class="prompts-container">
          <PromptButton content="Investment Scam" on:click={()=>prompt=`Brooooo, I've made over 10,000 dollars in just one week since I started investing in NFTs! I think they are a very good investment option, but I'm only sharing this with you because I trust that you won't tell anyone else. If you are interested, I can give you some recommendations on what to invest in. Want to talk about it sometime tomorrow?`}/>
        </div>
      </div>
    {/if}

    {#if results.length > 0}
      <p style="font-weight:bold; margin-top:auto;">Results</p>
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

  <div class="input-container" class:moveUp={keyBoardPadding && mobile}>
    <input
      bind:value={prompt}
      type="text"
      placeholder="Enter prompt here…"
      on:focus={() => (keyBoardPadding = true)}
      on:focusout={() => (keyBoardPadding = false)}
    />
    <button on:click={checkQuestions}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-5 h-5"
      >
        <path
          d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"
        />
      </svg>
    </button>
  </div>
</div>

<style>
  .moveUp {
    transform: translate(0, -30vh);
  }
  .padBottom {
    padding-bottom: 30vh;
  }
  .watchdog-content-container {
    padding: var(--sp-20);
    padding-top: var(--sp-48);
  }

  .watchdog-container {
    background-color: #fafafa;
    min-height: 100vh;

    padding-bottom: 5rem;
  }

  .input-container {
    background: linear-gradient(
      180deg,
      rgba(239, 246, 255, 0) 0%,
      #eff6ff 100%
    );
    display: flex;
    position: fixed;
    bottom: 0;
    padding: var(--sp-20);
    width: 100%;
    gap: var(--sp-12);
  }

  .input-container > input {
    width: calc(
      100% - var(--sp-40) - var(--sp-56) - var(--sp-24) - var(--sp-12)
    );
    border-radius: var(--sp-8);
    border: 1px solid var(--slate-300);
    padding: var(--sp-12);
  }

  *:focus {
    outline: none;
    border: 1px solid var(--slate-500);
  }

  input {
    font-family: "Manrope", sans-serif;
    font-size: var(--sp-16);
  }

  .input-container > button {
    width: var(--sp-56);
    height: auto;
    aspect-ratio: 1 / 1;
    color: var(--white);
    background-color: var(--primary-600);
    border-radius: var(--sp-12);
    padding: var(--sp-16);
    border: none;
  }

  .input-container > button:hover {
    background-color: var(--primary-700);
  }

  .prompts-container {
    margin-top: var(--sp-40);
    display: flex;
    flex-direction: column;
    gap: var(--sp-12);
  }

  .overline-3 {
    color: var(--text-sm);
  }

  .body {
    color: var(--text-lg);
  }
</style>
