import { useState } from "react";
import Navbar from "../components/Navbar";
import "./StyleQuiz.css";

function StyleQuiz() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }

  };

    const bodyTypes = [
  {
    label: "Rectangle",
    icon: (
      <svg viewBox="0 0 60 100" width="50" height="80">
        <path d="M20 10 L40 10 L40 90 L20 90 Z" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    label: "Triangle",
    icon: (
      <svg viewBox="0 0 60 100" width="50" height="80">
        <path d="M25 10 L35 10 L42 90 L18 90 Z" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    label: "Inverted Triangle",
    icon: (
      <svg viewBox="0 0 60 100" width="50" height="80">
        <path d="M18 10 L42 10 L35 90 L25 90 Z" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    label: "Hourglass",
    icon: (
      <svg viewBox="0 0 60 100" width="50" height="80">
        <path d="M18 10 L42 10 L30 50 L42 90 L18 90 L30 50 Z" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    label: "Round",
    icon: (
      <svg viewBox="0 0 60 100" width="50" height="80">
        <ellipse cx="30" cy="50" rx="22" ry="40" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    label: "Athletic",
    icon: (
      <svg viewBox="0 0 60 100" width="50" height="80">
        <path d="M20 10 L40 10 L38 40 L42 90 L30 90 L18 90 L22 40 Z" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
];

  return (
  
    <div className="quiz-container">

      <div className="progress-section">
        <div className="progress-header">
          <span>Step {step} of 6</span>
          <span>{Math.round((step / 6) * 100)}% Complete</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(step / 6) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="quiz-card">

        {step === 1 && (
          <>
            <h1>What's your gender?</h1>
            <p>This helps us show you the most relevant styles</p>

            <div className="options">
              <button>Male</button>
              <button>Female</button>
              <button>Other</button>
            </div>
          </>
        )}

       {step === 2 && (
  <>
    <h1>What's your body type?</h1>
    <p>We'll recommend styles that flatter your shape</p>

    <div className="body-options visual-options">
      {bodyTypes.map((type) => (
        <button key={type.label} className="visual-option">
          {type.icon}
          <span>{type.label}</span>
        </button>
      ))}
    </div>
  </>
)}

        {step === 3 && (
          <>
            <h1>What's your style preference?</h1>
            <p>Choose the style that resonates with you most</p>

            <div className="body-options">
              <button>Casual</button>
              <button>Formal</button>
              <button>Sporty</button>
              <button>Bohemian</button>
              <button>Minimalist</button>
              <button>Vintage</button>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <h1>What's the occasion?</h1>
            <p>We'll match outfits to your event</p>

            <div className="body-options">
              <button>Everyday</button>
              <button>Work/Office</button>
              <button>Date Night</button>
              <button>Party</button>
              <button>Vacation</button>
              <button>Gym/Sports</button>
            </div>
          </>
        )} 
        {step === 5 && (
          <>
            <h1>What's your budget range?</h1>
            <p>We'll show you options within your price range</p>

            <div className="body-options">
              <button>Under $50</button>
              <button>$50 - $100</button>
              <button>$100 - $200</button>
              <button>$200 - $500</button>
              <button>Over $500</button>
            </div>
          </>
        )} 
        {step === 6 && (
          <>
            <h1>Current weather conditions?</h1>
            <p>We'll suggest weather-appropriate clothing</p>

            <div className="body-options">
              <button>Hot & Sunny</button>
              <button>Warm</button>
              <button>Mild</button>
              <button>Cold</button>
              <button>Rainy</button>
            </div>
          </>
        )}
        <div className="divider"></div>

        <div className="quiz-buttons">
          <button
            className="prev-btn"
            onClick={prevStep}
            disabled={step === 1}
          >
            Previous
          </button>

         <button
            className="next-btn"
            onClick={step === 6 ? () => alert("Quiz completed!") : nextStep}
          >
          {step === 6 ? "Get My Recommendations" : "Next"}
         </button>
        </div>

      </div>

    </div>
  );
}

export default StyleQuiz;