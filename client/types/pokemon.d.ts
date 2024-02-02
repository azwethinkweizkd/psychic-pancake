interface Move {
	name: string;
	url: string;
	version_group_details: [];
}

interface Stat {
	stat: {
		name: string;
	};
	base_stat: number;
}

interface Pokemon {
	name: string;
	sprites: {
		front_default: string;
	};
	stats: Stat[];
	moves: Move[];
}

interface PokemonCard {
	name: string;
	sprite: string;
	hp: number;
	moves: Move[];
}

export { PokemonCard, Pokemon, Move, Stat };
