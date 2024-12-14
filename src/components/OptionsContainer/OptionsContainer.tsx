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
  onCustomizeName: () => void;
  onCustomizePhone: () => void;
  onCustomizeNumber: () => void;
  onCustomizeDate: () => void;
  onCustomizeAddress: () => void;
}

const OptionsContainer: React.FC<OptionsContainerProps> = ({
  options,
  dataType,
  setDataType,
  onCustomizeName,
  onCustomizePhone,
  onCustomizeNumber,
  onCustomizeDate,
  onCustomizeAddress,
}) => {
  const optionsWithEllipsis = [
    "name",
    "phone",
    "number",
    "date-time",
    "lorem-ipsum",
    "addresses",
  ];

  return (
    <div className="options-container">
      {options.map((option) => (
        <div
          key={option.id}
          className={`option ${dataType === option.id ? "selected" : ""}`}
          onClick={() => setDataType(option.id)}
        >
          <span className="icon">{option.icon}</span>
          <div className="option-details">
            <h3>{option.label}</h3>
            <p>{option.description}</p>
          </div>
          {optionsWithEllipsis.includes(option.id) && (
            <div
              className="ellipsis"
              onClick={(e) => {
                e.stopPropagation();
                if (option.id === "name") onCustomizeName();
                if (option.id === "phone") onCustomizePhone();
                if (option.id === "number") onCustomizeNumber();
                if (option.id === "date-time") onCustomizeDate();
                if (option.id === "addresses") onCustomizeAddress();
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
