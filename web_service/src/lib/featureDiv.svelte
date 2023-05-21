<script>
  export let featureTitle = "";
  export let featureHeading = "";
  export let src = "";
</script>

<div class="feature-div">
  <p class="overline-2">{featureTitle}</p>
  <div class="feature-content">
    <div class="feature-img">
      <img
        {src}
        alt="Feature icon feature"
        width="80%"
        height="auto"
      />
    </div>
    <div><slot /></div>
  </div>
</div>

<style>
  .feature-div {
    background-color: var(--white);
    color: var(--text-lg);
    border-radius: var(--sp-12);
    padding: var(--sp-20);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .feature-img {
    width: 100%;
    text-align: center;
    padding: var(--sp-12) 0;
  }

  .feature-div > .overline-2 {
    color: var(--text-sm);
  }

  @media screen and (min-width: 768px) {
    .feature-content {
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sp-20);
      align-items: flex-end;
    }

    .feature-img > img {
      width: 100%;
    }

    .feature-content > div {
      width: 50%;
    }
  }
</style>
