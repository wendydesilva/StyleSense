import { useState, useRef } from "react";
import "./OutfitMatcher.css";

function OutfitMatcher() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <section className="outfit-matcher">
      <span className="badge">
        📷 AI-Powered Image Analysis
      </span>

      <h1>Smart Outfit Matcher</h1>

      <p>
        Upload a photo of any clothing item from your wardrobe, and our AI
        will recommend perfectly matched pieces across different price
        ranges
      </p>

      <div
        className={`upload-box ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
            <path d="M5 19h14" />
          </svg>
        </div>

        <h2>Upload Your Clothing Item</h2>

        <p className="upload-subtext">
          {selectedFile
            ? `Selected: ${selectedFile.name}`
            : "Drag and drop an image here, or click to browse"}
        </p>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <button className="choose-file-btn" onClick={handleChooseFile}>
          Choose File
        </button>
      </div>
    </section>
  );
}

export default OutfitMatcher;