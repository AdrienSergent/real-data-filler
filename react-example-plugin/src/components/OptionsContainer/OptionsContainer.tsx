import React from "react";

interface Option {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface OptionsContainerProps {
  options: Option[];
  dataType: string;
  setDataType: (type: string) => void;
  onCustomizeName: () => void; // Callback pour ouvrir la personnalisation des noms
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({
  options,
  dataType,
  setDataType,
  onCustomizeName,
}) => {
  const optionsWithEllipsis = ["name", "phone", "number", "date-time", "lorem-ipsum", "addresses"];

  return (
    <div className="options-container">
      {options.map((option) => (
        <div
          key={option.id}
          className={`option ${dataType === option.id ? "selected" : ""}`}
          onClick={() => setDataType(option.id)} // Gérer la sélection de type
        >
          <span className="icon">{option.icon}</span>
          <div className="option-details">
            <h3>{option.label}</h3>
            <p>{option.description}</p>
          </div>
          {/* Ajout des trois points pour les options spécifiques */}
          {optionsWithEllipsis.includes(option.id) && (
            <div
              className="ellipsis"
              onClick={(e) => {
                e.stopPropagation(); // Empêche l'appel de `setDataType`
                if (option.id === "name") onCustomizeName(); // Ouvrir l'écran des réglages pour les noms
              }}
            >
              •••
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OptionsContainer;
