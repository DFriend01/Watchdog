<script lang="ts">
    export let yes: string;
    export let no: string;
    export let content: string;
    import { fade, fly } from "svelte/transition";

    let isYes = content.trim().toLocaleLowerCase().startsWith("yes");

    let show = false;
</script>

{#if show}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="shadow"
        on:click={() => (show = false)}
        transition:fade={{ duration: 200 }}
    />

    <div class="displayRoot" transition:fly={{duration:200, y:-35 }}>
        <div class="dropRoot">
            <img
                alt="checkmark"
                src={`https://watchdog-iota.vercel.app/icons/${
                    !isYes ? "check.svg" : "cross.svg"
                }`}
            />

            <p>
                {#if isYes}
                    {yes}
                {:else}
                    {no}
                {/if}
            </p>
        </div>
        <p>
            {content}
        </p>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
{/if}

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="dropRoot" on:click={() => (show = true)}>
    <img
        alt="checkmark"
        src={`https://watchdog-iota.vercel.app/icons/${
            !isYes ? "check.svg" : "cross.svg"
        }`}
    />

    <p>
        {#if isYes}
            {yes}
        {:else}
            {no}
        {/if}
    </p>

    <div class="arrow">
        <div class="line1" />
        <div class="line2" />
    </div>
</div>

<style>
    .displayRoot {
        position: fixed;

        background-color: #fafafa;

        top: 50%;
        left: 50%;

        width: 400px;
        height: auto;

        max-height: 500px;
        overflow: scroll;

        z-index: 10;

        transform: translate(-50%, -50%);
    }

    .displayRoot > .dropRoot > p{
        font-size: larger;
    }

    .displayRoot > p {
        margin: 1rem;
        font-size: larger!important;
    }

    .shadow {
        position: fixed;
        top: 0;
        left: 0;

        background-color: black;
        opacity: 0.4;

        width: 100%;
        height: 100%;
        z-index: 5;
    }

    .dropRoot {
        display: flex;
        border-top: 1px solid grey;

        padding: 0.5rem 0.5rem;
        align-items: center;
        flex-direction: row;

        cursor: pointer;

        transition: background 0.3s ease-out;
    }

    .dropRoot:last-child {
        border-bottom: 1px solid grey;
    }

    .dropRoot:hover {
        background-color: rgba(0, 0, 0, 0.049);
    }

    img {
        margin: 0.25rem;
        margin-right: 0.5rem;
    }

    p {
        font-weight: 600;
    }

    .arrow {
        position: relative;
        width: 0.5rem;
        height: 0.5rem;

        transform: rotate(45deg);

        margin-left: auto;
        margin-right: 0.5rem;
    }

    .line1 {
        position: absolute;
        width: 0.5rem;
        height: 2px;

        background-color: grey;

        bottom: 0;
        left: 0;
    }

    .line2 {
        position: absolute;
        height: 0.5rem;
        width: 2px;

        background-color: grey;

        bottom: 0;
        right: 0;
    }
</style>
