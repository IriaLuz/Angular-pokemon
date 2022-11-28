export interface AllPokemonsType {
  count: number;
  next: string;
  previous: null;
  results: NameAndUrl[];
}

export interface CardType {
  abilities: Ability[];
  base_experience: number;
  forms: NameAndUrl[];
  game_indices: Index[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Mfe[];
  name: string;
  order: number;
  past_types: any[];
  species: NameAndUrl;
  sprites: Sprites;
  stats: PokemonStat[];
  types: PokemonCreatureTypeResource[];
  weight: number;
}
export interface PokemonType {
  height: number;
  name: string;
  weight: number;
  src: string;
  base_stat?: number;
  stat_name?: string;
  types?: string;
}

export interface NameAndUrl {
  name: string;
  url: string;
}
export interface Ability {
  ability: NameAndUrl;
  is_hidden: boolean;
  slot: number;
}
export interface Index {
  game_index: number;
  version: NameAndUrl;
}
export interface Mfe {
  move: NameAndUrl;
  version_group_details: VersionGroupDetail[];
}
export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NameAndUrl;
  version_group: NameAndUrl;
}
interface FrontAndBack {
  back_default: string;
  back_female: any;
  back_shiny: string;
  back_shiny_female: any;
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}
export interface Sprites extends FrontAndBack {
  other: Other;
  versions: Versions;
}
export interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}
export interface DreamWorld {
  front_default: string;
  front_female: any;
}
export interface Home extends DreamWorld {
  front_shiny: string;
  front_shiny_female: any;
}
export interface OfficialArtwork {
  front_default: string;
}
export interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': GenerationVi;
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}
export interface GenerationI {
  'red-blue': Color;
  yellow: Color;
}
export interface ColorBasics {
  back_default: string;
  front_default: string;
  front_transparent: string;
}
export interface Color extends ColorBasics {
  back_gray: string;
  front_gray: string;
  back_transparent: string;
}
export interface GenerationIi {
  crystal: Crystal;
  gold: SilverGold;
  silver: SilverGold;
}
export interface Crystal extends ColorBasics {
  back_shiny: string;
  back_shiny_transparent: string;
  front_shiny: string;
  front_shiny_transparent: string;
  back_transparent: string;
}
export interface SilverGold extends ColorBasics {
  back_shiny: string;
  front_shiny: string;
}
export interface GenerationIii {
  emerald: Emerald;
  'firered-leafgreen': FireredLeafgreenRubySafire;
  'ruby-sapphire': FireredLeafgreenRubySafire;
}
export interface Emerald {
  front_default: string;
  front_shiny: string;
}
export interface FireredLeafgreenRubySafire extends Emerald {
  back_default: string;
  back_shiny: string;
}
export interface GenerationIv {
  'diamond-pearl': FrontAndBack;
  'heartgold-soulsilver': FrontAndBack;
  platinum: FrontAndBack;
}
export interface GenerationV {
  'black-white': BlackWhite;
}
export interface BlackWhite extends FrontAndBack {
  animated: FrontAndBack;
}
export interface GenerationVi {
  'omegaruby-alphasapphire': OmegarubyAlphasapphire;
  'x-y': XY;
}
export interface OmegarubyAlphasapphire {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}
export interface XY {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}
export interface GenerationVii {
  icons: Icons;
  'ultra-sun-ultra-moon': UltraSunUltraMoon;
}
export interface UltraSunUltraMoon {
  front_default: string;
  front_female: any;
  front_shiny: string;
  front_shiny_female: any;
}
export interface GenerationViii {
  icons: Icons;
}
export interface Icons {
  front_default: string;
  front_female: any;
}
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NameAndUrl;
}
export interface PokemonCreatureTypeResource {
  slot: number;
  type: NameAndUrl;
}
