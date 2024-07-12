// helpers.ts
import { GameOffert, gamesOfferts } from "./dataOfferts";

export const getUniqueOptions = (games: GameOffert[], key: keyof GameOffert) => {
  const options = new Set<string>();
  games.forEach((game) => {
    if (Array.isArray(game[key])) {
      (game[key] as string[]).forEach((option) => options.add(option));
    } else {
      options.add(game[key] as string);
    }
  });
  return Array.from(options);
};

export const developersOptions = getUniqueOptions(gamesOfferts, "developers");
export const categoriesOptions = getUniqueOptions(gamesOfferts, "categories");
export const platformsOptions = getUniqueOptions(gamesOfferts, "platforms");
// helpers.ts
export const rangesOptions = [
  { title: "Mitico", color: "#800080" }, // Morado
  { title: "Épico", color: "#3CBBF0" }, // Azul diamante
  { title: "Legendario", color: "#00A82D" }, // Verde esmeralda
  { title: "Raro", color: "#D8D8D8" }, // Gris hierro
  { title: "Común", color: "#B5651D" }, // Café (cuero)
];

export const priceOptions = [
  { value: "0-50", label: "0 - 50" },
  { value: "51-100", label: "51 - 100" },
  { value: "101-200", label: "101 - 200" },
  { value: "201-500", label: "201 - 500" },
  { value: "501-1000", label: "501 - 1000" },
  { value: "1001-", label: "1001 y superior" },
];

//poner decimales
// export const priceOptions = [
//   { value: "0-50", label: "0 - 50.99" },
//   { value: "51-100", label: "51 - 100.99" },
//   { value: "101-200", label: "101 - 200.99" },
//   { value: "201-500", label: "201 - 500.99" },
//   { value: "501-1000", label: "501 - 1000.99" },
// ];


export const discountOptions = [
  { value: "0-10", label: "0% - 10%" },
  { value: "11-25", label: "11% - 25%" },
  { value: "26-50", label: "26% - 50%" },
  { value: "51-75", label: "51% - 75%" },
  { value: "76-100", label: "76% - 100%" },
];
