<script>
  import Navigation from "$lib/navigation.svelte";
  import FeatureDiv from "$lib/featureDiv.svelte";
  import UserDiv from "$lib/userDiv.svelte";
  import Footer from "$lib/footer.svelte";
  import DesktopMenu from "$lib/desktopMenu.svelte";
</script>

<div
  class="nav"
  style="z-index:5"
>
  <DesktopMenu />
  <Navigation />
</div>

<div class="page-container">
  <div class="logo">
    <img
      alt="puppo!"
      src="puppo-outlined.png"
    />
  </div>

  <div class="hero-container">
    <div class="hero-image">
      <img
        src="hero-puppo.svg"
        alt="hero pup"
      />
    </div>
    <div class="hero-content">
      <p class="overline-1">Protector against fraudulent activity</p>
      <h2>Watchdog watches out for you</h2>
      <p class="subtitle-2">
        Stay vigilant against scams and deceptive material online with Watchdog,
        your AI-powered guardian safeguarding you from online activities with
        malicious intent.</p
      >
      <a
        href="../app/"
        class="primary-button-lg button-text">Try Watchdog today!</a
      >
    </div>
  </div>
  <!-- 
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
  </div> -->

  <div class="features-container">
    <p1 class="overline-2">What can Watchdog do?</p1>
    <h4>Browse the digital realm safely—Watchdog has your back.</h4>
    <p class="paragraph"
      >Watchdog provides users with increased confidence in navigating the
      digital landscape, knowing that they have a reliable tool to assist them
      in identifying and avoiding scams and misinformation.</p
    >

    <div class="features-div">
      <FeatureDiv
        featureTitle="Misinformation Identification"
        src="feature-puppo-1.svg"
        >Watchdog analyzes information and flags misleading or false content,
        helping users separate facts from misinformation.</FeatureDiv
      >
      <FeatureDiv
        featureTitle="Enhanced Online Safety"
        src="feature-puppo-2.svg"
        >By effectively identifying scams and misinformation, Watchdog helps
        protect users from financial losses, identity theft, and other risks
        associated with falling victim to scams.</FeatureDiv
      >
      <FeatureDiv
        featureTitle="User-Friendly Interface and Experience"
        src="feature-puppo-3.svg"
        >Watchdog offers an intuitive and easy-to-use experience, making it
        accessible to users of all levels of technical expertise.
      </FeatureDiv>
      <FeatureDiv
        featureTitle="Using AI Magic to Keep You Safe"
        src="feature-puppo-4.svg"
        >Watchdog employs the magic of machine learning, continuously improving
        its detection capabilities by learning from new scams, evolving tactics,
        and emerging forms of misinformation.</FeatureDiv
      >
    </div>
  </div>

  <div class="target-audience-container">
    <p1 class="overline-2">Who can use Watchdog?</p1>
    <h4>Anyone can be the victim of a scam—but not on our watch.</h4>
    <p class="paragraph"
      >For individuals who wish to enhance their online safety, verify
      information, and avoid falling victim to scams or misinformation, Watchdog
      can be an invaluable tool.</p
    >

    <div class="users-div">
      <UserDiv userHeading="Parents and Guardians"
        >Parents and guardians can use the app to protect their children from
        scams and teach them critical thinking skills to identify misinformation
        online.</UserDiv
      >
      <UserDiv userHeading="News Readers"
        >Those who regularly read news articles and online publications can
        benefit from the app to verify the credibility of sources and detect any
        misleading or inaccurate information.</UserDiv
      >
      <UserDiv userHeading="Students and Researchers"
        >Students, researchers, and academics can use the app to verify the
        accuracy and reliability of sources and ensure the information they rely
        on for their studies or work is trustworthy.</UserDiv
      >
    </div>
  </div>

  <div class="cta">
    <div class="cta-1">
      <p class="overline-1">Available now</p>
      <h4
        >Download our Chrome extension and protect yourself from fraudulent
        behaviour</h4
      >
      <a
      target="_blank"
        href="https://github.com/DFriend01/Watchdog/releases/tag/Release"
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
      target="_blank"
        href="app"
        class="secondary-button-lg button-text"
      >
        Try Watchdog today
      </a>
    </div>
  </div>

  <Footer />
</div>

<style>
  .nav {
    position: fixed;

    right: 3rem;
    top: 3rem;
  }

  .logo {
    width: var(--sp-48);
    height: var(--sp-48);
    top: var(--sp-20);
    left: var(--sp-20);
    position: absolute;
    z-index: 0;
  }

  .logo > img {
    width: 100%;
    height: auto;
  }

  .page-container {
    background-color: var(--slate-50);
  }

  .hero-container {
    background-image: url("./hero-1.png");
    background-size: cover;
    padding: var(--sp-20);
    padding-top: var(--sp-120);
    display: flex;
    flex-direction: column;
    gap: var(--sp-24);
    padding-bottom: var(--sp-32);
  }

  .hero-content > h2 {
    color: var(--primary-600);
  }

  .hero-content > .subtitle-2 {
    margin-bottom: var(--sp-24);
  }

  .hero-image > img {
    width: 100%;
    height: auto;
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
    background-color: var(--primary-50);
    padding: var(--sp-32) var(--sp-20);
  }

  .features-container > h4 {
    margin-bottom: var(--sp-24);
  }

  .features-div {
    margin-top: var(--sp-24);
    display: flex;
    flex-direction: column;
    gap: var(--sp-20);
  }

  .target-audience-container {
    background-color: var(--primary-50);
    padding: var(--sp-32) var(--sp-20);
    padding-bottom: var(--sp-40);
  }

  .users-div {
    margin-top: var(--sp-32);
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

  .cta-1 > h4,
  .cta-2 > h4 {
    margin-bottom: var(--sp-32);
  }

  .cta-1 {
    background-image: url("./hero-1.png");
    background-size: cover;
  }

  .cta-1 > .overline-1 {
    color: var(--primary-500);
  }

  .cta-2 {
    background-color: var(--primary-600);
    color: white;
  }

  @media screen and (min-width: 768px) {
    .logo {
      top: var(--sp-40);
      left: var(--sp-40);
    }

    .hero-container {
      padding-top: var(--sp-120);
      padding-left: var(--sp-40);
      padding-right: var(--sp-40);
    }

    .features-container,
    .target-audience-container,
    .cta-1,
    .cta-2 {
      padding-left: var(--sp-40);
      padding-right: var(--sp-40);
    }
  }

  @media screen and (min-width: 1024px) {
    .logo {
      top: var(--sp-40);
      left: var(--sp-120);
    }

    .hero-container,
    .features-container,
    .target-audience-container {
      padding-left: var(--sp-120);
      padding-right: var(--sp-120);
      padding-bottom: var(--sp-64);
    }

    .hero-container {
      padding-top: var(--sp-160);
      display: flex;
      flex-direction: row-reverse;
      gap: var(--sp-80);
      justify-content: space-between;
      align-items: center;
    }

    .hero-image,
    .hero-content {
      width: 50%;
    }

    .features-div {
      display: grid;
      grid-template-columns: 2fr 2fr;
      grid-template-rows: repeat(2, 1fr);
      grid-column-gap: var(--sp-16);
      grid-row-gap: var(--sp-16);
    }

    .cta {
      display: flex;
      flex-direction: row;
    }

    .cta-1,
    .cta-2 {
      width: 50%;
      display: flex;
      justify-content: center;
    }

    .users-div {
      display: flex;
      flex-direction: row;
    }
  }
</style>
