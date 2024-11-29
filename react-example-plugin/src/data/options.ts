import { Option } from "../interfaces/interfaces";

export const options: Option[] = [
  { id: "name", label: "Name", description: "First Name Last Name (EN, M/F)", icon: "👤" },
  { id: "companies", label: "Companies", description: "Example Corporation", icon: "🏢" },
  { id: "phone", label: "Phone", description: "(xxx) xxx-xxxx", icon: "📞" },
  { id: "number", label: "Number", description: "xxx.xx", icon: "🔢" },
  { id: "date-time", label: "Date & Time", description: "Recent dates", icon: "📅" },
  { id: "lorem-ipsum", label: "Lorem Ipsum", description: "Random text", icon: "✍️" },
  { id: "addresses", label: "Addresses", description: "Street, City, Zip", icon: "🏠" },
  { id: "email", label: "Email", description: "janedoe@example.com", icon: "📧" },
  { id: "url", label: "URL", description: "http://example.com", icon: "🌐" },
  { id: "user-names", label: "User Names", description: "janedoe", icon: "👥" },
  { id: "countries", label: "Countries", description: "Random country", icon: "🌍" },
];
