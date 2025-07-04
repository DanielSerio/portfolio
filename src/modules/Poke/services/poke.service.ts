import { ApiService } from "#core/services";
import type { NamedItem, PokemonListResponse } from "#poke/types";

class PokeApiService extends ApiService {
  constructor() {
    super('https://pokeapi.co/api/v2');
  }

  private createExtendedEntity(namedItem: NamedItem) {
    const matches = namedItem.url.match(/((\/\d+\/)$)/) ?? [];
    const idString = matches[0]!.replace(/\//g, '');
    const { name, url } = namedItem;

    return {
      id: +idString,
      url,
      name: {
        title: `${name[0].toUpperCase()}${name.slice(1)}`, //TODO: <-- better solution for this
        url: name.replace(/\s+/g, '-')
      }
    };
  }

  async listPokemon(params?: { limit?: number; offset?: never; } | { limit: number; offset?: number; }) {
    const searchParams = new URLSearchParams({
      limit: `${params?.limit ? ~~params?.limit : 25}`,
      offset: `${params?.offset ? ~~params.offset : 0}`
    });

    const response = await this.GET(`/pokemon?${searchParams}`);
    const data = await response.json() as PokemonListResponse;

    return {
      ...data,
      results: data.results.map(this.createExtendedEntity)
    };
  }
}

export const PokeService = new PokeApiService();

