export class ombreoublieActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          classes: ["ombreoublie", "sheet", "actor"],
          //template: "systems/ombreoublie/templates/actor/personnage-sheet.html",
          width: 1210,
          height: 800,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    get template() {
        console.log(`ombreoublie | Récupération du fichier html ${this.actor.type}-sheet.`);
        return `systems/ombreoublie/templates/sheets/${this.actor.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);        
		if (this.actor.type == 'personnage' || this.actor.type == 'pnj' || this.actor.type == 'monstre') {
			this._prepareCharacterItems(data);
		}
        return data;
    }
   
	_prepareCharacterItems(sheetData) {
        const actorData = sheetData.actor;

        // Initialize containers.
        const inventaire = [];
        const sort = [];
        const argent = [];
        
        // Iterate through items, allocating to containers
        // let totalWeight = 0;
        for (let i of sheetData.items) {
          let item = i.items;
          i.img = i.img || DEFAULT_TOKEN;
          if (i.type === 'arme') {
            inventaire.push(i);
          }
          else if (i.type === 'armure') {
            inventaire.push(i);
          }
          else if (i.type === 'objet') {
            inventaire.push(i);
          }
          else if (i.type === 'magie') {
            sort.push(i);
          }
          else if (i.type === 'argent') {
            argent.push(i);
          }
        }

        // Assign and return
        actorData.inventaire = inventaire;
        actorData.sort = sort;
        actorData.argent = argent;
    }


    activateListeners(html){
        super.activateListeners(html);
        //edition items
        html.find('.item-edit').click(this._onItemEdit.bind(this));

        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            let d = Dialog.confirm({
                title: game.i18n.localize("ombreoublie.suppr"),
                content: "<p>"+game.i18n.localize("ombreoublie.confirsuppr")+ item.name + "'.</p>",
                yes: () => item.delete(),
                no: () => { },
                defaultYes: false
            });
            //item.delete();
            li.slideUp(200, () => this.render(false));
        });

        html.find('.item-create').click(ev => {
            event.preventDefault();
            const dataType=$(ev.currentTarget).data('type');
            const name = `New ${dataType.capitalize()}`;
            this.actor.createEmbeddedDocuments('Item', [{ name: name, type: dataType }], { renderSheet: true })
        }); 

        html.find('.item-desc').on('click',function(){
           var hauteur= $(this).parent().parent().css("height");
           if(hauteur=='30px'){
                $(this).parent().parent().css({"height":"auto"});
            }else{
                $(this).parent().parent().css({"height":"30px"});
            }
        });


        //fiche générateur
        html.find('.caractlist').on('click',function(){
            var race=html.find('.raceliste').val();
            var talent=html.find('.clanliste').val(); 
            var archetype=html.find('.religionlist').val(); 
            var cart1=html.find('.cart1').val(); 
            var cart2=html.find('.cart2').val(); 
            var cart3=html.find('.cart3').val(); 
            html.find('.avantagerace').val(cart1+","+cart2+","+cart3); 
            var forc=0;var cons=0;var prec=0;var agil=0;var refle=0;var volon=0;var vigil=0;var chari=0;
            var cpt0=0;var cpt1=0;var cpt2=0;var cpt3=0;var cpt4=0;var cpt5=0;var cpt6=0;var cpt7=0;var cpt8=0;var cpt9=0;
            var cpt10=0;var cpt11=0;var cpt12=0;var cpt13=0;var cpt14=0;var cpt15=0;var cpt16=0;var cpt17=0;var cpt18=0;var cpt19=0;
            var cpt20=0;var cpt21=0;var cpt22=0;var cpt23=0;var cpt24=0;var cpt25=0;var cpt26=0;var cpt27=0;var cpt28=0;var cpt29=0;
            var cpt30=0;var cpt31=0;var cpt32=0;var cpt33=0;var cpt34=0;var cpt35=0;var cpt36=0;var cpt37=0;var cpt38=0;var cpt39=0;
            if(race=="Humain"){
                forc=30;cons=30;prec=30;agil=40;refle=30;volon=50;vigil=30;chari=40;
            }else if(race=="Estonar"){
                forc=40;cons=60;prec=30;agil=25;refle=25;volon=40;vigil=30;chari=30;
            }else if(race=="Sylvar"){
                forc=25;cons=25;prec=40;agil=40;refle=40;volon=40;vigil=40;chari=30;
            }else if(race=="Némien"){
                forc=30;cons=30;prec=25;agil=40;refle=40;volon=60;vigil=25;chari=30;
            }else if(race=="Altonien"){
                forc=40;cons=25;prec=40;agil=30;refle=40;volon=40;vigil=25;chari=40;
            }else if(race=="Rectalien"){
                forc=60;cons=50;prec=25;agil=30;refle=25;volon=30;vigil=35;chari=25;
            }
            if(archetype="Diplomatie"){
                refle=refle+5;chari=chari+5;cpt6=cpt6+5;cpt29=cpt29+5;
            }else if(archetype="Escroc"){
                chari=chari+5;vigil=vigil+5;cpt1=cpt1+5;cpt11=cpt11+5;
            }else if(archetype="Négociant"){
                chari=chari+5;volon=volon+5;cpt27=cpt27+5;cpt25=cpt25+5;
            }else if(archetype="Sentinel"){
                vigil=vigil+5;cons=cons+5;cpt27=cpt27+5;cpt28=cpt28+5;
            }else if(archetype="Pisteur"){
                vigil=vigil+5;prec=prec+5;cpt13=cpt13+5;cpt28=cpt28+5;
            }else if(archetype="Espion"){
                vigil=vigil+5;agil=agil+5;cpt12=cpt12+5;cpt18=cpt18+5;
            }else if(archetype="Chercheur"){
                refle=refle+5;cons=cons+5;cpt9=cpt9+5;cpt20=cpt20+5;
            }else if(archetype="Alchimiste"){
                refle=refle+5;prec=prec+5;cpt9=cpt9+5;cpt0=cpt0+5;
            }else if(archetype="Artificier"){
                refle=refle+5;agil=agil+5;cpt8=cpt8+5;cpt16=cpt16+5;
            }else if(archetype="Combattant"){
                forc=forc+5;cons=cons+5;cpt4=cpt4+5;cpt14=cpt14+5;
            }else if(archetype="Tacticien"){
                forc=forc+5;prec=prec+5;cpt10=cpt10+5;cpt16=cpt16+5;
            }else if(archetype="Gardien"){
                forc=forc+5;volon=volon+5;cpt21=cpt21+5;cpt30=cpt30+5;
            }else if(archetype="Pactisant"){
                volon=volon+5;prec=prec+5;cpt29=cpt29+5;cpt31=cpt31+5;
            }else if(archetype="Sorcier"){
                volon=volon+5;cons=cons+5;cpt24=cpt24+5;cpt31=cpt31+5;
            }else if(archetype="Mage de bataille"){
                volon=volon+5;forc=forc+5;cpt4=cpt4+5;cpt16=cpt16+5;
            }
            var talents=["Acrobatie Équestre","Acuité sensoriel","Adresse au tir","Ambidextre","Calcule mental","Camouflage rural","Camouflage Urbain","Chance","Chirurgie","Code de rue","Combattant Agile","Connaissance des pièges","Coup précis","Course à pied","Dur à cuir","Dur en affaire","Eloquence","Étiquette","Force accrue","Fureur vengeresse","Guerrier-né","Harmonie Arcanique","Linguistique","Méditation","Menaçant","Réflexe accrue","Résistance accrue","Sang-froid","Sens de l’Orientation","Vision nocturne"]
            var bonus=["19","3","28","Ambidextre","30","4","5","D","26","31","32","21","B","15","C","2","12","0","A","33","9","E","34","F","11","G","H","27","24","Vision nocturne"]
            var bon=10;    
            if(talent=="Dur à cuir"){
                bon=5;
            }else if(talent=="Ambidextre"){
                bon="Pas de malus au combat à deux armes";
            }else if(talent=="Force accrue" || talent=="Coup précis" || talent=="Réflexe accrue" || talent=="Résistance accrue" || talent=="Harmonie Arcanique"){
                bon=1;
            }
            for (var i = talents.length - 1; i >= 0; i--) {
                if(talents[i]==talent){
                    html.find('.clan').val(talents[i]+'+'+bon); 
                }
            }
            var caract=[cart1,cart2,cart3]
            for (var i = caract.length - 1; i >= 0; i--) {
                if(caract[i]=="Créativité"){
                    refle=refle+5;vigil=vigil-5;cpt3=cpt3+5;
                }
                else if(caract[i]=="Curiosité"){
                    refle=refle+5;volon=volon-5;cpt20=cpt20+5;
                }
                else if(caract[i]=="Ouverture d\'esprit"){
                    refle=refle+5;chari=chari-5;cpt29=cpt29+5;
                }
                else if(caract[i]=="Amour de l\'apprentissage"){
                    refle=refle+5;cons=cons-5;cpt3=cpt3+5;
                }
                else if(caract[i]=="Perspective"){
                    refle=refle+5;prec=prec-5;cpt10=cpt10+5;
                }
                else if(caract[i]=="Bravoure"){
                    cons=cons+5;vigil=vigil-5;cpt4=cpt4+5;
                }
                else if(caract[i]=="Persistence"){
                    volon=volon+5;vigil=vigil-5;cpt30=cpt30+5;
                }
                else if(caract[i]=="Intégrité"){
                    cons=cons+5;chari=chari+5;cpt19=cpt19+5;
                }
                else if(caract[i]=="Vitalité"){
                    cons=cons+5;refle=refle+5;cpt2=cpt2+5;
                }
                else if(caract[i]=="Amour"){
                    chari=chari+5;vigil=vigil-5;cpt25=cpt25+5;
                }
                else if(caract[i]=="Gentillesse"){
                    chari=chari+5;refle=refle-5;cpt29=cpt29+5;
                }
                else if(caract[i]=="Intelligence sociale"){
                    chari=chari+5;volon=volon-5;cpt16=cpt16+5;
                }
                else if(caract[i]=="Civilité"){
                    volon=volon+5;chari=chari-5;cpt6=cpt6+5;
                }
                else if(caract[i]=="Équité"){
                    volon=volon+5;refle=refle-5;cpt25=cpt25+5;
                }
                else if(caract[i]=="Leadership"){
                    volon=volon+5;volon=volon-5;cpt10=cpt10+5;
                }
                else if(caract[i]=="Pardon"){
                    vigil=vigil+5;chari=chari-5;cpt31=cpt31+5
                }
                else if(caract[i]=="Humilité"){
                    vigil=vigil+5;volon=volon-5;cpt24=cpt24+5;
                }
                else if(caract[i]=="Prudence"){
                    vigil=vigil+5;agil=agil-5;cpt28=cpt28+5;
                }
                else if(caract[i]=="Régulation de soi"){
                    vigil=vigil+5;forc=forc-5;cpt13=cpt13+5;
                }
                else if(caract[i]=="Appréciation de la beauté"){
                    prec=prec+5;vigil=vigil-5;cpt28=cpt28+5;
                }
                else if(caract[i]=="Gratitude"){
                    prec=prec+5;refle=refle-5;cpt31=cpt31+5;
                }
                else if(caract[i]=="Espoir"){
                    forc=forc+5;agil=agil-5;cpt30=cpt30+5;
                }
                else if(caract[i]=="Humour"){
                    prec=prec+5;chari=chari-5;cpt12=cpt12+5;
                }
                else if(caract[i]=="Spiritualité"){
                    volon=volon+5;refle=refle-5;cpt24=cpt24+5;
                }       
            }
            html.find('.phys').val(forc);
            html.find('.forc').val(cons);
            html.find('.agil').val(prec);
            html.find('.char').val(agil);
            html.find('.saga').val(volon);
            html.find('.mental').val(vigil);
            html.find('.astu').val(chari);

            var comp=[cpt0,cpt1,cpt2,cpt3,cpt4,cpt5,cpt6,cpt7,cpt8,cpt9,cpt10,cpt11,cpt12,cpt13,cpt14,cpt15,cpt16,cpt17,cpt18,cpt19,cpt20,cpt21,cpt22,cpt23,cpt24,cpt25,cpt26,cpt27,cpt28,cpt29,cpt30,cpt31,cpt32,cpt33,cpt34]
            for(i=0;i<34;i++){
                html.find('.cpt'+i).val(comp[i]);
                if(comp[i]==0){
                    html.find('.cpt'+i).css({"background":"transparent","color": "#fff"});
                }else if(comp[i]>0){
                    html.find('.cpt'+i).css({"background":"#56853b","color": "white"});
                }else if(comp[i]<0){
                    html.find('.cpt'+i).css({"background":"#a51b1b","color": "white"});
                }
            }
            //Dizaine force D4
            var atta=Math.round(forc/25)
            html.find('.atta').val(atta);
            //Constitution/2
            var vies=Math.round(cons/2)
            html.find('.hp').val(vies);
            html.find('.hpmax').val(vies);
            //precision <25 =0 ; <50 =1 ; <75 =2; 3
            if(prec<=25){
                var rela=0;
            }else if(prec<=50){
                var rela=1;
            }else if(prec<=75){
                var rela=2;
            }else{
                var rela=3;
            }
            html.find('.rela').val(rela);
            //20 + dizaine d agilité
            var chan=Math.floor(agil/10)*10+20
            html.find('.chan').val(chan);
            //dizaine de réflexion
            var sort=Math.floor(refle/10)
            html.find('.mot').val(sort);
            //Volonté / 2
            var magi=Math.floor(volon/2)
            html.find('.psy').val(magi);
            html.find('.psymax').val(magi);
            //Dizaine de vigilance
            var init=Math.floor(vigil/10)
            html.find('.init').val(init);
            //dizaine de charisme
            var poin=Math.floor(chari/10)
            html.find('.dest').val(poin);
            html.find('.destmin').val(poin);



            var demeure = [game.i18n.localize("liber.caract1"),game.i18n.localize("liber.caract2"),game.i18n.localize("liber.caract3"),game.i18n.localize("liber.caract4"),game.i18n.localize("liber.caract5"),game.i18n.localize("liber.caract6"),game.i18n.localize("liber.caract7"),game.i18n.localize("liber.caract8"),game.i18n.localize("liber.caract9"),game.i18n.localize("liber.caract10"),game.i18n.localize("liber.caract11"),game.i18n.localize("liber.caract12")];
            var proximite=[game.i18n.localize("liber.caract13"),game.i18n.localize("liber.caract14"),game.i18n.localize("liber.caract15")];
            var lieu=[game.i18n.localize("liber.caract16"),game.i18n.localize("liber.caract17"),game.i18n.localize("liber.caract18"),game.i18n.localize("liber.caract19"),game.i18n.localize("liber.caract20"),game.i18n.localize("liber.caract21"),game.i18n.localize("liber.caract22"),game.i18n.localize("liber.caract23"),game.i18n.localize("liber.caract24"),game.i18n.localize("liber.caract25"),game.i18n.localize("liber.caract26"),game.i18n.localize("liber.caract27"),game.i18n.localize("liber.caract28"),game.i18n.localize("liber.caract29"),game.i18n.localize("liber.caract30"),game.i18n.localize("liber.caract31"),game.i18n.localize("liber.caract32"),game.i18n.localize("liber.caract33"),game.i18n.localize("liber.caract34")];
            var resident = demeure[Math.floor(Math.random()*demeure.length)]+" "+proximite[Math.floor(Math.random()*proximite.length)]+" "+lieu[Math.floor(Math.random()*lieu.length)];
            html.find('.residence').val(resident);
            var famille = ["Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"];
            var titre=[game.i18n.localize("liber.caract35"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract37"),game.i18n.localize("liber.caract38"),game.i18n.localize("liber.caract39"),game.i18n.localize("liber.caract40"),game.i18n.localize("liber.caract41"),game.i18n.localize("liber.caract42"),game.i18n.localize("liber.caract43"),game.i18n.localize("liber.caract44"),game.i18n.localize("liber.caract45"),game.i18n.localize("liber.caract46"),game.i18n.localize("liber.caract47"),game.i18n.localize("liber.caract48"),game.i18n.localize("liber.caract49"),game.i18n.localize("liber.caract50")];
            var sang = titre[Math.floor(Math.random()*titre.length)]+" de la famille "+famille[Math.floor(Math.random()*famille.length)];
            html.find('.sang').val(sang);       
            var rang=[game.i18n.localize("liber.caract51"),game.i18n.localize("liber.caract52"),game.i18n.localize("liber.caract53"),game.i18n.localize("liber.caract54"),game.i18n.localize("liber.caract55"),game.i18n.localize("liber.caract56"),game.i18n.localize("liber.caract57"),game.i18n.localize("liber.caract58"),game.i18n.localize("liber.caract59")]
            var organisation=[game.i18n.localize("liber.caract60"),game.i18n.localize("liber.caract61"),game.i18n.localize("liber.caract62"),game.i18n.localize("liber.caract63"),game.i18n.localize("liber.caract64"),game.i18n.localize("liber.caract65"),game.i18n.localize("liber.caract66"),game.i18n.localize("liber.caract67"),game.i18n.localize("liber.caract68"),game.i18n.localize("liber.caract69"),game.i18n.localize("liber.caract70"),game.i18n.localize("liber.caract71"),game.i18n.localize("liber.caract72"),game.i18n.localize("liber.caract73"),game.i18n.localize("liber.caract74"),game.i18n.localize("liber.caract75"),game.i18n.localize("liber.caract76"),game.i18n.localize("liber.caract77"),game.i18n.localize("liber.caract78"),game.i18n.localize("liber.caract79")]
            var politique=rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.secte').val(politique);
            var intret=[game.i18n.localize("liber.caract80"),game.i18n.localize("liber.caract81"),game.i18n.localize("liber.caract82"),game.i18n.localize("liber.caract83"),game.i18n.localize("liber.caract84"),game.i18n.localize("liber.caract85"),game.i18n.localize("liber.caract86"),game.i18n.localize("liber.caract87"),game.i18n.localize("liber.caract88"),game.i18n.localize("liber.caract89"),game.i18n.localize("liber.caract90"),game.i18n.localize("liber.caract91"),game.i18n.localize("liber.caract92"),game.i18n.localize("liber.caract93"),game.i18n.localize("liber.caract94"),game.i18n.localize("liber.caract95"),game.i18n.localize("liber.caract96"),game.i18n.localize("liber.caract97"),game.i18n.localize("liber.caract98"),game.i18n.localize("liber.caract99"),game.i18n.localize("liber.caract100"),game.i18n.localize("liber.caract101"),game.i18n.localize("liber.caract102")]
            var groupe=intret[Math.floor(Math.random()*intret.length)]
            html.find('.interet').val(groupe);
            var pertes=[game.i18n.localize("liber.caract103"),game.i18n.localize("liber.caract104"),game.i18n.localize("liber.caract105"),game.i18n.localize("liber.caract106"),game.i18n.localize("liber.caract107"),game.i18n.localize("liber.caract108"),game.i18n.localize("liber.caract109"),game.i18n.localize("liber.caract110"),game.i18n.localize("liber.caract111"),game.i18n.localize("liber.caract112"),game.i18n.localize("liber.caract113"),game.i18n.localize("liber.caract114"),game.i18n.localize("liber.caract115"),game.i18n.localize("liber.caract116"),game.i18n.localize("liber.caract117"),game.i18n.localize("liber.caract118")]
            var dc=pertes[Math.floor(Math.random()*pertes.length)]
            html.find('.proche').val(dc);
            var valeur=[game.i18n.localize("liber.caract119"),game.i18n.localize("liber.caract120"),game.i18n.localize("liber.caract121"),game.i18n.localize("liber.caract122"),game.i18n.localize("liber.caract123"),game.i18n.localize("liber.caract124"),game.i18n.localize("liber.caract125"),game.i18n.localize("liber.caract126"),game.i18n.localize("liber.caract127"),game.i18n.localize("liber.caract128"),game.i18n.localize("liber.caract129"),game.i18n.localize("liber.caract130"),game.i18n.localize("liber.caract131")]
            var moral=valeur[Math.floor(Math.random()*valeur.length)]
            html.find('.moral').val(moral);
            var race=[game.i18n.localize("liber.caract132"),game.i18n.localize("liber.caract133"),game.i18n.localize("liber.caract134"),game.i18n.localize("liber.caract135"),game.i18n.localize("liber.caract136"),game.i18n.localize("liber.caract137")]
            var rang=[game.i18n.localize("liber.caract138"),game.i18n.localize("liber.caract139"),game.i18n.localize("liber.caract140"),game.i18n.localize("liber.caract141"),game.i18n.localize("liber.caract142"),game.i18n.localize("liber.caract143"),game.i18n.localize("liber.caract144"),game.i18n.localize("liber.caract145")]
            var organisation=[game.i18n.localize("liber.caract146"),game.i18n.localize("liber.caract147"),game.i18n.localize("liber.caract148"),game.i18n.localize("liber.caract149"),game.i18n.localize("liber.caract150"),game.i18n.localize("liber.caract151"),game.i18n.localize("liber.caract152"),game.i18n.localize("liber.caract153"),game.i18n.localize("liber.caract154"),game.i18n.localize("liber.caract155"),game.i18n.localize("liber.caract156"),game.i18n.localize("liber.caract157"),game.i18n.localize("liber.caract158"),game.i18n.localize("liber.caract159"),game.i18n.localize("liber.caract160"),game.i18n.localize("liber.caract161"),game.i18n.localize("liber.caract162"),game.i18n.localize("liber.caract163"),game.i18n.localize("liber.caract164"),game.i18n.localize("liber.caract165")];
            var amour=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amour').val(amour)
            var ami=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amitie').val(ami);
            var haine=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.haine').val(haine);
            var profession=[game.i18n.localize("liber.caract166"),game.i18n.localize("liber.caract167"),game.i18n.localize("liber.caract168"),game.i18n.localize("liber.caract169"),game.i18n.localize("liber.caract170"),game.i18n.localize("liber.caract171"),game.i18n.localize("liber.caract172"),game.i18n.localize("liber.caract173"),game.i18n.localize("liber.caract174"),game.i18n.localize("liber.caract175"),game.i18n.localize("liber.caract176"),game.i18n.localize("liber.caract177"),game.i18n.localize("liber.caract178"),game.i18n.localize("liber.caract179"),game.i18n.localize("liber.caract180"),game.i18n.localize("liber.caract181"),game.i18n.localize("liber.caract182"),game.i18n.localize("liber.caract183"),game.i18n.localize("liber.caract184"),game.i18n.localize("liber.caract185"),game.i18n.localize("liber.caract186"),game.i18n.localize("liber.caract187"),game.i18n.localize("liber.caract188"),game.i18n.localize("liber.caract189"),game.i18n.localize("liber.caract190"),game.i18n.localize("liber.caract191"),game.i18n.localize("liber.caract192"),game.i18n.localize("liber.caract193"),game.i18n.localize("liber.caract194"),game.i18n.localize("liber.caract195"),game.i18n.localize("liber.caract196"),game.i18n.localize("liber.caract197"),game.i18n.localize("liber.caract198"),game.i18n.localize("liber.caract199"),game.i18n.localize("liber.caract200"),game.i18n.localize("liber.caract201"),game.i18n.localize("liber.caract202"),game.i18n.localize("liber.caract203")]
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.principale').val(metier);
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.secondaire').val(metier);
            var loisir=[game.i18n.localize("liber.caract204"),game.i18n.localize("liber.caract205"),game.i18n.localize("liber.caract206"),game.i18n.localize("liber.caract207"),game.i18n.localize("liber.caract208"),game.i18n.localize("liber.caract209"),game.i18n.localize("liber.caract210"),game.i18n.localize("liber.caract211"),game.i18n.localize("liber.caract212"),game.i18n.localize("liber.caract213"),game.i18n.localize("liber.caract214"),game.i18n.localize("liber.caract215"),game.i18n.localize("liber.caract216"),game.i18n.localize("liber.caract217"),game.i18n.localize("liber.caract218"),game.i18n.localize("liber.caract219"),game.i18n.localize("liber.caract220"),game.i18n.localize("liber.caract221"),game.i18n.localize("liber.caract222"),game.i18n.localize("liber.caract223"),game.i18n.localize("liber.caract224")]
            var metier=loisir[Math.floor(Math.random()*loisir.length)]
            html.find('.passion').val(metier);
            var caracterelist=[game.i18n.localize("liber.caract225"),game.i18n.localize("liber.caract226"),game.i18n.localize("liber.caract227"),game.i18n.localize("liber.caract228"),game.i18n.localize("liber.caract229"),game.i18n.localize("liber.caract230"),game.i18n.localize("liber.caract231"),game.i18n.localize("liber.caract232"),game.i18n.localize("liber.caract233"),game.i18n.localize("liber.caract234"),game.i18n.localize("liber.caract235"),game.i18n.localize("liber.caract236"),game.i18n.localize("liber.caract237")]
            var caractere=caracterelist[Math.floor(Math.random()*caracterelist.length)]
            html.find('.caractere').val(caractere);
            var personnalitelist=[game.i18n.localize("liber.caract238"),game.i18n.localize("liber.caract239"),game.i18n.localize("liber.caract240"),game.i18n.localize("liber.caract241"),game.i18n.localize("liber.caract242"),game.i18n.localize("liber.caract243"),game.i18n.localize("liber.caract244"),game.i18n.localize("liber.caract245"),game.i18n.localize("liber.caract246"),game.i18n.localize("liber.caract247"),game.i18n.localize("liber.caract248"),game.i18n.localize("liber.caract249"),game.i18n.localize("liber.caract250"),game.i18n.localize("liber.caract251"),game.i18n.localize("liber.caract252"),game.i18n.localize("liber.caract253"),game.i18n.localize("liber.caract254"),game.i18n.localize("liber.caract255")]
            var personnalite=personnalitelist[Math.floor(Math.random()*personnalitelist.length)]
            html.find('.personnalite').val(personnalite);
            var visionlist=[game.i18n.localize("liber.caract256"),game.i18n.localize("liber.caract257"),game.i18n.localize("liber.caract258"),game.i18n.localize("liber.caract259"),game.i18n.localize("liber.caract260"),game.i18n.localize("liber.caract261"),game.i18n.localize("liber.caract262"),game.i18n.localize("liber.caract263"),game.i18n.localize("liber.caract264"),game.i18n.localize("liber.caract265"),game.i18n.localize("liber.caract266"),game.i18n.localize("liber.caract267"),game.i18n.localize("liber.caract268"),game.i18n.localize("liber.caract269"),game.i18n.localize("liber.avantrace62")]
            var vision="Rempli de "+visionlist[Math.floor(Math.random()*visionlist.length)]
            html.find('.monde').val(vision);
            var objectiflist=[game.i18n.localize("liber.caract270"),game.i18n.localize("liber.caract271"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract273"),game.i18n.localize("liber.caract274"),game.i18n.localize("liber.caract275"),game.i18n.localize("liber.caract276"),game.i18n.localize("liber.caract277"),game.i18n.localize("liber.caract278")]
            var objectif=objectiflist[Math.floor(Math.random()*objectiflist.length)]
            html.find('.objectif').val(objectif);
            var racunelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
            var racune=racunelist[Math.floor(Math.random()*racunelist.length)]
            html.find('.rancunier').val(racune);
            var tarelist=[game.i18n.localize("liber.caract279"),game.i18n.localize("liber.caract280"),game.i18n.localize("liber.caract281"),game.i18n.localize("liber.caract282"),game.i18n.localize("liber.caract283"),game.i18n.localize("liber.caract284"),game.i18n.localize("liber.caract285"),game.i18n.localize("liber.caract286"),game.i18n.localize("liber.caract287"),game.i18n.localize("liber.caract288"),game.i18n.localize("liber.caract289"),game.i18n.localize("liber.caract290"),game.i18n.localize("liber.caract291"),game.i18n.localize("liber.caract292"),game.i18n.localize("liber.caract293"),game.i18n.localize("liber.caract294"),game.i18n.localize("liber.caract295"),game.i18n.localize("liber.caract296"),game.i18n.localize("liber.caract297"),game.i18n.localize("liber.caract298"),game.i18n.localize("liber.caract299"),game.i18n.localize("liber.caract300"),game.i18n.localize("liber.caract301"),game.i18n.localize("liber.caract302"),game.i18n.localize("liber.caract303"),game.i18n.localize("liber.caract304"),game.i18n.localize("liber.caract305"),game.i18n.localize("liber.caract306"),game.i18n.localize("liber.caract307"),game.i18n.localize("liber.caract308"),game.i18n.localize("liber.caract309"),game.i18n.localize("liber.caract310"),game.i18n.localize("liber.caract311"),game.i18n.localize("liber.caract312"),game.i18n.localize("liber.caract313"),game.i18n.localize("liber.caract314"),game.i18n.localize("liber.caract315"),game.i18n.localize("liber.caract316"),game.i18n.localize("liber.caract317"),game.i18n.localize("liber.caract318"),game.i18n.localize("liber.caract319"),game.i18n.localize("liber.caract320"),game.i18n.localize("liber.caract321"),game.i18n.localize("liber.caract322"),game.i18n.localize("liber.caract323"),game.i18n.localize("liber.caract324"),game.i18n.localize("liber.caract325"),game.i18n.localize("liber.caract326"),game.i18n.localize("liber.caract327"),game.i18n.localize("liber.caract328"),game.i18n.localize("liber.caract329"),game.i18n.localize("liber.caract330"),game.i18n.localize("liber.caract331"),game.i18n.localize("liber.caract332"),game.i18n.localize("liber.caract333"),game.i18n.localize("liber.caract334"),game.i18n.localize("liber.caract335"),game.i18n.localize("liber.caract336"),game.i18n.localize("liber.caract337"),game.i18n.localize("liber.caract338"),game.i18n.localize("liber.caract339"),game.i18n.localize("liber.caract340"),game.i18n.localize("liber.caract341"),game.i18n.localize("liber.caract342"),game.i18n.localize("liber.caract343"),game.i18n.localize("liber.caract344"),game.i18n.localize("liber.caract345"),game.i18n.localize("liber.caract346"),game.i18n.localize("liber.caract347"),game.i18n.localize("liber.caract348"),game.i18n.localize("liber.caract349"),game.i18n.localize("liber.caract350"),game.i18n.localize("liber.caract351"),game.i18n.localize("liber.caract352"),game.i18n.localize("liber.caract353"),game.i18n.localize("liber.caract354"),game.i18n.localize("liber.caract355"),game.i18n.localize("liber.caract356"),game.i18n.localize("liber.caract357"),game.i18n.localize("liber.caract358"),game.i18n.localize("liber.caract359"),game.i18n.localize("liber.caract360"),game.i18n.localize("liber.caract361"),game.i18n.localize("liber.caract362"),game.i18n.localize("liber.caract363"),game.i18n.localize("liber.caract364"),game.i18n.localize("liber.caract36"),game.i18n.localize("liber.caract366"),game.i18n.localize("liber.caract367"),game.i18n.localize("liber.caract368"),game.i18n.localize("liber.caract369"),game.i18n.localize("liber.caract370"),game.i18n.localize("liber.caract371"),game.i18n.localize("liber.caract372"),game.i18n.localize("liber.caract373"),game.i18n.localize("liber.caract374"),game.i18n.localize("liber.caract375"),game.i18n.localize("liber.caract376"),game.i18n.localize("liber.caract377"),game.i18n.localize("liber.caract378"),game.i18n.localize("liber.caract379"),game.i18n.localize("liber.caract380"),game.i18n.localize("liber.caract381"),game.i18n.localize("liber.caract382"),game.i18n.localize("liber.caract383"),game.i18n.localize("liber.caract384"),game.i18n.localize("liber.caract385"),game.i18n.localize("liber.caract386"),game.i18n.localize("liber.caract387"),game.i18n.localize("liber.caract388"),game.i18n.localize("liber.caract389"),game.i18n.localize("liber.caract390"),game.i18n.localize("liber.caract391"),game.i18n.localize("liber.caract392"),game.i18n.localize("liber.caract393"),game.i18n.localize("liber.caract394"),game.i18n.localize("liber.caract395"),game.i18n.localize("liber.caract396"),game.i18n.localize("liber.caract397"),game.i18n.localize("liber.caract398"),game.i18n.localize("liber.caract399"),game.i18n.localize("liber.caract400"),game.i18n.localize("liber.caract401"),game.i18n.localize("liber.caract402"),game.i18n.localize("liber.caract403"),game.i18n.localize("liber.caract404"),game.i18n.localize("liber.caract405"),game.i18n.localize("liber.caract406"),game.i18n.localize("liber.caract407"),game.i18n.localize("liber.caract408"),game.i18n.localize("liber.caract409"),game.i18n.localize("liber.caract410"),game.i18n.localize("liber.caract411"),game.i18n.localize("liber.caract412"),game.i18n.localize("liber.caract413"),game.i18n.localize("liber.caract414"),game.i18n.localize("liber.caract415"),game.i18n.localize("liber.caract416"),game.i18n.localize("liber.caract417"),game.i18n.localize("liber.caract418"),game.i18n.localize("liber.caract419"),game.i18n.localize("liber.caract420"),game.i18n.localize("liber.caract421"),game.i18n.localize("liber.caract422"),game.i18n.localize("liber.caract423"),game.i18n.localize("liber.caract424"),game.i18n.localize("liber.caract425"),game.i18n.localize("liber.caract426"),game.i18n.localize("liber.caract427"),game.i18n.localize("liber.caract428"),game.i18n.localize("liber.caract429"),game.i18n.localize("liber.caract430"),game.i18n.localize("liber.caract431")]
            var tare=tarelist[Math.floor(Math.random()*tarelist.length)]
            html.find('.tare').val(tare);
            var obsessionlist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
            var obsession=obsessionlist[Math.floor(Math.random()*obsessionlist.length)]
            html.find('.obsession').val(obsession);
            var distinguelist=[game.i18n.localize("liber.oui"),game.i18n.localize("liber.non"),game.i18n.localize("liber.bof")]
            var distingue=distinguelist[Math.floor(Math.random()*distinguelist.length)]
            html.find('.distingue').val(distingue);
        });

        
        
        html.find( ".compt input" ).each(function() {
              var valor= $( this ).val();
              if(valor==0){
                $( this ).css({"background":"transparent","color": "#fff"});
              }else if(valor>0){
                $( this ).css({"background":"#56853b","color": "white"});
              }else if(valor<0){
                $( this ).css({"background":"#a51b1b","color": "white"});
              }
            });
 



        


        

        //Poids encombrement
        var poids=[];
        var quantite=[];
        var total=0;
        html.find( ".item-poids" ).each(function( index ) {
            if($( this ).text()!="Pds"){
                poids.push($( this ).text());
            }
        });
        html.find( ".item-qty" ).each(function( index ) {
            if($( this ).text()!="Qte"){
                quantite.push($( this ).text());
            }
        });
        for (var i = 1;i < poids.length ; i++) {
           total=total+parseFloat(poids[i])*parseFloat(quantite[i]);
        }
        var enc=html.find('.enc').val();
        var enc=parseFloat(enc);
        var pourcentage= total*100/enc;
        
        if(pourcentage<50){
            html.find('.barenc').css({"background":'green'})
        }else if(pourcentage<75){
            html.find('.barenc').css({"background":'orange'})
        }else if(pourcentage<100){
            html.find('.barenc').css({"background":'red'})
        }else if(pourcentage<120){
            html.find('.barenc').css({"background":'#660000'})
        }else{
            html.find('.barenc').css({"background":'black'})
        }
        if(pourcentage>100){
            pourcentage=100;
        }
        html.find('.encours').val(total);
        html.find('.barenc').css({"width":pourcentage+"%"});

        //Equipé
        var listedemain =['Rapière','Bâton','Espadon','Hallebarde','Fléaux d\'arme','Epée à deux main','Masse d\'arme','Hache de bataille','Faux de Guerre','Lance Lourde']//lang
        $('.maindroite').on('click',function(){
            var objetaequipe=$(this).attr("name");
            var degat=$(this).attr("degat");
            var maing= html.find(".maingaucequi").val();
            for (var i = listedemain.length - 1; i >= 0; i--) {
                if(objetaequipe==listedemain[i] || maing == listedemain[i]){
                    html.find(".maingaucequi").val('-');
                    html.find(".degatg").val('-');
                }
            }
            html.find(".maindroiequi").val(objetaequipe);
            html.find(".degatd").val(degat);
            
            
        });
        $('.maingauche').on('click',function(){
            var objetaequipe=$(this).attr("name");
            var degat=$(this).attr("degat");
            var maind= html.find(".maindroiequi").val();
            for (var i = listedemain.length - 1; i >= 0; i--) {
                if(objetaequipe==listedemain[i] || maind == listedemain[i]){
                    html.find(".maindroiequi").val('-');
                    html.find(".degatd").val('-');
                }
            }
            html.find(".maingaucequi").val(objetaequipe);
            html.find(".degatg").val(degat);

        });
        $('.armor').on('click',function(){
            var objetaequipe=$(this).attr("name");
            html.find(".armurequi").val(objetaequipe);
        });

        //desquipe
        $('.mainddes').on('click',function(){
            html.find(".maindroiequi").val('');
            html.find(".degatd").val('');
        });
        $('.maingdes').on('click',function(){
            html.find(".maingaucequi").val('');
            html.find(".degatg").val('');
        });
        $('.armordes').on('click',function(){
            html.find(".armurequi").val('');
        });

        //Ajout Bonus
        $('.attribut').on('click',function(){
            var bonusactor=$(this).attr('name');
            html.find(".bonusactor").val(bonusactor);            
        });

        //Reset Bonus
        $('.resetbonus').on('click',function(){
            html.find(".bonusactor").val('0');            
        });
        $('.resetmalus').on('click',function(){
            html.find(".malussactor").val('0');            
        });

        //Jet de des
        html.find('.jetdedes').click(this._onRoll.bind(this)); 
        html.find('.jetdedegat').click(this._onRoll2.bind(this)); 

        

    }


    getItemFromEvent = (ev) => {
        const parent = $(ev.currentTarget).parents(".item");
        //return this.actor.getOwnedItem(parent.data("itemId"));
        return this.actor.items.get(parent.data("itemId"));
    }

    _onItemEdit(event){
        const item = this.getItemFromEvent(event);
        item.sheet.render(true);
    }

    //lancer de dés
    _onRoll(event){
        let monJetDeDes = event.target.dataset["dice"];
        let maxstat = event.target.dataset["attdice"];
        //let bonus = event.target.dataset["actionvalue"];
        //let malus = event.target.dataset["malus"];
        //let posture = event.target.dataset["posture"];
        let bonus =this.actor.system.bonus;
        let malus =this.actor.system.malus;
        const name = event.target.dataset["name"];
        /*var bonuspost=0;
        var critique=5;
        if(posture=="Focus"){
            bonuspost=5;
        }else if(posture=="Offensif"){
            critique=10;
        }*/
        var inforesult="";
        if(name=="Attaque" || name=="Relance"){
            monJetDeDes=maxstat+monJetDeDes;
        }else {
            monJetDeDes="1"+monJetDeDes;
            if(bonus==""){bonus=0;}
            if(malus==""){malus=0;}
            inforesult=parseInt(maxstat)+parseInt(bonus)+parseInt(malus);
            if(inforesult>95){
                inforesult=95;
            }else if(inforesult<5){
                inforesult=5;
            }
        }

        
        let r = new Roll(monJetDeDes);
        var roll=r.evaluate({"async": false});
        let retour=r.result; 
        var succes="";
        var texte="";
        if(name=="Attaque" || name=="Relance"){
            texte = "Jet de " + name + " : " + monJetDeDes;
        }else {
            if(retour>95){//lang
                succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
            }else if(retour<=5){
                succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
            }else if(retour<=inforesult){
                succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
            }else{
                succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
            }
            texte = "Jet de " + name + " : " + monJetDeDes +" - " + inforesult +succes;
        }

        
        //roll.roll().toMessage({
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
    _onRoll2(event){

        let monJetDeDes = event.target.dataset["dice"];
        const name = event.target.dataset["name"];
        let r = new Roll(monJetDeDes);
        var roll=r.evaluate({"async": false});
        const texte = "Utilise " + name + " : " + monJetDeDes;
        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
    _onMagiesort(event){
        let monJetDeDes = "1d100";
        let maxstat = event.target.dataset["attdice"];
        let bonus = event.target.dataset["actionvalue"];
        let malus = event.target.dataset["malus"];
        let posture = event.target.dataset["posture"];
        let cout =  event.target.dataset["cout"];
        const name = event.target.dataset["name"];
        var bonuspost=0;
        var critique=5;
        if(posture=="Focus"){
            bonuspost=5;
        }else if(posture="Offensif"){
            critique=10;
        }
        let inforesult=parseInt(maxstat)+parseInt(bonus)+bonuspost+parseInt(malus);
        if(inforesult>95){
        inforesult=95;
        }else if(inforesult<5){
        inforesult=5;
        }
        let r = new Roll("1d100");
        var roll=r.evaluate({"async": false});
        let retour=r.result; 
        var succes="";
        if(retour>95){
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("ombreoublie.lang82")+"</h4>";
        }else if(retour<critique){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("ombreoublie.lang83")+"</h4>";
        }else if(retour<=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("ombreoublie.lang84")+"</h4>";
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("ombreoublie.lang85")+"</h4>";
        }

        const texte = "Lance " + name + " : 1d100 - " + inforesult + succes;

        roll.toMessage({
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            flavor: texte
        });
    }
}