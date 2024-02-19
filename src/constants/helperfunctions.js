import { uuid } from "uuidv4";

export const generateId = () => {
  const id = uuid();
  const plainText = id.replace(/-/g, "");
  return plainText.toUpperCase();
};

export const removeDashesAndJoin = (inputString) => {
  return inputString.replace(/-/g, "");
};

export const convertMongoDBDateString = (dateString) => {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
