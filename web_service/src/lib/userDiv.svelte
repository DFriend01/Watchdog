<script>
  export let userHeading = "";
  export let src = "";
</script>

<div class="user-container">
  <div class="user-img">
    <img
      {src}
      alt="User icon"
      width="100%"
      height="auto"
    />
  </div>
  <div class="user-content">
    <h6>{userHeading}</h6>
    <slot />
  </div>
</div>

<style>
  .user-container {
    background-color: var(--primary-50);
    padding: var(--sp-20);
    display: flex;
    flex-direction: row;
    gap: var(--sp-20);
    border-radius: var(--sp-12);
  }

  img {
    width: 100%;
    height: auto;
  }

  .user-img {
    display: flex;
    padding: var(--sp-8);
    align-items: center;
    justify-content: center;
    width: 20%;
    height: auto;
    height: fit-content;
    aspect-ratio: 1 / 1;
    background-color: var(--primary-200);
    border-radius: var(--sp-8);
  }

  .user-content {
    width: 80%;
    display: flex;
    flex-direction: column;
  }
</style>
