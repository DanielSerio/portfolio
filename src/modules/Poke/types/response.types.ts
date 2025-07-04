export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedItem[];
}

export interface NamedItem {
  name: string;
  url: string;
}

export type ExtendedPokemonType = {
  id: number;
  url: string;
  name: {
    title: string;
    url: string;
  };
};