<div class="watchdog-container">
  <div class="watchdog-content-container">
    <h4>Watch out for suspicious stuff with Watchdog</h4>
    <p class="paragraph"
      >Watch out for scams and stuff with Watchdog, your AI-powered protector
      from suspicious stuff online. Try it with the following prompts below.</p
    >

    <div class="prompts-container">
      <a
        href="#"
        class="prompt-button"
      >
        <div class="prompt-content">
          <p class="overline-3">Try this prompt</p>
          <p class="body">Example text here. If example is to…</p>
        </div>
        <div class="button-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </a>
    </div>
  </div>

  <div class="input-container">
    <input placeholder="Enter prompt here…" />
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

  .button-icon > svg {
    color: var(--text-sm);
  }

  .input-container > button {
    width: var(--sp-56);
    height: auto;
    aspect-ratio: 1 / 1;
    color: var(--white);
    background-color: var(--primary-600);
    border-radius: var(--sp-12);
    padding: var(--sp-12);
    border: none;
  }

  .input-container > button:hover {
    background-color: var(--primary-700);
  }

  .prompt-content > .overline-3 {
    margin-bottom: var(--sp-8);
  }

  .prompt-button {
    display: flex;
    flex-direction: row;
    text-decoration: none;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    background-color: var(--white);
    padding: var(--sp-16) var(--sp-20);
    border-radius: var(--sp-12);
    border: 1px solid var(--slate-200);
  }

  .prompts-container {
    margin-top: var(--sp-20);
  }

  .button-icon {
    display: flex;
    width: var(--sp-24);
  }

  .overline-3 {
    color: var(--text-sm);
  }

  .body {
    color: var(--text-lg);
  }
</style>
