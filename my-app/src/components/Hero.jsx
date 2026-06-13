import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  { src: "/images/image1.jpg", alt: "Outfit 1" },
  { src: "/images/image2.png", alt: "Outfit 2" },
  { src: "/images/image3.jpg", alt: "Outfit 3" },
  { src: "/images/image4.png", alt: "Outfit 4" },
  { src: "/images/image5.jpg", alt: "Outfit 5" },
  { src: "/images/image6.jpg", alt: "Outfit 6" },
  { src: "/images/image7.jpeg", alt: "Outfit 7" },
];

function Hero() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="badge">AI-Powered Fashion Assistant</span>

        <h1>
          Your Personal <span>AI Stylist</span>
        </h1>

        <p>
          Get personalized outfit recommendations
          tailored to your body type, occasion,
          and style preferences.
        </p>

        <div className="buttons">
          <button className="primary-btn" onClick={() => navigate("/quiz")}>
            Start Styling Quiz
          </button>

          <button className="secondary-btn">
            Upload & Match
          </button>
        </div>
      </div>

      <div className="hero-right">
        <div className="slideshow">
          {images.map((img, index) => (
            <img
              key={img.src}
              className={`slide ${index === activeIndex ? "active" : ""}`}
              src={img.src}
              alt={img.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;