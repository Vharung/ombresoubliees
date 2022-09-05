/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
 export class ombreoublieActor extends Actor {

  prepareData() {
    super.prepareData();
    const actorData = this.system;
    const data = actorData;
    const flags = actorData.flags;
  	//preparation dépendant du type de personnage (
  	if (actorData.type === 'personnage') this._preparePJData(actorData);
  }


   /**
   * Prepare Character type specific data
   */
  _preparePJData(actorData) {
    const data = actorData.system;
    console.log(`ombreoublie | Préparation Data PJ.\n`);
    console.log(data);
    actorData.system.encombrement.max=(parseInt(actorData.system.force) + parseInt(actorData.system.caracteristique.puissance)) /2 + 20;
    
  }

  prepareBaseData() {
  }

  prepareDerivedData() {
  }
}