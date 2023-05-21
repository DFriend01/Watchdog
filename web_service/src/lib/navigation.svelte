<script
  lang="ts"
  context="module"
>
  export interface Item {
    name: string;
    dest: string;
  }
</script>

<script lang="ts">
  import { fade, fly } from "svelte/transition";

  export let display = false;

  export let items: Item[] = [
    {
      name: "Home",
      dest: "",
    },
    {
      name: "About",
      dest: "",
    },
    {
      name: "DevPost",
      dest: "",
    },
    {
      name: "GitHub",
      dest: "",
    },
    {
      name: "Watchdog",
      dest: "",
    },
  ];
</script>

<div class="parent">
  {#if !display}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      on:click={() => (display = !display)}
      class="neutral-button menu-button-mobile"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.75"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
  {/if}

  {#if display}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="shadow"
      on:click={() => (display = !display)}
      transition:fade={{
        duration: 200,
      }}
    />
    <div
      class="container"
      in:fly={{ y: -40, duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      <div class="top">
        <p class="title">Navigation</p>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="close-button"
          on:click={() => (display = !display)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
            />
          </svg>
        </div>
      </div>

      <div class="itemContainer">
        {#each items as item}
          <div class="item">
            <a href={item.dest}>{item.name}</a>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  p.title {
    padding-top: var(--sp-20);
    font-size: larger;
    font-weight: bold;
    color: var(--text-md);
  }

  .itemContainer {
    padding-top: var(--sp-12);
    display: flex;
    flex-direction: column;
  }

  .item {
    padding: var(--sp-16) 0;
    border-bottom: var(--slate-300) 1px solid;
    width: calc(100% - var(--sp-20));
  }

  .item:last-child {
    border-bottom: none;
  }

  a {
    text-decoration: none;
    color: var(--text-lg);
    font-size: larger;
  }

  .menu-button-mobile {
    width: var(--sp-48);
    aspect-ratio: 1 / 1;
    height: auto;
  }

  .shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    background-color: black;
    opacity: 0.4;
    z-index: 5;
  }

  .container {
    position: fixed;
    width: calc(100% - 2rem - var(--sp-20) - var(--sp-8));
    background-color: #fff;
    border-radius: var(--sp-16);
    padding-left: var(--sp-20);
    padding-bottom: var(--sp-12);
    padding-top: var(--sp-8);
    padding-right: var(--sp-8);
    z-index: 10;
    right: 1rem;
    top: 1.5rem;
  }

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .close-button {
    width: var(--sp-48);
    height: var(--sp-48);
    cursor: pointer;
    color: var(--text-xs);
  }

  .neutral-button {
    height: var(--sp-48);
    width: auto;
    aspect-ratio: 1 / 1;
  }

  .menu-button-mobile {
    position: fixed;
    top: var(--sp-20);
    right: var(--sp-20);
    color: var(--slate-600);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-button-mobile > svg {
    width: var(--sp-32);
    height: auto;
  }

  @media screen and (min-width: 768px) {
    .menu-button-mobile {
      top: var(--sp-40);
      right: var(--sp-40);
    }
  }

  @media screen and (min-width: 1024px) {
    .menu-button-mobile {
      display: none;
    }
  }
</style>
