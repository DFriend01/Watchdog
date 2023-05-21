<script context="module">
</script>

<script lang="ts">
  import PromptButton from "$lib/promptButton.svelte";
  import { onMount } from "svelte";
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
    console.log(mobile)
  }
  onMount(() => {
    mobile = DeviceIsPhone();
  });
</script>

<div class="watchdog-container" class:padBottom={keyBoardPadding && mobile}>
  <div class="watchdog-content-container">
    <h4>Watch out for suspicious stuff with Watchdog</h4>
    <p class="paragraph">
      Watch out for scams and stuff with Watchdog, your AI-powered protector
      from suspicious stuff online. Try it with the following prompts below.
    </p>

    <div class="prompts-container">
      <PromptButton
        ><p class="paragraph">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum!
        </p></PromptButton
      >
      <PromptButton
        ><p class="paragraph">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum!
        </p></PromptButton
      >
      <PromptButton
        ><p class="paragraph">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum!
        </p></PromptButton
      >
    </div>
  </div>

  <div class="input-container" class:moveUp={keyBoardPadding && mobile}>
    <input
      placeholder="Enter prompt here…"
      on:focus={() => (keyBoardPadding = true)}
      on:focusout={() => (keyBoardPadding = false)}
    />
    <button>
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
    transform: translate(0, -40vh);
  }
  .padBottom {
    padding-bottom: 40vh;
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
