<script>
  import FeatureDiv from "$lib/featureDiv.svelte";
  import UserDiv from "$lib/userDiv.svelte";
  import Footer from "$lib//footer.svelte";
</script>

<div class="page-container">
  <!-- <div class="logo">
    <img
      alt="puppo!"
      src="icons/fluent/dog_face_color.svg"
    />
  </div> -->

  <div class="neutral-button menu-button-mobile">
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

  <div class="hero-container">
    <div class="hero-image">
      <div class="image-1">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Technologist%20Medium-Light%20Skin%20Tone.png"
          alt="Man Technologist Medium-Light Skin Tone"
          width="100%"
          height="auto"
        />
      </div>
      <div class="image-2">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png"
          alt="Sparkles"
          width="100%"
          height="auto"
        />
      </div>
      <div class="image-3">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Locked%20with%20Key.png"
          alt="Locked with Key"
          width="100%"
          height="auto"
        />
      </div>
      <div class="image-4">
        <img
          src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Dog.png"
          alt="Dog"
          width="100%"
          height="auto"
        />
      </div>
    </div>
    <div class="hero-content">
      <h2>Lorem ipsum dolor sit amet</h2>
      <p class="subtitle-2">
        Watch out for scams and stuff with Watchdog, your AI-powered protector
        from suspicious stuff online.</p
      >
      <a
        href="../app/"
        class="primary-button-lg button-text">Try Watchdog today!</a
      >
    </div>
  </div>

  <div class="tech-stack-container">
    <p class="overline-3">Made for Stormhacks 2023</p>
    <h4>Leveraging the power of AI to make shit people will actually use.</h4>
    <div class="logo-cloud">
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        />
      </div>
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        />
      </div>
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        /></div
      >
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        /></div
      >
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        /></div
      >
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        /></div
      >
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        /></div
      >
      <div>
        <img
          alt="svelte"
          src="logos/svelte.png"
        /></div
      >
    </div>
  </div>

  <div class="features-container">
    <h4>Lorem ipsum dolor sit amet.</h4>

    <div class="features-div">
      <FeatureDiv
        featureTitle="Feature 1"
        featureHeading="Heading feature 1"
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone.png"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
        accusantium beatae doloribus!</FeatureDiv
      >
      <FeatureDiv
        featureTitle="Feature 1"
        featureHeading="Heading feature 1"
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone.png"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
        accusantium beatae doloribus!</FeatureDiv
      >
      <FeatureDiv
        featureTitle="Feature 1"
        featureHeading="Heading feature 1"
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone.png"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
        accusantium beatae doloribus!</FeatureDiv
      >
      <FeatureDiv
        featureTitle="Feature 1"
        featureHeading="Heading feature 1"
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone.png"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus
        accusantium beatae doloribus!</FeatureDiv
      >
    </div>
  </div>

  <div class="target-audience-container">
    <h4>Who does this help?</h4>
    <div class="users-div">
      <UserDiv
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Old%20Woman.png"
        userHeading="User type 1"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
        nam corporis quo necessitatibus porro laudantium non?</UserDiv
      >
      <UserDiv
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Old%20Woman.png"
        userHeading="User type 1"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
        nam corporis quo necessitatibus porro laudantium non?</UserDiv
      >
      <UserDiv
        src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People/Old%20Woman.png"
        userHeading="User type 1"
        >Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
        nam corporis quo necessitatibus porro laudantium non?</UserDiv
      >
    </div>
  </div>

  <div class="cta">
    <div class="cta-1">
      <p class="overline-1">Available today</p>
      <h4>Download our Chrome extension and lorem ipsum dolor</h4>
      <a
        href="#"
        class="primary-button-lg button-text"
      >
        Try Watchdog today
      </a>
    </div>
    <div class="cta-2">
      <p class="overline-1">Try on your device</p>
      <h4
        >Try Watchdog from your own browser, whether you’re on mobile or desktop</h4
      >
      <a
        href="#"
        class="secondary-button-lg button-text"
      >
        Try Watchdog today
      </a>
    </div>
  </div>

  <Footer />
</div>

<style>
  .logo,
  .menu-button-mobile {
    width: var(--sp-48);
    aspect-ratio: 1 / 1;
    height: auto;
  }

  .menu-button-mobile {
    position: fixed;
    top: var(--sp-20);
    right: var(--sp-20);
    color: var(--slate-600);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .menu-button-mobile > svg {
    width: var(--sp-32);
    height: auto;
  }

  .logo > img {
    width: 100%;
    height: auto;
  }

  .page-container {
    background-color: var(--slate-50);
  }

  .hero-container {
    padding: var(--sp-20);
    margin-top: var(--sp-120);
    display: flex;
    flex-direction: column;
    gap: var(--sp-24);
    margin-bottom: var(--sp-40);
  }

  .hero-content > h2 {
    color: var(--primary-600);
  }

  .hero-content > .subtitle-2 {
    margin-bottom: var(--sp-24);
  }

  .hero-image {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: var(--sp-12);
    grid-row-gap: var(--sp-12);
  }

  .hero-image > div {
    border-radius: var(--sp-12);
    padding: var(--sp-20);
  }

  .hero-image > .image-1 {
    background: linear-gradient(
      180deg,
      var(--pink-100) 0%,
      var(--pink-300) 100%
    );
  }

  .hero-image > .image-2 {
    background: linear-gradient(
      180deg,
      var(--violet-100) 0%,
      var(--violet-300) 100%
    );
  }

  .hero-image > .image-3 {
    background: linear-gradient(
      180deg,
      var(--teal-100) 0%,
      var(--teal-300) 100%
    );
  }

  .hero-image > .image-4 {
    background: linear-gradient(
      180deg,
      var(--purple-100) 0%,
      var(--purple-300) 100%
    );
  }

  .tech-stack-container {
    background-color: var(--primary-50);
    padding: var(--sp-32) var(--sp-20);
  }

  .tech-stack-container > .overline-3 {
    color: var(--primary-600);
  }

  .logo-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-16);
  }

  .logo-cloud > div {
    display: flex;
    color: var(--slate-600);
    border-radius: var(--sp-12);
    width: calc(50% - var(--sp-16) - var(--sp-48));
    background-color: var(--white);
    padding: var(--sp-32) var(--sp-24);
  }

  .logo-cloud > div > img {
    width: 100%;
  }

  .features-container {
    background-color: var(--slate-900);
    padding: var(--sp-32) var(--sp-20);
    color: var(--white);
  }

  .features-container > h4 {
    margin-bottom: var(--sp-24);
  }

  .features-div {
    display: flex;
    flex-direction: column;
    gap: var(--sp-20);
  }

  .target-audience-container {
    padding: var(--sp-32) var(--sp-20);
  }

  .target-audience-container > h4,
  .features-container > h4,
  .tech-stack-container > h4 {
    margin-bottom: var(--sp-24);
  }

  .users-div {
    display: flex;
    flex-direction: column;
    gap: var(--sp-16);
  }

  .cta-1,
  .cta-2 {
    padding: var(--sp-40) var(--sp-20);
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }

  .cta-1 {
    background-color: var(--slate-900);
    color: var(--white);
  }

  .cta-1 > .overline-1 {
    color: var(--primary-500);
  }

  .cta-2 {
    background-color: var(--primary-600);
    color: white;
  }
</style>
