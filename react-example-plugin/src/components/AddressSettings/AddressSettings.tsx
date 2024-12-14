import React, { useState, useEffect } from "react";

interface AddressSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
  settings: any;
}

const AddressSettings: React.FC<AddressSettingsProps> = ({
  onApply,
  onBack,
  settings,
}) => {
  const [includeStreet, setIncludeStreet] = useState(settings.includeStreet ?? true);
  const [includeCity, setIncludeCity] = useState(settings.includeCity ?? true);
  const [includeComma, setIncludeComma] = useState(settings.includeComma ?? true);
  const [includeState, setIncludeState] = useState(settings.includeState ?? true);
  const [includeZip, setIncludeZip] = useState(settings.includeZip ?? true);
  const [includeCountry, setIncludeCountry] = useState(settings.includeCountry ?? true);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    updatePreview();
  }, [includeStreet, includeCity, includeComma, includeState, includeZip, includeCountry]);

  const updatePreview = () => {
    const parts = [];
    if (includeStreet) parts.push("3890 Poplar Dr");
    if (includeCity) parts.push("Santa Clara");
    if (includeState) parts.push("Michigan");
    if (includeZip) parts.push("99534");
    if (includeCountry) parts.push("United States");
    const previewString = parts.join(includeComma ? ", " : " ");
    setPreview(previewString);
  };

  const handleApply = () => {
    onApply({
      includeStreet,
      includeCity,
      includeComma,
      includeState,
      includeZip,
      includeCountry,
    });
  };

  return (
    <div className="address-settings">
      <div className="header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>
      <h2>U.S. Addresses Settings</h2>
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={includeStreet}
            onChange={() => setIncludeStreet(!includeStreet)}
          />
          Street
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeCity}
            onChange={() => setIncludeCity(!includeCity)}
          />
          City
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeComma}
            onChange={() => setIncludeComma(!includeComma)}
          />
          Comma (,)
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeState}
            onChange={() => setIncludeState(!includeState)}
          />
          State
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeZip}
            onChange={() => setIncludeZip(!includeZip)}
          />
          Zip
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeCountry}
            onChange={() => setIncludeCountry(!includeCountry)}
          />
          Country
        </label>
      </div>
      <div className="preview">
        <h3>Preview</h3>
        <p>{preview}</p>
      </div>
      <div className="button-container">
        <button className="apply-button" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default AddressSettings;
