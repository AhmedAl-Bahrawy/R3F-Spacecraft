// src/components/IntroText.jsx
import React, { useState, useEffect } from "react";

export default function IntroText({ isVisible, onComplete }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const introTexts = [
    "Get Ready to Explore Space",
    "Journey Through the Cosmos",
    "Adventure Awaits Among the Stars",
    "Scroll to Begin Your Voyage",
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentTextIndex((prev) => {
          const next = prev + 1;
          if (next >= introTexts.length) {
            setTimeout(() => onComplete?.(), 1000);
            return prev;
          }
          return next;
        });
        setFade(true);
      }, 500);
    }, 2000);

    // Auto complete after 10 seconds
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="intro-overlay">
      <div className={`intro-text ${fade ? "fade-in" : "fade-out"}`}>
        <h1 className="intro-title">{introTexts[currentTextIndex]}</h1>
        <div className="intro-subtitle">
          {currentTextIndex === introTexts.length - 1 && (
            <p>Use your scroll wheel to navigate through space</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(2px);
          z-index: 100;
          pointer-events: none;
        }

        .intro-text {
          text-align: center;
          transition: opacity 0.5s ease-in-out;
        }

        .fade-in {
          opacity: 1;
        }

        .fade-out {
          opacity: 0;
        }

        .intro-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          margin: 0;
          color: #fff;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          letter-spacing: 2px;
        }

        .intro-subtitle {
          margin-top: 20px;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
