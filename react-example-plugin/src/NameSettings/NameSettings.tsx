import React, { useState } from "react";

interface NameSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
}

const NameSettings: React.FC<NameSettingsProps> = ({ onApply, onBack }) => {
  const [nameType, setNameType] = useState("U.S. English (EN)");
  const [gender, setGender] = useState("Male & Female");
  const [includeFirstName, setIncludeFirstName] = useState(true);
  const [includeLastName, setIncludeLastName] = useState(true);
  const [includeComma, setIncludeComma] = useState(false);

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
          <option>British English (EN-GB)</option>
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
