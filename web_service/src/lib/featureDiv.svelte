<script>
  export let featureTitle = "";
  export let featureHeading = "";
  export let src = "";
</script>

<div class="feature-div">
  <p class="overline-2">{featureTitle}</p>
  <div class="feature-img">
    <img
      {src}
      alt="Feature icon feature"
      width="40%"
      height="auto"
    />
  </div>
  <h5>{featureHeading}</h5>
  <p class="paragraph"><slot /></p>
</div>

<style>
  .feature-div {
    background-color: var(--white);
    color: var(--text-lg);
    border-radius: var(--sp-12);
    padding: var(--sp-20);
  }

  .feature-img {
    width: 100%;
    text-align: center;
    padding: var(--sp-12) 0;
  }

  .feature-div > .overline-2 {
    color: var(--text-sm);
  }
</style>
