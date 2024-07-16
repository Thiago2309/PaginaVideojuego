export interface Screenshot {
  id: number;
  image: string;
}

export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  description_raw: string;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  developers: { name: string }[];
  publishers: { name: string }[];
  rating: number;
  ratings_count: number;
  metacritic: number;
  tags: { name: string }[];
  screenshots: Screenshot[];
}
