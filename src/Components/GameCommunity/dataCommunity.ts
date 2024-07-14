// asignación dinámica de las rutas de las imágenes en los objetos 
const BannerCommunity = require.context("../../assets/images/GameCatalog", true);

export interface CommunityGame {
  id: number;
  releaseDate: string;
  authors: string;
  title: string;
  description: string;
  likes: number;
  dislikes: number;
  comment: number;
  image?: string | null;
}

export const communitygame: CommunityGame[] = [
  {
    id: 1,
    releaseDate: "2018-04-02",
    authors: "Riot Games",
    title: "Valorant",
    description:
      "Valorant es un videojuego de disparos táctico en primera persona multijugador gratuito desarrollado y publicado por Riot Games. El juego fue anunciado con el nombre en clave Project A en octubre de 2019 y fue lanzado el 2 de junio de 2020.",
    likes: 634,
    dislikes: 530,
    comment: 200,
    image: BannerCommunity("./Valorant_banner.jpg"),
  },
  {
    id: 2,
    releaseDate: "2011-11-18",
    authors: "Mojang Studios",
    title: "Minecraft",
    description:
      "Minecraft es un videojuego de construcción, de tipo «mundo abierto» o sandbox creado originalmente por el sueco Markus Persson,​ y posteriormente desarrollado por su empresa, Mojang Studios, y ahora adquirido por Microsoft.",
    likes: 1230,
    dislikes: 230,
    comment: 500,
    image: null,
  },
  {
    id: 3,
    releaseDate: "2021-10-22",
    authors: "Electronic Arts",
    title: "Battlefield",
    description:
      "Battlefield es una serie de videojuegos de disparos en primera persona, que se inició en Microsoft Windows con el videojuego Battlefield 1942, que fue lanzado en 2002.",
    likes: 634,
    dislikes: 130,
    comment: 300,
    image: BannerCommunity("./Battlefield_banner.jpg"),
  },
];

// Función para agregar nuevas publicaciones
export const addPublication = (newPublication: CommunityGame) => {
  communitygame.push(newPublication);
};
