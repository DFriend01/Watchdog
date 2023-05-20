<script lang="ts">
    let url : string;

    async function getUrl() {
        const [tab] = await chrome.tabs.query(
            {
                active:true, currentWindow: true
            }
        );

        url = tab.url!;
    }
</script>



<button on:click={getUrl}>

    Get CUrrent URL
</button>


{#if url}
    The current url is: {url}
{/if}
