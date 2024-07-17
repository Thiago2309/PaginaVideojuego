import { Game } from "../../store/reducers/videojuegosReducer"; // Asegúrate de que la ruta es correcta

export const getUniqueOptions = (games: Game[], key: keyof Game) => {
  const options = new Set<string>();
  games.forEach((game) => {
    const value = game[key];
    if (typeof value === "string") {
      value.split(",").forEach((option) => options.add(option.trim()));
    } else if (typeof value === "number") {
      options.add(value.toString());
    }
  });
  return Array.from(options);
};

export const developersOptions = (games: Game[]) => getUniqueOptions(games, "desarrollador");
export const categoriesOptions = (games: Game[]) => getUniqueOptions(games, "genero");
export const platformsOptions = (games: Game[]) => getUniqueOptions(games, "plataforma");

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

export const discountOptions = [
  { value: "0-10", label: "0% - 10%" },
  { value: "11-25", label: "11% - 25%" },
  { value: "26-50", label: "26% - 50%" },
  { value: "51-75", label: "51% - 75%" },
  { value: "76-100", label: "76% - 100%" },
];
