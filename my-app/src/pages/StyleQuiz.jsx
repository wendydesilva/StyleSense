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
              <button>Non-binary</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1>What's your body type?</h1>
            <p>We'll recommend styles that flatter your shape</p>

            <div className="body-options">
              <button>Rectangle</button>
              <button>Triangle</button>
              <button>Inverted Triangle</button>
              <button>Hourglass</button>
              <button>Round</button>
              <button>Athletic</button>
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