export interface Deal {
  dealID: string;
  title: string;
  normalPrice: number;
  salePrice: number;
  thumb: string;
  metacriticLink: string;
  storeID: string;
  storeName: string;
}

export interface SavedDeal extends Deal {
  link: string;
}
