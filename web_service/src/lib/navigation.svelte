<script lang="ts" context="module">
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
            name: "WatchDog Download",
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
    <div class="shadow" on:click={() => (display = !display)}  transition:fade={{
        duration:200
    }}/>
    <div class="container" in:fly={{y:-40, duration:200}} out:fade={{duration:200}}>
        <div class="top">
            <p class="title">Navigation</p>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="close-button" on:click={() => (display = !display)}>
                <div id="ver" />
                <div id="hor" />
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
        margin: 0.75rem 0.5rem;

        font-size: larger;
        font-weight: bold;
    }

    .itemContainer {
        display: flex;
        flex-direction: column;
    }

    .item {
        padding: 0.6rem 0.5rem;
        border-bottom: #cccccc 1px solid;
    }

    .item:last-child {
        border-bottom: none;
    }

    a {
        text-decoration: none;
        color: #333333;

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
        width: calc(100% - 5rem);
        background-color: #fafafa;
        border-radius: 15px;
        padding: 1.5rem 1.5rem;
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
        width: 2rem;
        height: 2rem;

        position: relative;

        margin-right: 0.5rem;

        transform: rotate(45deg);

        cursor: pointer;
    }

    #hor {
        position: absolute;
        height: 4px;
        width: 2rem;
        background: gray;

        transform: translate(0, calc(1rem - 2px));
        border-radius: 2px;
    }
    #ver {
        position: absolute;
        width: 4px;
        height: 2rem;
        background: grey;

        transform: translate(calc(1rem - 2px), 0);

        border-radius: 2px;
    }
</style>
