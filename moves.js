'use strict';

exports.BattleMovedex = {
	"pollinatedterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "pollinatedterrain",
		name: "Pollinated Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'pollinatedterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Bug' && defender.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onTryMovePriority: -1,
			onTryMove: function (pokemon, target, move) {
				if (move.flags.bullet && target.isGrounded()) {
					this.damage(this.clampIntRange(Math.round(pokemon.maxhp / 8), 1), pokemon, pokemon, 'Pollinated Terrain');
					return false;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Pollinated Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Pollinated Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Pollinated Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Bug",
		zMoveBoost: {spd: 1},
	},
	"murkyterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "murkyterrain",
		name: "Murky Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'murkyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Psychic' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('terrain weaken');
					return this.chainModify(0.5);
				}
			},
			onBoost: function (boost, target, source, effect) {
				if (source && (!effect.infiltrates || target.side === source.side) && target.isGrounded()) {
					let showMsg = false;
					for (let i in boost) {
						if (target !== source || boost[i] > 0) {
							delete boost[i];
							showMsg = true;
						}
					}
					if (showMsg && !effect.secondaries) this.add('-activate', target, 'move: Murky Terrain');
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Murky Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Murky Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Murky Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Dark",
		zMoveBoost: {def: 1},
	},
	"regalterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "regalterrain",
		name: "Regal Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'regalterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Dragon' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onNegateImmunity: function (pokemon, type) {
				if (pokemon.isGrounded()) return false;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Regal Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Regal Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Regal Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Dragon",
		zMoveBoost: {spa: 1},
	},
	"fieryterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "fieryterrain",
		name: "Fiery Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'fieryterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onResidualOrder: 5,
			onResidualSubOrder: 2,
			onResidual: function () {
				this.eachEvent('Terrain');
			},
			onTerrain: function (pokemon) {
				if (pokemon.isGrounded() && pokemon.types.indexOf('Fire') < 0 && !pokemon.isSemiInvulnerable()) {
					this.damage(pokemon.maxhp / 8, pokemon, pokemon, 'Fiery Terrain');
				}
			},
			onTrapPokemon: function (pokemon) {
				if (pokemon.isGrounded() && pokemon.types.indexOf('Fire') < 0) {
					if (this.effectData.source && this.effectData.source.isActive) pokemon.tryTrap();
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Fiery Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Fiery Terrain');
				}
			},
			onEnd: function () {
				this.add('-fieldend', 'move: Fiery Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Fiery",
		zMoveBoost: {atk: 1},
	},
	"chakraterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "chakraterrain",
		name: "Chakra Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'chakraterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Fighting' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onNegateImmunity: function (pokemon, type) {
				if (pokemon.isGrounded() && pokemon.hasType('Dark') && type === 'Psychic') return false;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Chakra Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Chakra Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Chakra Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Fighting",
		zMoveBoost: {atk: 1},
	},
	"gustyterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "gustyterrain",
		name: "Gusty Terrain",
		pp: 10,
		priority: 0,
		flags: {},
		terrain: 'gustyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Flying' && !attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onBoost: function (boost, target, source, effect) {
				if (source && (!effect.infiltrates || target.side === source.side) && !target.isGrounded()) {
					let showMsg = false;
					if (boost['spe'] != 0) {
						delete boost['spe'];
						showMsg = true;
					}
					if (showMsg && !effect.secondaries) this.add('-activate', target, 'move: Gusty Terrain');
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Gusty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Gusty Terrain');
				}
				for (let i = 0; i < this.sides.length; i++) {
					for (let j = 0; j < this.sides[i].active.length; j++) {
						if (this.sides[i].active[j] && this.sides[i].active[j].isActive && !this.sides[i].active[j].isGrounded() && this.sides[i].active[j].boosts['spe'] !== 0) {
							this.add('-clearallboost');
							this.sides[i].active[j].setBoost({spe: 0});
						}
					}
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Gusty Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Flying",
		zMoveBoost: {spe: 1},
	},
	"ominousterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "ominousterrain",
		name: "Ominous Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'ominousterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Ghost' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onDisableMove: function (pokemon) {
				if (pokemon.isGrounded()) {
					for (let i = 0; i < pokemon.moveset.length; i++) {
						if (this.getMove(pokemon.moveset[i].id).flags['heal']) {
							pokemon.disableMove(pokemon.moveset[i].id);
						}
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (pokemon.isGrounded() && move.flags['heal']) {
					this.add('cant', pokemon, 'move: Ominous Terrain', move);
					return false;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Ominous Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Ominous Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Ominous Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Ghost",
		zMoveBoost: {spe: 1},
	},
	"sandyterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "sandyterrain",
		name: "Sandy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'sandyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if ((move.type === 'Ground' || move.type === 'Rock' || move.type === 'Steel') && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.3);
				}
			},
			onTryHit: function (target, pokemon, move) {
				if (target.isGrounded() && target.types.indexOf('Ground') >= 0 && pokemon !== target && move.category === 'Status') {
					this.add('-immune', target, '[msg]', '[from] move: Sandy Terrain');
					return null;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Sandy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Sandy Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Sandy Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Ground",
		zMoveBoost: {def: 1},
	},
	"frostyterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "frostyterrain",
		name: "Frosty Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'frostyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Ice' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onDisableMove: function (pokemon) {
				if (pokemon.isGrounded()) {
					for (let i = 0; i < pokemon.moveset.length; i++) {
						if (this.getMove(pokemon.moveset[i].id).type === 'Water' && !(pokemon.moveset[i].id in {'scald':1, 'steameruption':1})) {
							pokemon.disableMove(pokemon.moveset[i].id);
						}
					}
				}
			},
			onBeforeMovePriority: 6,
			onBeforeMove: function (pokemon, target, move) {
				if (pokemon.isGrounded() && move.type === 'Water' && !(move.id in {'scald':1, 'steameruption':1})) {
					this.add('cant', pokemon, 'move: Frosty Terrain', move);
					return false;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Frosty Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Frosty Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Frosty Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Ice",
		zMoveBoost: {spa: 1},
	},
	"cloudyterrain": {
		num: 604,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "cloudyterrain",
		name: "Cloudy Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'cloudyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Normal' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
				if (move.type !== 'Normal' && defender.isGrounded() && !defender.isSemiInvulnerable()) {
					this.debug('terrain weaken');
					return this.chainModify(0.75);
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Cloudy Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Cloudy Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Cloudy Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Normal",
		zMoveBoost: {spd: 1},
	},
	"rockyterrain": {
		num: 604,
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "rockyterrain",
		name: "Rocky Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'rockyterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Rock' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onModifyAccuracy: function (accuracy, target, source, move) {
				if (source.isGrounded()) {
					if (typeof accuracy !== 'number') return;
					return accuracy * 4 / 3;
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Rocky Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Rocky Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Rocky Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Rock",
		zMoveBoost: {att: 1},
	},
	"corrosiveterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "corrosiveterrain",
		name: "Corrosive Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'corrosiveterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Poison' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onNegateImmunity: function (pokemon, type) {
				if (pokemon.isGrounded() && pokemon.hasType('Steel') && type === 'Poison') return false;
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Corrosive Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Corrosive Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Corrosive Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Poison",
		zMoveBoost: {spe: 1},
	},
	"steelstrewnterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "steelstrewnterrain",
		name: "Steelstrewn Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'steelstrewnterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Steel' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Steelstrewn Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Steelstrewn Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Steelstrewn Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Steel",
		zMoveEffect: 'crit2',
	},
	"aquaticterrain": {
		accuracy: true,
		basePower: 0,
		category: "Status",
		id: "aquaticterrain",
		name: "Aquatic Terrain",
		pp: 10,
		priority: 0,
		flags: {nonsky: 1},
		terrain: 'aquaticterrain',
		effect: {
			duration: 5,
			durationCallback: function (source, effect) {
				if (source && source.hasItem('terrainextender')) {
					return 8;
				}
				return 5;
			},
			onBasePower: function (basePower, attacker, defender, move) {
				if (move.type === 'Water' && attacker.isGrounded() && !attacker.isSemiInvulnerable()) {
					this.debug('terrain boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpe: function (spe, pokemon) {
				if (pokemon.isGrounded()) {
					if (pokemon.types.indexOf('Water') >= 0) return this.chainModify(1.5);
					else return this.chainModify(0.5);
				}
			},
			onStart: function (battle, source, effect) {
				if (effect && effect.effectType === 'Ability') {
					this.add('-fieldstart', 'move: Aquatic Terrain', '[from] ability: ' + effect, '[of] ' + source);
				} else {
					this.add('-fieldstart', 'move: Aquatic Terrain');
				}
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd: function () {
				this.add('-fieldend', 'move: Steelstrewn Terrain');
			},
		},
		secondary: false,
		target: "all",
		type: "Water",
		zMoveBoost: {spe: 1},
	},

	"camouflage": {
		inherit: true,
		onHit: function (target) {
			let newType = 'Normal';
			if (this.isTerrain('electricterrain')) {
				newType = 'Electric';
			} else if (this.isTerrain('grassyterrain')) {
				newType = 'Grass';
			} else if (this.isTerrain('mistyterrain')) {
				newType = 'Fairy';
			} else if (this.isTerrain('psychicterrain')) {
				newType = 'Psychic';
			} else if (this.isTerrain('pollinatedterrain')) {
				newType = 'Bug';
			} else if (this.isTerrain('murkyterrain')) {
				newType = 'Dark';
			} else if (this.isTerrain('regalterrain')) {
				newType = 'Dragon';
			} else if (this.isTerrain('fieryterrain')) {
				newType = 'Fire';
			} else if (this.isTerrain('chakraterrain')) {
				newType = 'Fighting';
			} else if (this.isTerrain('gustyterrain')) {
				newType = 'Flying';
			} else if (this.isTerrain('ominousterrain')) {
				newType = 'Ghost';
			} else if (this.isTerrain('sandyterrain')) {
				newType = 'Ground';
			} else if (this.isTerrain('frostyterrain')) {
				newType = 'Ice';
			} else if (this.isTerrain('rockyterrain')) {
				newType = 'Rock';
			} else if (this.isTerrain('corrosiveterrain')) {
				newType = 'Poison';
			} else if (this.isTerrain('steelstrewnterrain')) {
				newType = 'Steel';
			} else if (this.isTerrain('aquaticterrain')) {
				newType = 'Water';
			}
			if (!target.setType(newType)) return false;
			this.add('-start', target, 'typechange', newType);
		},
	},
	"naturepower": {
		inherit: true,
		onTryHit: function (target, pokemon) {
			let move = 'triattack';
			if (this.isTerrain('electricterrain')) {
				move = 'thunderbolt';
			} else if (this.isTerrain('grassyterrain')) {
				move = 'energyball';
			} else if (this.isTerrain('mistyterrain')) {
				move = 'moonblast';
			} else if (this.isTerrain('psychicterrain')) {
				move = 'psychic';
			} else if (this.isTerrain('pollinatedterrain')) {
				move = 'pollenpuff';
			} else if (this.isTerrain('murkyterrain')) {
				move = 'darkpulse';
			} else if (this.isTerrain('regalterrain')) {
				move = 'dragonpulse';
			} else if (this.isTerrain('fieryterrain')) {
				move = 'lavaplume';
			} else if (this.isTerrain('chakraterrain')) {
				move = 'aurasphere';
			} else if (this.isTerrain('gustyterrain')) {
				move = 'airslash';
			} else if (this.isTerrain('ominousterrain')) {
				move = 'shadowball';
			} else if (this.isTerrain('sandyterrain')) {
				move = 'earthpower';
			} else if (this.isTerrain('frostyterrain')) {
				move = 'icebeam';
			} else if (this.isTerrain('rockyterrain')) {
				move = 'powergem';
			} else if (this.isTerrain('corrosiveterrain')) {
				move = 'sludgebomb';
			} else if (this.isTerrain('steelstrewnterrain')) {
				move = 'mirrorshot';
			} else if (this.isTerrain('aquaticterrain')) {
				move = 'surf';
			}
			this.useMove(move, pokemon, target);
			return null;
		},
	},
	"secretpower": {
		inherit: true,
		onModifyMove: function (move, pokemon) {
			if (this.isTerrain('') || this.isTerrain('chakraterrain') || this.isTerrain('cloudyterrain')) return;
			move.secondaries = [];
			if (this.isTerrain('electricterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'par',
				});
			} else if (this.isTerrain('grassyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'slp',
				});
			} else if (this.isTerrain('mistyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spa: -1,
					},
				});
			} else if (this.isTerrain('psychicterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spe: -1,
					},
				});
			} else if (this.isTerrain('pollinatedterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						spd: -1,
					},
				});
			} else if (this.isTerrain('murkyterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'torment',
				});
			} else if (this.isTerrain('regalterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'flinch',
				});
			} else if (this.isTerrain('fieryterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'brn',
				});
			} else if (this.isTerrain('gustyterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'telekinesis',
				});
			} else if (this.isTerrain('ominousterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						def: -1,
					},
				});
			} else if (this.isTerrain('sandyterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						def: -1,
					},
				});
			} else if (this.isTerrain('frostyterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'frz',
				});
			} else if (this.isTerrain('rockyterrain')) {
				move.secondaries.push({
					chance: 30,
					volatileStatus: 'flinch',
				});
			} else if (this.isTerrain('corrosiveterrain')) {
				move.secondaries.push({
					chance: 30,
					status: 'tox',
				});
			} else if (this.isTerrain('steelstrewnterrain')) {
				move.secondaries.push({
					chance: 30,
					self: {
						boosts: {
							atk: 1,
						},
					},
				});
			} else if (this.isTerrain('aquaticterrain')) {
				move.secondaries.push({
					chance: 30,
					boosts: {
						atk: -1,
					},
				});
			}
		},
		secondary: {
			chance: 30,
			status: 'par',
		},
	},
};
