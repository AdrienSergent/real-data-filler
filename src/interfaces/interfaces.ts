export interface TextElement {
    id: string;
    type: string;
    content: string;
  }
  
  export interface PluginMessage {
    type: string;
    elements?: TextElement[];
    message?: string;
  }
  
  export interface Option {
    id: string;
    label: string;
    description: string;
    icon: string;
  }
  