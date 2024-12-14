import { Faker, fr, en } from "@faker-js/faker";
import { TextElement } from "../interfaces/interfaces";

/**
 * Retourne une instance Faker configurée pour une locale donnée.
 */
const getCustomFakerInstance = (locale: string): Faker => {
  switch (locale) {
    case "U.S. English (EN)":
      return new Faker({ locale: [en] });
    case "French (FR)":
      return new Faker({ locale: [fr, en] }); // French avec fallback en anglais
    default:
      return new Faker({ locale: [en] }); // Par défaut, anglais
  }
};

/**
 * Retourne les bornes de la plage de nombres en fonction de `numberRange`.
 */
const getNumberRange = (numberRange: string) => {
  switch (numberRange) {
    case "Tens (xx)":
      return { min: 10, max: 99 };
    case "Hundreds (xxx)":
      return { min: 100, max: 999 };
    case "Thousands (xxxx)":
      return { min: 1000, max: 9999 };
    default: // "Ones (x)"
      return { min: 1, max: 9 };
  }
};

/**
 * Retourne une date formatée en fonction des paramètres.
 */
const formatDate = (date: Date, format: string) => {
  switch (format) {
    case "MMMM DD, YYYY":
      return date.toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" });
    case "MMMM D, YYYY":
      return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    case "MMM D, YYYY":
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    case "dddd, MMMM D, YYYY":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    case "MM/DD/YYYY":
      return date.toLocaleDateString("en-US");
    case "M/D/YY":
      return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" });
    default: // "YYYY-MM-DD"
      return date.toISOString().split("T")[0];
  }
};

/**
 * Retourne une heure formatée en fonction des paramètres.
 */
const formatTime = (date: Date, format: string) => {
  switch (format) {
    case "h:mm a":
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    case "h:mm:ss a":
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    case "HH:mm":
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    case "HH:mm:ss":
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    default:
      return date.toTimeString().split(" ")[0];
  }
};

/**
 * Génère des données factices en fonction des paramètres fournis.
 */
export const generateFakeData = (dataType: string, settings: any): string => {
  const faker = getCustomFakerInstance(settings.nameType); // Obtenez l'instance personnalisée

  if (dataType === "name") {
    const fakerGender =
      settings.gender === "Male" ? "male" : settings.gender === "Female" ? "female" : undefined;

    const firstName = settings.includeFirstName
      ? faker.person.firstName(fakerGender)
      : "";
    const lastName = settings.includeLastName ? faker.person.lastName() : "";
    const separator = settings.includeComma ? ", " : " ";
    return `${firstName}${separator}${lastName}`.trim();
  }

  if (dataType === "number") {
    const range = getNumberRange(settings.numberRange);
    let number = faker.number.int({ min: range.min, max: range.max });

    if (settings.showDecimal) {
      number = parseFloat((number + Math.random()).toFixed(2));
    }

    if (settings.showCurrency) {
      return `$${number}`;
    }

    return number.toString();
  }

  if (dataType === "date-time") {
    const date = new Date(Date.now() + Math.random() * 10000000000); // Générer une date aléatoire
    const includeDate = settings.includeDate ?? true;
    const includeTime = settings.includeTime ?? false;
  
    const dateString = includeDate ? formatDate(date, settings.dateFormat) : "";
    const timeString = includeTime ? formatTime(date, settings.timeFormat) : "";
  
    return [dateString, timeString].filter(Boolean).join(" ");
  }

  if (dataType === "lorem-ipsum") {
    const format = settings.format || "Paragraphs";
    const count = Math.min(settings.count || 1, 500); // Limite à 500

    if (format === "Words") {
      return faker.lorem.words(count);
    }
    if (format === "Sentences") {
      return faker.lorem.sentences(count);
    }
    if (format === "Paragraphs") {
      return faker.lorem.paragraphs(count, "\n\n");
    }
  }

  if (dataType === "addresses") {
    const parts = [];
    if (settings.includeStreet) parts.push(faker.address.streetAddress());
    if (settings.includeCity) parts.push(faker.address.city());
    if (settings.includeState) parts.push(faker.address.state());
    if (settings.includeZip) parts.push(faker.address.zipCode());
    if (settings.includeCountry) parts.push(faker.address.country());
    return parts.join(settings.includeComma ? ", " : " ");
  }

  switch (dataType) {
    case "companies":
      return faker.company.name();
    case "phone":
      return faker.phone.number();
    case "addresses":
      return faker.address.streetAddress();
    case "email":
      return faker.internet.email();
    case "url":
      return faker.internet.url();
    case "user-names":
      return faker.internet.userName();
    case "countries":
      return faker.address.country();
    default:
      return "Texte par défaut";
  }
};

/**
 * Met à jour les éléments texte sélectionnés avec des données factices.
 */
export const updateTextElements = (
  elements: TextElement[],
  dataType: string,
  postMessage: (message: any) => void,
  settings: any
) => {
  const fakeDataArray = elements.length
    ? elements.map(() => generateFakeData(dataType, settings))
    : [generateFakeData(dataType, settings)];

  postMessage({ type: "updateText", contents: fakeDataArray });
};

/**
 * Gestionnaire de messages provenant de Penpot.
 */
export const handleMessage = (
  event: MessageEvent,
  setElements: React.Dispatch<React.SetStateAction<TextElement[]>>,
  setStatus: React.Dispatch<React.SetStateAction<string>>
) => {
  const message = event.data;

  switch (message.type) {
    case "selectionData":
      setElements(message.elements || []);
      break;
    case "updateSuccess":
      setStatus("Tous les éléments texte ont été mis à jour.");
      break;
    case "error":
      setStatus(message.message || "Erreur inconnue.");
      break;
    default:
      console.warn("Message inconnu reçu :", message);
  }
};
