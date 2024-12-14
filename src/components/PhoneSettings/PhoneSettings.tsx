import React, { useState, useEffect } from "react";
import { Faker, en } from "@faker-js/faker";

interface PhoneSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
  settings: any;
}

const PhoneSettings: React.FC<PhoneSettingsProps> = ({ onApply, onBack, settings }) => {
  const [format, setFormat] = useState(settings.format || "(XXX) XXX-XXXX");
  const [previewNumbers, setPreviewNumbers] = useState<string[]>([]);

  useEffect(() => {
    updatePreview();
  }, [format]);

  const updatePreview = () => {
    const faker = new Faker({ locale: [en] }); // Utilise la locale anglaise par défaut
    const numbers = Array.from({ length: 2 }).map(() => {
      if (format === "XXX.XXX.XXXX") {
        return faker.phone.number({style: "national"});
      } else if (format === "Indicatif International (XXX).xxx.xxxx") {
        return faker.phone.number({style: "international"});
      }
      return faker.phone.number({style: "international"}); // Format par défaut
    });
    setPreviewNumbers(numbers);
  };

  const handleApply = () => {
    onApply({ format });
  };

  return (
    <div className="phone-settings">
      {/* Bouton Back en haut à gauche */}
      <div className="header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <h2>Phone Settings</h2>

      {/* Sélecteur de format */}
      <div className="setting-group">
        <label>Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="(XXX) XXX-XXXX">(XXX) XXX-XXXX</option>
          <option value="XXX.XXX.XXXX">XXX.XXX.XXXX</option>
        </select>
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

      {/* Bouton Apply centré */}
      <div className="button-container">
        <button className="apply-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default PhoneSettings;
