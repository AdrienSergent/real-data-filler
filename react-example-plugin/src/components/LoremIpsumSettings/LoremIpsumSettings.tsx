import React, { useState, useEffect } from "react";

interface LoremIpsumSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
  settings: any;
}

const LoremIpsumSettings: React.FC<LoremIpsumSettingsProps> = ({
  onApply,
  onBack,
  settings,
}) => {
  const [format, setFormat] = useState<string>(settings.format || "Paragraphs");
  const [count, setCount] = useState<number>(settings.count || 3);
  const [preview, setPreview] = useState<string>("");

  // Met à jour la prévisualisation à chaque changement de paramètres
  useEffect(() => {
    updatePreview();
  }, [format, count]);

  const updatePreview = () => {
    const lorem = generateLorem(format, count);
    setPreview(lorem);
  };

  // Génère un exemple de Lorem Ipsum basé sur le format et le nombre
  const generateLorem = (format: string, count: number) => {
    switch (format) {
      case "Paragraphs":
        return Array.from({ length: count })
          .map(() => "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
          .join("\n\n");
      case "Sentences":
        return Array.from({ length: count })
          .map(() => "Lorem ipsum dolor sit amet.")
          .join(" ");
      case "Words":
        return Array.from({ length: count })
          .map(() => "lorem")
          .join(" ");
      default:
        return "";
    }
  };

  const handleApply = () => {
    onApply({ format, count });
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Math.max(1, parseInt(e.target.value) || 1), 500); // Limite entre 1 et 500
    setCount(value);
  };

  return (
    <div className="lorem-ipsum-settings">
      <div className="header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <h2>Lorem Ipsum Settings</h2>

      {/* Sélection du format */}
      <div className="setting-group">
        <label>Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="Words">Words</option>
          <option value="Sentences">Sentences</option>
          <option value="Paragraphs">Paragraphs</option>
        </select>
      </div>

      {/* Nombre d'éléments à générer */}
      <div className="setting-group">
        <label>How Many?</label>
        <input
          type="number"
          value={count}
          onChange={handleCountChange}
          min={1}
          max={500}
        />
        <small>(max: 500)</small>
      </div>

      {/* Prévisualisation */}
      <div className="preview">
        <h3>Preview</h3>
        <div className="preview-box">{preview}</div>
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

export default LoremIpsumSettings;
