<script>
 
  export let content = "";
</script>

<div
on:click
  class="prompt-button"
>

  <div class="prompt-content">
    <p class="overline-3">Try this prompt</p>
    <p class="body">{content}</p>
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
</div>

<style>
  a:focus,
  *.focus {
    color: var(--text-md);
    border: 1px solid var(--slate-300);
    outline: none;
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
    gap: var(--sp-12);
    padding-right: var(--sp-16);
  }

  .prompt-button:hover {
    background-color: var(--slate-100);
  }

  .prompt-content > .overline-3 {
    margin-bottom: var(--sp-8);
  }

  .button-icon {
    width: var(--sp-24);
    display: flex;
  }

  .button-icon > svg {
    color: var(--text-sm);
  }
  .body {
    font-size: small;
    text-overflow: ellipsis;
  }
</style>
