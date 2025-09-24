// src/components/ProgressIndicator.jsx
import React from "react";

export default function ProgressIndicator({ progress = 0, isVisible = true }) {
  if (!isVisible) return null;

  const percentage = Math.round(progress * 100);

  return (
    <div className="progress-container">
      <div className="progress-label">Journey Progress</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
        <div className="progress-text">{percentage}%</div>
      </div>
      <div className="progress-instructions">
        <p>🖱️ Scroll to navigate • ⌨️ W/S or ↑/↓ keys</p>
      </div>

      <style jsx>{`
        .progress-container {
          position: fixed;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 20px;
          min-width: 250px;
          z-index: 50;
          color: white;
          font-family: "Inter", sans-serif;
        }

        .progress-label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
        }

        .progress-bar {
          position: relative;
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899);
          border-radius: 4px;
          transition: width 0.3s ease-out;
          box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
        }

        .progress-text {
          position: absolute;
          top: -22px;
          right: 0;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }

        .progress-instructions {
          font-size: 11px;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .progress-instructions p {
          margin: 0;
        }

        @media (max-width: 768px) {
          .progress-container {
            top: auto;
            bottom: 20px;
            right: 20px;
            left: 20px;
            min-width: unset;
          }
        }
      `}</style>
    </div>
  );
}
