interface RawSearchResponseResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

export type RawLocationSearchResponse = RawSearchResponseResult[];

export interface ParsedLocationSearchResponseResult extends Omit<RawSearchResponseResult, 'lat' | 'lon' | 'boundingbox'> {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: number;
  lon: number;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: [number, number, number, number];
}

export type ParsedLocationSearchResponse = ParsedLocationSearchResponseResult[];