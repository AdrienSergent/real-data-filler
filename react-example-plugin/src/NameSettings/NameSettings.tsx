import React, { useState, useEffect } from "react";

interface NameSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
  settings: any;
}

const NameSettings: React.FC<NameSettingsProps> = ({ onApply, onBack, settings }) => {
  const [nameType, setNameType] = useState(settings.nameType);
  const [gender, setGender] = useState(settings.gender);
  const [includeFirstName, setIncludeFirstName] = useState(settings.includeFirstName);
  const [includeLastName, setIncludeLastName] = useState(settings.includeLastName);
  const [includeComma, setIncludeComma] = useState(settings.includeComma);

  useEffect(() => {
    setNameType(settings.nameType);
    setGender(settings.gender);
    setIncludeFirstName(settings.includeFirstName);
    setIncludeLastName(settings.includeLastName);
    setIncludeComma(settings.includeComma);
  }, [settings]);

  const handleApply = () => {
    onApply({ nameType, gender, includeFirstName, includeLastName, includeComma });
  };

  return (
    <div className="name-settings">
      <h2>Name Settings</h2>
      <div className="setting-group">
        <label>Name Type</label>
        <select value={nameType} onChange={(e) => setNameType(e.target.value)}>
          <option>U.S. English (EN)</option>
          <option>French (FR)</option>
        </select>
      </div>
      <div className="setting-group">
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option>Male & Female</option>
          <option>Male</option>
          <option>Female</option>
        </select>
      </div>
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
      <button onClick={handleApply}>Apply</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default NameSettings;
