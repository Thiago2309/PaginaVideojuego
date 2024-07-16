// helpers.ts
import { Game, games } from "./data";

export const getUniqueOptions = (games: Game[], key: keyof Game) => {
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

export const developersOptions = getUniqueOptions(games, "developers");
export const categoriesOptions = getUniqueOptions(games, "categories");
export const platformsOptions = getUniqueOptions(games, "platforms");
// helpers.ts
export const rangesOptions = [
  { title: "Mitico", color: "#800080" }, // Morado
  { title: "Épico", color: "#3CBBF0" }, // Azul diamante
  { title: "Legendario", color: "#00A82D" }, // Verde esmeralda
  { title: "Raro", color: "#D8D8D8" }, // Gris hierro
  { title: "Común", color: "#B5651D" }, // Café (cuero)
];
