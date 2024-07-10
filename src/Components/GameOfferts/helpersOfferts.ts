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
