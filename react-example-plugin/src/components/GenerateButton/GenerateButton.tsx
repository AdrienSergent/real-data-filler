import React from "react";

interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
  return (
    <button className="generate-button" onClick={onClick}>
      Generate
    </button>
  );
};

export default GenerateButton;
