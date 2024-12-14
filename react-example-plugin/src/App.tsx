import React, { useEffect, useState } from "react";
import "./App.css";
import TabBar from "./components/TabBar/TabBar";
import OptionsContainer from "./components/OptionsContainer/OptionsContainer";
import StatusMessage from "./components/StatusMessage/StatusMessage";
import GenerateButton from "./components/GenerateButton/GenerateButton";
import AboutContent from "./components/AboutContent/AboutContent";
import NameSettings from "./NameSettings/NameSettings";
import PhoneSettings from "./components/PhoneSettings/PhoneSettings";
import NumberSettings from "./components/NumberSettings/NumberSettings"; 
import DateSettings from "./components/DateSettings/DateSettings";
import AddressSettings from "./components/AddressSettings/AddressSettings";
import { options } from "./data/options";
import { updateTextElements, handleMessage } from "./utils/functions";
import { TextElement } from "./interfaces/interfaces";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("text");
  const [elements, setElements] = useState<TextElement[]>([]);
  const [status, setStatus] = useState<string>("En attente...");
  const [dataType, setDataType] = useState<string>("name");
  const [currentView, setCurrentView] = useState<string>("options");

  const [nameSettings, setNameSettings] = useState<any>({
    nameType: "U.S. English (EN)",
    gender: "Male & Female",
    includeFirstName: true,
    includeLastName: true,
    includeComma: false,
  });

  const [phoneSettings, setPhoneSettings] = useState<any>({
    format: "(XXX) XXX-XXXX", // Format par défaut
  });

  const [numberSettings, setNumberSettings] = useState<any>({
    numberRange: "Ones (x)", // Plage par défaut
    showCurrency: false,
    showDecimal: false,
  });

  const [dateSettings, setDateSettings] = useState<any>({
    includeDate: true,
    includeTime: false,
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm:ss",
  });

  const [addressSettings, setAddressSettings] = useState<any>({
    includeStreet: true,
    includeCity: true,
    includeComma: true,
    includeState: true,
    includeZip: true,
    includeCountry: true,
  });

  useEffect(() => {
    const listener = (event: MessageEvent) =>
      handleMessage(event, setElements, setStatus);

    window.addEventListener("message", listener);
    window.parent.postMessage({ type: "requestSelection" }, "*");

    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

  const handleGenerateClick = () => {
    let settings = {};
    switch (dataType) {
      case "name":
        settings = nameSettings;
        break;
      case "phone":
        settings = phoneSettings;
        break;
      case "number":
        settings = numberSettings;
        break;
      case "date-time":
        settings = dateSettings;
        break;
      case "addresses":
        settings = addressSettings;
        break;
    }

    updateTextElements(
      elements,
      dataType,
      (message: any) => window.parent.postMessage(message, "*"),
      settings
    );
  };

  const handleOpenNameSettings = () => setCurrentView("name-settings");
  const handleApplyNameSettings = (settings: any) => {
    setNameSettings(settings);
    setCurrentView("options");
  };

  const handleOpenPhoneSettings = () => setCurrentView("phone-settings");
  const handleApplyPhoneSettings = (settings: any) => {
    setPhoneSettings(settings);
    setCurrentView("options");
  };

  const handleOpenNumberSettings = () => setCurrentView("number-settings");
  const handleApplyNumberSettings = (settings: any) => {
    setNumberSettings(settings);
    setCurrentView("options");
  };

  const handleOpenDateSettings = () => setCurrentView("date-settings");
  const handleApplyDateSettings = (settings: any) => {
    setDateSettings(settings);
    setCurrentView("options");
  };

  const handleOpenAddressSettings = () => setCurrentView("address-settings");
  const handleApplyAddressSettings = (settings: any) => {
    setAddressSettings(settings);
    setCurrentView("options");
  };

  return (
    <div className="app-container">
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {currentView === "options" && (
        <>
          {activeTab === "text" && (
            <div>
              <h1>Real Data Filler</h1>
              <StatusMessage status={status} />
              <OptionsContainer
                options={options}
                dataType={dataType}
                setDataType={setDataType}
                onCustomizeName={handleOpenNameSettings}
                onCustomizePhone={handleOpenPhoneSettings}
                onCustomizeNumber={handleOpenNumberSettings}
                onCustomizeDate={handleOpenDateSettings}
                onCustomizeAddress={handleOpenAddressSettings}
              />
              <GenerateButton onClick={handleGenerateClick} />
            </div>
          )}
          {activeTab === "about" && <AboutContent />}
        </>
      )}
      {currentView === "name-settings" && (
        <NameSettings
          onApply={handleApplyNameSettings}
          onBack={() => setCurrentView("options")}
          settings={nameSettings}
        />
      )}
      {currentView === "phone-settings" && (
        <PhoneSettings
          onApply={handleApplyPhoneSettings}
          onBack={() => setCurrentView("options")}
          settings={phoneSettings}
        />
      )}
      {currentView === "number-settings" && (
        <NumberSettings
          onApply={handleApplyNumberSettings}
          onBack={() => setCurrentView("options")}
          settings={numberSettings}
        />
      )}
      {currentView === "date-settings" && (
        <DateSettings
          onApply={handleApplyDateSettings}
          onBack={() => setCurrentView("options")}
          settings={dateSettings}
        />
      )}
      {currentView === "address-settings" && (
        <AddressSettings
          onApply={handleApplyAddressSettings}
          onBack={() => setCurrentView("options")}
          settings={addressSettings}
        />
      )}
    </div>
  );
};

export default App;
