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

<div class="desktop-menu">
  <div class="item-container">
    {#each items as item}
      <div class="item">
        <a href={item.dest}>{item.name}</a>
      </div>
    {/each}
  </div>
</div>

<style>
  .desktop-menu {
    height: var(--sp-48);
    top: var(--sp-64);
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.64);
    box-shadow: 0px 2px 8px rgba(30, 58, 138, 0.08);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    border-radius: var(--sp-48);
    padding-left: var(--sp-24);
    padding-right: var(--sp-24);
  }

  .item-container {
    display: flex;
    flex-direction: row;
    gap: var(--sp-20);
  }

  a {
    text-decoration: none;
    font-size: var(--sp-16);
    font-family: "Manrope", sans-serif;
    color: var(--text-lg);
    font-weight: 500;
  }

  a:hover {
    color: var(--primary-600);
  }

  a:visited {
    color: var(--text-lg);
  }

  @media screen and (max-width: 1024px) {
    .desktop-menu {
      display: none;
    }
  }
</style>
