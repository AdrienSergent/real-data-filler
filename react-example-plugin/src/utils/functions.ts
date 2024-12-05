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
    console.log(range, 'range')

    console.log(number, 'number')
    console.log(settings, 'settings global')

    if (settings.showDecimal) {
      number = parseFloat((number + Math.random()).toFixed(2));
      console.log(settings, 'settings show decimal')

    }

    if (settings.showCurrency) {
      console.log(settings, 'settings')

      return `$${number}`;
    }

    return number.toString();
  }

  switch (dataType) {
    case "companies":
      return faker.company.name();
    case "phone":
      return faker.phone.number();
    case "date-time":
      return faker.date.recent().toISOString();
    case "lorem-ipsum":
      return faker.lorem.sentence();
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
