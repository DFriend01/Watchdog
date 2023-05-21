<div class="footer">
  <div class="footer-img">
    <img
      src="puppo-outlined.png"
      alt="Dog Face"
      width="100%"
      height="auto"
    />
  </div>

  <h6>Watch out for scams and stuff with Watchdog</h6>
  <p class="paragraph"
    >Created by Christina, Matthew, Devon, and Ray for Stormhacks 2023</p
  >

  <div class="links">
    <a href="#">Watchdog</a>
    <a href="#">GitHub</a>
    <a href="#">Devpost</a>
  </div>
</div>

<style>
  .paragraph {
    margin-bottom: var(--sp-24);
  }

  a {
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

  .links {
    display: flex;
    flex-direction: row;
    gap: var(--sp-8);
  }

  .footer-img {
    width: var(--sp-48);
    height: auto;
    aspect-ratio: 1 / 1;
    margin-bottom: var(--sp-16);
  }

  .footer {
    padding-top: var(--sp-36);
    padding-left: var(--sp-20);
    padding-right: var(--sp-20);
    padding-bottom: var(--sp-24);
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    .footer {
      padding-left: var(--sp-40);
      padding-right: var(--sp-40);
    }
  }
</style>
