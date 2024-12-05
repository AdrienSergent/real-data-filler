import React, { useState, useEffect } from "react";

interface NumberSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
  settings: any;
}

const NumberSettings: React.FC<NumberSettingsProps> = ({
  onApply,
  onBack,
  settings,
}) => {
  const [numberRange, setNumberRange] = useState(settings.numberRange || "Ones (x)");
  const [showCurrency, setShowCurrency] = useState(settings.showCurrency || false);
  const [showDecimal, setShowDecimal] = useState(settings.showDecimal || false);
  const [previewNumbers, setPreviewNumbers] = useState<string[]>([]);

  // Met à jour l'aperçu chaque fois que les paramètres changent
  useEffect(() => {
    updatePreview();
  }, [numberRange, showCurrency, showDecimal]);

  // Fonction pour générer les nombres en fonction des paramètres
  const updatePreview = () => {
    const range = getRange(numberRange);
    const numbers = Array.from({ length: 2 }).map(() => {
      let value = getRandomNumber(range);
      if (showDecimal) value = parseFloat((value + Math.random()).toFixed(2));
      if (showCurrency) return `$${value}`;
      return value.toString();
    });
    setPreviewNumbers(numbers);
  };

  // Détermine la plage des nombres selon la sélection
  const getRange = (range: string) => {
    switch (range) {
      case "Tens (xx)":
        return { min: 10, max: 99 };
      case "Hundreds (xxx)":
        return { min: 100, max: 999 };
      case "Thousands (xxxx)":
        return { min: 1000, max: 9999 };
      default: // "Ones (x)"
        return { min: 1, max: 9 };
    }
  };

  // Génère un nombre aléatoire dans une plage donnée
  const getRandomNumber = (range: { min: number; max: number }) => {
    return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  };

  const handleApply = () => {
    onApply({ numberRange, showCurrency, showDecimal });
  };

  return (
    <div className="number-settings">
      {/* Bouton Back */}
      <div className="header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <h2>Number Settings</h2>

      {/* Sélection de la plage de nombres */}
      <div className="setting-group">
        <label>Number Range</label>
        <select value={numberRange} onChange={(e) => setNumberRange(e.target.value)}>
          <option>Ones (x)</option>
          <option>Tens (xx)</option>
          <option>Hundreds (xxx)</option>
          <option>Thousands (xxxx)</option>
        </select>
      </div>

      {/* Options supplémentaires */}
      <div className="setting-group">
        <div>
          <input
            type="checkbox"
            checked={showCurrency}
            onChange={() => setShowCurrency(!showCurrency)}
          />
          Show Currency ($)
        </div>
        <div>
          <input
            type="checkbox"
            checked={showDecimal}
            onChange={() => setShowDecimal(!showDecimal)}
          />
          Show Decimal (.xx)
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="preview">
        <h3>Preview</h3>
        <ul>
          {previewNumbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>

      {/* Bouton Apply */}
      <div className="button-container">
        <button className="apply-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default NumberSettings;
