import React, { useState, useEffect } from "react";

interface DateSettingsProps {
  onApply: (settings: any) => void;
  onBack: () => void;
  settings: any;
}

const DateSettings: React.FC<DateSettingsProps> = ({ onApply, onBack, settings }) => {
  const [includeDate, setIncludeDate] = useState(settings.includeDate || true);
  const [includeTime, setIncludeTime] = useState(settings.includeTime || false);
  const [dateFormat, setDateFormat] = useState(settings.dateFormat || "YYYY-MM-DD");
  const [timeFormat, setTimeFormat] = useState(settings.timeFormat || "HH:mm:ss");
  const [preview, setPreview] = useState<string[]>([]);

  // Mettre à jour la prévisualisation à chaque changement de paramètres
  useEffect(() => {
    updatePreview();
  }, [includeDate, includeTime, dateFormat, timeFormat]);

  const updatePreview = () => {
    const previewArray = Array.from({ length: 2 }).map(() => {
      const date = new Date();
      const dateString = includeDate ? formatDate(date, dateFormat) : "";
      const timeString = includeTime ? formatTime(date, timeFormat) : "";
      return [dateString, timeString].filter(Boolean).join(" ");
    });
    setPreview(previewArray);
  };

  const formatDate = (date: Date, format: string) => {
    const options: Intl.DateTimeFormatOptions = {};
    switch (format) {
      case "MMMM DD, YYYY":
        options.month = "long";
        options.day = "2-digit";
        options.year = "numeric";
        break;
      case "MMMM D, YYYY":
        options.month = "long";
        options.day = "numeric";
        options.year = "numeric";
        break;
      case "MMM D, YYYY":
        options.month = "short";
        options.day = "numeric";
        options.year = "numeric";
        break;
      case "dddd, MMMM D, YYYY":
        options.weekday = "long";
        options.month = "long";
        options.day = "numeric";
        options.year = "numeric";
        break;
      case "MM/DD/YYYY":
        options.month = "2-digit";
        options.day = "2-digit";
        options.year = "numeric";
        break;
      case "M/D/YY":
        options.month = "numeric";
        options.day = "numeric";
        options.year = "2-digit";
        break;
      default: // YYYY-MM-DD
        return date.toISOString().split("T")[0];
    }
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const formatTime = (date: Date, format: string) => {
    const options: Intl.DateTimeFormatOptions = {};
    switch (format) {
      case "h:mm a":
        options.hour = "numeric";
        options.minute = "2-digit";
        options.hour12 = true;
        break;
      case "h:mm:ss a":
        options.hour = "numeric";
        options.minute = "2-digit";
        options.second = "2-digit";
        options.hour12 = true;
        break;
      case "HH:mm":
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.hour12 = false;
        break;
      case "HH:mm:ss":
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
        options.hour12 = false;
        break;
      default:
        return date.toTimeString().split(" ")[0];
    }
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleApply = () => {
    onApply({ includeDate, includeTime, dateFormat, timeFormat });
  };

  return (
    <div className="date-settings">
      <div className="header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>

      <h2>Date & Time Settings</h2>

      {/* Option d'inclusion de la date */}
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={includeDate}
            onChange={() => setIncludeDate(!includeDate)}
          />
          Date
        </label>
        {includeDate && (
          <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            <option value="MMMM DD, YYYY">August 15, 2019</option>
            <option value="MMMM D, YYYY">August 15th, 2019</option>
            <option value="MMM D, YYYY">Aug 15, 2019</option>
            <option value="dddd, MMMM D, YYYY">Thursday, August 15, 2019</option>
            <option value="MM/DD/YYYY">8/15/2019</option>
            <option value="M/D/YY">8/15/19</option>
          </select>
        )}
      </div>

      {/* Option d'inclusion de l'heure */}
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={includeTime}
            onChange={() => setIncludeTime(!includeTime)}
          />
          Time
        </label>
        {includeTime && (
          <select value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)}>
            <option value="h:mm a">7:06 PM</option>
            <option value="h:mm:ss a">7:06:27 PM</option>
            <option value="HH:mm">19:06</option>
            <option value="HH:mm:ss">19:06:27</option>
          </select>
        )}
      </div>

      {/* Prévisualisation */}
      <div className="preview">
        <h3>Preview</h3>
        <ul>
          {preview.map((value, index) => (
            <li key={index}>{value}</li>
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

export default DateSettings;
