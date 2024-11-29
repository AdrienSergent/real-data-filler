interface PenpotSelection {
  id: string;
  type: string;
  content: string;
  setTextContent: any;
  position: any;
  size: any;
  style: any;
  x: any;
  y: any;
  characters: any;
}

interface PenpotUI {
  open: (title: string, url: string) => void;
  onMessage: (callback: (message: any) => void) => void;
  sendMessage: (message: any) => void;
}

interface Penpot {
  selection: PenpotSelection[]; // Ajout de la sélection actuelle
  ui: PenpotUI;
  updateElement: (id: string, updates: { content: string }) => Promise<void>; // Modification d'un élément
  on: (event: string, callback: (data: any) => void) => void; // Gestion des événements comme `themechange`
  theme: string; // Thème actuel (par exemple : "dark" ou "light")
  createText: any;
  deleteElement: any;
}

declare const penpot: Penpot;
