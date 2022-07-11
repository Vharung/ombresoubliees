import { ombreoublieActor } from"./sheets/ombreoublieactor.js";
import { ombreoublieActorSheet } from "./sheets/ombreoublieactorsheet.js";
import { ombreoublieItem } from "./sheets/ombreoublieitem.js";
import { ombreoublieItemSheet } from "./sheets/ombreoublieitemsheet.js";


Hooks.once("init", async function() {
    console.log("ombreoublie | Initialisation du système ombreoublie Chronicles");
	CONFIG.Actor.documentClass = ombreoublieActor;
    CONFIG.Item.documentClass = ombreoublieItem;

    CONFIG.Combat.initiative = {
	    formula: "1d6",
	    decimals: 2
	};

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("ombreoublie", ombreoublieItemSheet, { makeDefault: true });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("ombreoublie", ombreoublieActorSheet, { makeDefault: true });
});

