export interface GameOffert {
  id: number;
  nombre: string;
  descripcion: string,
  calificacion: string;
  foto_Url: string;
  genero: string;
  plataforma: string;
  fecha_Lanzamiento: string;
  desarrollador: string;
  editor: string;
  userId: number;
  precio: number;
  descuento: number;
  link: string;  
  likes?: number; // Añadir likes como un campo opcional
}


// // asignación dinámica de las rutas de las imágenes en los objetos 
// const BannerGame = require.context("../../assets/images/GameCatalog", true);

// export interface GameOffert {
//   id: number;
//   title: string;
//   likes: number;
//   developers: string;
//   categories: string[];
//   platforms: string[];
//   ranges: string;
//   price: number;
//   discount: number;
//   releaseDate: string;
//   image: string;
// }

// export const gamesOfferts: GameOffert[] = [
//   {
//     id: 1,
//     title: "Valorant",
//     likes: 530.5,
//     developers: "Riot Games",
//     categories: ["Acción", "Disparos"],
//     platforms: ["PlayStation 4", "Xbox One"],
//     ranges: "Mitico",
//     price: 148.99,
//     discount: 25,
//     releaseDate: "2018-04-02",
//     image: BannerGame("./Valorant_banner.jpg"),
//   },
//   {
//     id: 2,
//     title: "Minecraft",
//     developers: "Mojang",
//     likes: 734.2,
//     categories: ["Aventura", "Exploración"],
//     platforms: ["Pc", "Móvil"],
//     ranges: "Épico",
//     price: 320.10,
//     discount: 70,
//     releaseDate: "2016-02-05",
//     image: BannerGame("./Minecraft_banner.png"),
//   },
//   {
//     id: 3,
//     title: "Battlefield",
//     developers: "Electronic Arts",
//     likes: 520.3,
//     categories: ["Acción", "Disparos", "Pc"],
//     platforms: ["Pc", "Móvil", "PlayStation5"],
//     ranges: "Legendario",
//     price: 261.22,
//     discount: 35,
//     releaseDate: "2020-11-23",
//     image: BannerGame("./Battlefield_banner.jpg"),
//   },
//   {
//     id: 4,
//     title: "League of Legends",
//     developers: "Riot Games",
//     likes: 860.1,
//     categories: ["Estrategia", "Pc"],
//     platforms: ["Pc"],
//     ranges: "Épico",
//     price: 22.85,
//     discount: 85,
//     releaseDate: "2021-04-09",
//     image: BannerGame("./LoL_banner.jpg"),
//   },
//   {
//     id: 5,
//     title: "MultiVersus",
//     developers: "Player First Games",
//     likes: 530.5,
//     categories: ["Pelea", "Acción"],
//     platforms: ["PlayStation 4", "Xbox One", "Pc"],
//     ranges: "Raro",
//     price: 910.40,
//     discount: 15,
//     releaseDate: "2022-04-03",
//     image: BannerGame("./MultiVersus_banner.jpg"),
//   },
//   {
//     id: 6,
//     title: "Honkai Star Rail",
//     developers: "Hoyoverse",
//     likes: 320.7,
//     categories: ["Gacha", "Pc"],
//     platforms: ["Pc", "Móvil"],
//     ranges: "Legendario",
//     price: 468.69,
//     discount: 12,
//     releaseDate: "2022-03-18",
//     image: BannerGame("./Honkai_banner.png"),
//   },
//   {
//     id: 7,
//     title: "Rainbow Six",
//     developers: "Ubisoft Montreal",
//     likes: 340.8,
//     categories: ["Acción", "Disparos", "PlayStation5"],
//     platforms: ["PlayStation 5", "Pc"],
//     ranges: "Común",
//     price: 309.20,
//     discount: 40,
//     releaseDate: "2015-02-01",
//     image: BannerGame("./Rainbow_banner.jpg"),
//   },
//   {
//     id: 8,
//     title: "Brawl Stars",
//     developers: "Supercell",
//     likes: 230.5,
//     categories: ["Acción", "Disparos"],
//     platforms: ["Móvil"],
//     ranges: "Raro",
//     price: 279.69,
//     discount: 80,
//     releaseDate: "2019-06-04",
//     image: BannerGame("./Brawl_banner.png"),
//   },
//   {
//     id: 9,
//     title: "Rocket League",
//     developers: "Psyonix",
//     likes: 520.1,
//     categories: ["Carros", "Pc", "Estrategia"],
//     platforms: ["PlayStation 5", "Pc"],
//     ranges: "Raro",
//     price: 50.16,
//     discount: 60,
//     releaseDate: "2021-06-21",
//     image: BannerGame("./Rocket_banner.jpg"),
//   },
//   {
//     id: 10,
//     title: "Dead by Daylight",
//     developers: "Behaviour Interactive",
//     likes: 734.2,
//     categories: ["Terror", "Pc"],
//     platforms: ["PlayStation 4", "PlayStation 5", "Pc", "Nintendo"],
//     ranges: "Mitico",
//     price: 871.23,
//     discount: 5,
//     releaseDate: "2017-05-20",
//     image: BannerGame("./DBD_banner.jpg"),
//   },
//   //dame el title de los juegor ordenados de manera ascentende por medio del price y otra por medio del discount
// ];
