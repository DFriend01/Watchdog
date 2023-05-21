<script>
  export let userHeading = "";
</script>

<div class="user-container">
  <div class="user-img">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5"
    >
      <path
        d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z"
      />
    </svg>
  </div>
  <div class="user-content">
    <p class="subtitle-1">{userHeading}</p>
    <slot />
  </div>
</div>

<style>
  .user-container {
    background-color: var(--white);
    padding: var(--sp-20);
    display: flex;
    flex-direction: row;
    gap: var(--sp-20);
    border-radius: var(--sp-12);
  }
  .subtitle-1 {
    margin-bottom: var(--sp-8);
  }

  img {
    width: 100%;
    height: auto;
  }

  .user-img {
    display: flex;
    padding: var(--sp-12);
    align-items: center;
    justify-content: center;
    color: var(--white);
    width: var(--sp-40);
    height: auto;
    height: fit-content;
    aspect-ratio: 1 / 1;
    background-color: var(--primary-500);
    border-radius: var(--sp-12);
  }

  .user-content {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 1024px) {
    .user-container {
      display: flex;
      flex-direction: column;
    }

    .user-img {
      width: var(--sp-32);
    }
  }
</style>
