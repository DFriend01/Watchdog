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
            
            // Source: https://www.aura.com/learn/social-media-scams
            prompt: `
                You are an AI assistant who helps consumers identify if text content could be scam. I will provide some warning signs of scams to 
                look out for when you are evaluating your results.

                ===================
                WARNING SIGNS OF SCAMS

                1. Warning signs of a social media investment scam:
                    - Promises of high returns with zero risk.
                    - Professional-looking investment websites or crypto exchanges with little to no information about the company. 
                    - The scammer offers to walk you through your first few trades and claims to have insider knowledge of the market.

                2. Warning signs of a romance scam:
                    - The person wants to quickly move from the social media site to WhatsApp or texting.
                    - They promise to meet in person but come up with excuses for why they can’t.
                    - They repeatedly ask for personal information, like your location or pet’s name. 
                    - The scammer professes their love for you early in the conversation. 
                    - They ask for money or gift cards.  

                3. Warning signs of an account takeover scam:
                    - Your friend is randomly sending messages that don’t fully seem like actual things they would say.
                    - Your friend is randomly posting about investment opportunities or great deals that they just found.

                4. Warning signs of an authentication code scam:
                    - You have received a random text with an authentication code for one of your accounts.
                    - A stranger is texting or messaging you and asking for an authentication code.
                    - Some scammers claim the code is a way to “tell you’re legitimate” on Facebook Marketplace (or other platforms) as a ruse to get you to send them your code. 

                5. Warning signs of a lottery, sweepstakes, or giveaway scam:
                    - You are being asked to pay to receive your prize (i.e., taxes, shipping, processing fees).
                    - You are told that paying increases your chances of winning.
                    - You are asked to provide financial account information or a phone number to claim your prize. 

                6. Warning signs of a job scam:
                    - The job pays extremely well for not much work.
                    - The supposed employer wants you to pay for your own equipment (legitimate companies should provide you with everything you need).
                    - You are sent a check for a large amount and told to deposit it and then send some of the money back to the employer. This is a classic bank scam.

                7. Warning signs of a phishing scam:
                    - An unfamiliar tone or greeting, and especially if they use "Dear" to address you in the beginning of an email.
                    - Grammar and spelling errors in the text or email.
                    - There are threats or a sense of urgency.
                    - There is a request for credentials, payment information, or other personal details.

                ===================
                YOUR TASK
                
                Detect if the provided text after the triple dash lines could be a scam. It is very important that you use 
                the warning signs that I provided you to help you determine if the text is a scam or not. 

                Your answer should include the following:
                
                1. A "Yes" or "No" statement indicating that the text is a scam or not.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.
                4. Do not complete the rest of the text yourself and include it in your answer.

                ---

            `
        },
        {
            yes: "This content could contain misinformation.",
            no: "This content appears to be truthful.",
            prompt: `
                You are an AI assistant that helps consumers identify misinformation on the internet. I will provide you with some warning signs of
                misinformation to look out for when you are evaluating your results.

                =============================
                WARNING SIGNS OF MISINFORMATION

                1. Lack of Credible Sources: Misinformation often lacks references to credible sources or provides unreliable sources that cannot be verified. Look for content supported by reputable organizations, experts, or well-established media outlets.
                2. Sensational or Clickbait Headlines: Misleading or sensational headlines designed to grab attention and evoke strong emotional responses are common in misinformation. If a headline seems too sensational or exaggerated, it's essential to verify the information from reliable sources.
                3. Poor Grammar, Spelling, or Formatting: Misinformation pieces often contain noticeable errors in grammar, spelling, or formatting. While mistakes can occur, a high prevalence of such errors may suggest a lack of editorial oversight or professionalism.
                4. Extreme Biases or One-Sided Perspectives: Misinformation may display extreme biases or present only one side of a story without considering alternative viewpoints. Look for balanced presentations that provide a comprehensive view of the topic.
                5. Lack of Transparency or Anonymity: Misinformation sources often lack transparency regarding their authors, affiliations, or funding sources. Be skeptical of content that does not provide clear information about the people or organizations behind it.
                6. Lack of Dates or Outdated Information: Misinformation may lack dates or provide outdated information, making it difficult to assess the relevance and accuracy of the content. Always check for the timeliness of the information before drawing conclusions.
                7. Emotional Manipulation or Appeal: Misinformation frequently uses emotional appeals to manipulate readers' feelings or provoke strong reactions. Be cautious of content that relies heavily on emotional language or aims to incite anger, fear, or outrage.
                8. Conspiracy Theories or Unverified Claims: Misinformation often promotes conspiracy theories or unverified claims without substantial evidence. Claims that contradict widely accepted facts or lack credible supporting evidence should be viewed skeptically.
                9. Lack of Cross-Referencing: Misinformation sources often lack cross-referencing or verification from multiple reliable sources. Look for information that is corroborated by multiple trustworthy sources to increase confidence in its accuracy.
                10. Echo Chambers or Viral Sharing: Misinformation can spread rapidly within echo chambers or through viral sharing on social media platforms. Be cautious of content that lacks wider exposure or only appears within specific groups or communities.
                11. Intention to scam: Scams are a form of misinformation because the scammer intends to deceive the victim.
                               
                =============================
                YOUR TASK

                Detect if the provided text after the triple dash lines is misinformation or not. It is very important that you use 
                the warning signs that I provided you to help you determine if the text is providing misinformation or not. 

                Your answer should include the following:

                1. A "Yes" or "No" statement indicating that the text is misinformation or not. Answer "Yes" if there is misinformation, and answer "No" if there is no misinformation.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.
                4. Do not complete the rest of the text yourself and include it in your answer.

                ---

            `
        },
        {
            yes: "This content could be Ai generated.",
            no: "This content is probably not Ai generated",
            prompt: `
                You are an AI assistant that helps people identify AI generated text. I will provide some warning signs of AI generated text to look out for
                when determining if the provided text is AI generated or not.

                ============================
                WARNING SIGNS OF AI GENERATED TEXT

                1. Warning signs of Unusual or Inconsistent Language: AI-generated text might contain language patterns that seem unnatural or inconsistent. It could exhibit an odd choice of words, unusual sentence structures, or inconsistent grammar.
                2. Warning signs of Lack of Context or Coherence: AI-generated text may struggle to maintain a coherent and logical flow of information. It might provide irrelevant or nonsensical responses, fail to address specific questions, or exhibit abrupt topic shifts.
                3. Warning signs of Absence of Personal Experience or Emotion: AI lacks personal experiences and emotions, so the generated text might lack subjective opinions, personal anecdotes, or emotional nuances that a human writer would typically include.
                4. Warning signs of Uncommon or Invented Facts: AI-generated text might present information that is unusual, obscure, or even factually incorrect. It could generate statistics, quotes, or historical events that do not exist or are inaccurate.
                5. Warning signs of Consistency and Speed: AI models can generate vast amounts of content quickly and consistently. If you observe a high volume of content that appears to be generated in a short period and lacks human errors or variations, it could suggest AI involvement.

                =============================
                YOUR TASK

                Detect if the provided text after the triple dash lines is generated by AI. It is very important that you use 
                the warning signs that I provided you to help you determine if the text is generated by AI or not. 

                Your answer should include the following:

                1. A "Yes" or "No" statement indicating that the text is generated by AI or not.
                2. You should explain why you came to your conclusion, specifically referencing the originally provided text.
                3. Your response should be no longer than 3 sentences.
                4. Do not complete the rest of the text yourself and include it in your answer.

                ---

                `
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
        <PromptButton content="Prompt AAAAAAAA" on:click={()=>prompt='AAAAAAAAAAAAAA'}/>
        <div class="prompts-container">
          <PromptButton content="Prompt BBBBB" on:click={()=>prompt='BBBBBBBBBBBBBBBBBB'}/>
        </div>
        <div class="prompts-container">
          <PromptButton content="Prompt CCCCCCCCC" on:click={()=>prompt='CCCCCCCCCCCCCCCCCCCCC'}/>
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
