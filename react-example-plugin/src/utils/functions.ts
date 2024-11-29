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

  switch (dataType) {
    case "companies":
      return faker.company.name();
    case "phone":
      return faker.phone.number();
    case "number":
      return faker.number.int({ min: 0, max: 1000 }).toString();
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
