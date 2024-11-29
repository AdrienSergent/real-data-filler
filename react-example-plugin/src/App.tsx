import React, { useEffect, useState } from "react";
import "./App.css"; // Le fichier CSS pour le style
import TabBar from "./components/TabBar/TabBar";
import OptionsContainer from "./components/OptionsContainer/OptionsContainer";
import StatusMessage from "./components/StatusMessage/StatusMessage";
import GenerateButton from "./components/GenerateButton/GenerateButton";
import AboutContent from "./components/AboutContent/AboutContent";
import NameSettings from "./NameSettings/NameSettings";
import { options } from "./data/options";
import { updateTextElements, handleMessage } from "./utils/functions";
import { TextElement } from "./interfaces/interfaces";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("text");
  const [elements, setElements] = useState<TextElement[]>([]);
  const [status, setStatus] = useState<string>("En attente...");
  const [dataType, setDataType] = useState<string>("name");
  const [currentView, setCurrentView] = useState<string>("options"); // Basculer entre les vues
  const [nameSettings, setNameSettings] = useState<any>({
    nameType: "U.S. English (EN)",
    gender: "Male & Female",
    includeFirstName: true,
    includeLastName: true,
    includeComma: false,
  }); // Valeurs par défaut des réglages

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
    updateTextElements(elements, dataType, (message: any) =>
      window.parent.postMessage(message, "*"),
      nameSettings // Passer les réglages des noms
    );
  };

  const handleOpenNameSettings = () => setCurrentView("name-settings");
  const handleApplyNameSettings = (settings: any) => {
    setNameSettings(settings); // Mettre à jour les réglages dans le state
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
                onCustomizeName={handleOpenNameSettings} // Ajouter la gestion de la personnalisation
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
        />
      )}
    </div>
  );
};

export default App;
