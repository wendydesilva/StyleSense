function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <span className="badge">
          AI-Powered Fashion Assistant
        </span>

        <h1>
          Your Personal <span>AI Stylist</span>
        </h1>

        <p>
          Get personalized outfit recommendations
          tailored to your body type, occasion,
          and style preferences.
        </p>

        <div className="buttons">
          <button className="primary-btn">
            Start Styling Quiz
          </button>

          <button className="secondary-btn">
            Upload & Match
          </button>
        </div>

      </div>

      <div className="hero-right">

        <div className="grid">
         <img className="box" src="/images/homeBoy.jpg" alt="Outfit 1" />
         <img className="box" src="/images/homeImage1.png" alt="Outfit 2" />
         <img className="box" src="/images/homeImage3.png" alt="Outfit 3" />
        <img className="box" src="/images/homeImage2.png" alt="Outfit 4" />
</div>

      </div>

    </section>
  );
}

export default Hero;