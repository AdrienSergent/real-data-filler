import React, { useState, useEffect } from "react";
import { Faker, fr, en } from "@faker-js/faker";

interface NameSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
  settings: any;
}

const getFakerInstance = (locale: string): Faker => {
  return new Faker({ locale: locale === "French (FR)" ? [fr] : [en] });
};

const NameSettings: React.FC<NameSettingsProps> = ({ onApply, onBack, settings }) => {
  const [nameType, setNameType] = useState(settings.nameType);
  const [gender, setGender] = useState(settings.gender);
  const [includeFirstName, setIncludeFirstName] = useState(settings.includeFirstName);
  const [includeLastName, setIncludeLastName] = useState(settings.includeLastName);
  const [includeComma, setIncludeComma] = useState(settings.includeComma);
  const [previewNames, setPreviewNames] = useState<string[]>([]);

  useEffect(() => {
    updatePreview();
  }, [nameType, gender, includeFirstName, includeLastName, includeComma]);

  const updatePreview = () => {
    const faker = getFakerInstance(nameType);

    const fakerGender =
      gender === "Male" ? "male" : gender === "Female" ? "female" : undefined;

    const names = Array.from({ length: 2 }).map(() => {
      const firstName = includeFirstName ? faker.person.firstName(fakerGender) : "";
      const lastName = includeLastName ? faker.person.lastName() : "";
      const comma = includeComma ? "," : "";
      return `${firstName} ${lastName}${comma}`.trim(); // Virgule à la fin
    });

    setPreviewNames(names);
  };

  const handleApply = () => {
    onApply({ nameType, gender, includeFirstName, includeLastName, includeComma });
  };

  return (
    <div className="name-settings">
      {/* Bouton Back en haut à gauche */}
      <div className="header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <h2>Name Settings</h2>

      {/* Type de nom */}
      <div className="setting-group">
        <label>Name Type</label>
        <select value={nameType} onChange={(e) => setNameType(e.target.value)}>
          <option>U.S. English (EN)</option>
          <option>French (FR)</option>
        </select>
      </div>

      {/* Genre */}
      <div className="setting-group">
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option>Male & Female</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>

      {/* Options d'affichage */}
      <div className="setting-group">
        <label>Elements To Show</label>
        <div>
          <input
            type="checkbox"
            checked={includeFirstName}
            onChange={() => setIncludeFirstName(!includeFirstName)}
          />
          First Name
        </div>
        <div>
          <input
            type="checkbox"
            checked={includeLastName}
            onChange={() => setIncludeLastName(!includeLastName)}
          />
          Last Name
        </div>
        <div>
          <input
            type="checkbox"
            checked={includeComma}
            onChange={() => setIncludeComma(!includeComma)}
          />
          Comma (,)
        </div>
      </div>

      {/* Prévisualisation */}
      <div className="preview">
        <h3>Preview</h3>
        <ul>
          {previewNames.map((name, index) => (
            <li key={index}>{name}</li>
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

export default NameSettings;
