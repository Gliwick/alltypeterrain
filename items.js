'use strict';

exports.BattleItems = {
	"pollenseed": {
		id: "pollenseed",
		name: "Pollen Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('pollinatedterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"murkyseed": {
		id: "murkyseed",
		name: "Murky Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('murkyterrain') && pokemon.useItem()) {
				this.add('-clearallboost');
				for (let i = 0; i < this.sides.length; i++) {
					for (let j = 0; j < this.sides[i].active.length; j++) {
						if (this.sides[i].active[j] && this.sides[i].active[j].isActive) this.sides[i].active[j].clearBoosts();
					}
				}
			}
		},
		gen: 7,
	},
	"regalseed": {
		id: "regalseed",
		name: "Regal Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('regalterrain') && pokemon.useItem()) {
				this.boost({spa: 1});
			}
		},
		gen: 7,
	},
	"pepperseed": {
		id: "pepperseed",
		name: "Pepper Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('fieryterrain') && pokemon.useItem()) {
				this.boost({atk: 1});
			}
		},
		gen: 7,
	},
	"chakraseed": {
		id: "chakraseed",
		name: "Chakra Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('chakraterrain') && pokemon.useItem()) {
				pokemon.addVolatile('focusenergy');
			}
		},
		gen: 7,
	},
	"gustyseed": {
		id: "gustyseed",
		name: "Gusty Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('gustyterrain') && pokemon.useItem()) {
				this.boost({spe: 1});
			}
		},
		gen: 7,
	},
	"ominousseed": {
		id: "ominousseed",
		name: "Ominous Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('ominousterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"sandyseed": {
		id: "sandyseed",
		name: "Sandy Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('sandyterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"frostyseed": {
		id: "frostyseed",
		name: "Frosty Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('frostyterrain') && pokemon.useItem()) {
				this.boost({def: 1});
			}
		},
		gen: 7,
	},
	"cloudyseed": {
		id: "cloudyseed",
		name: "Cloudy Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('cloudyterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"rockyseed": {
		id: "rockyseed",
		name: "Rocky Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('rockyterrain') && pokemon.useItem()) {
				this.boost({def: 1});
			}
		},
		gen: 7,
	},
	"corrosiveseed": {
		id: "corrosiveseed",
		name: "Corrosive Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('corrosiveterrain') && pokemon.useItem()) {
				this.boost({spd: 1});
			}
		},
		gen: 7,
	},
	"steelstrewnseed": {
		id: "steelstrewnseed",
		name: "Steelstrewn Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('steelstrewnterrain') && pokemon.useItem()) {
				this.boost({atk: 1});
			}
		},
		gen: 7,
	},
	"submergedseed": {
		id: "submergedseed",
		name: "Submerged Seed",
		spritenum: 664,
		fling: {
			basePower: 10,
		},
		onUpdate: function (pokemon) {
			if (this.isTerrain('aquaticterrain') && pokemon.useItem()) {
				this.boost({spe: 1});
			}
		},
		gen: 7,
	},
};
