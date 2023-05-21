<script lang="ts">
    export let yes: string;
    export let no: string;
    export let content: string;
    import { fade, fly } from "svelte/transition";

    let isYes = content.trim().toLocaleLowerCase().startsWith("yes");

    let show = false;
</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="dropRoot" on:click={() => (show = !show)}>
    <img
        alt="checkmark"
        src={`icons/${
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

    <div class="arrow" class:down={show}>
        <div class="line1" />
        <div class="line2" />
    </div>
    
</div>

{#if show}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="displayRoot" transition:fly={{duration:200, y:-35 }}>
        <p>
            {content}
        </p>
    </div>
{/if}

<style>
    .displayRoot {


        width: auto;
        height: auto;

        max-height: 500px;
      
     
    }

    .down{
        transform: rotate(45deg) !important;;
    }

    .displayRoot > p {
        margin: 1rem;
        font-size: larger!important;
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

        transform: rotate(135deg);

        margin-left: auto;
        margin-right: 0.5rem;

        transition:transform 0.3s ease-out;
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
