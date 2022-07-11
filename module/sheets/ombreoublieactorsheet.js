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
        console.log(`ombreoublie | Récupération du fichier html ${this.actor.data.type}-sheet.`);
        return `systems/ombreoublie/templates/sheets/${this.actor.data.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        var poidsactor='';
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);        
		if (this.actor.data.type == 'personnage' || this.actor.data.type == 'pnj' || this.actor.data.type == 'monstre') {
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
          let item = i.data;
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


        //Choix race 
        html.find('.racechoix').on('click',function(){
            for(i=0;i<58;i++){
                html.find('.cpt'+i).val(0);
            } 
            var avantagerace="";
            var raceliste=html.find('.raceliste').val();
            if(raceliste==game.i18n.localize("ombreoublie.avantrace60")){
                html.find('.cpt27').val(-10);
                var armureperso= html.find('.armureperso').val();
                if(armureperso<2){
                   html.find('.armureperso').val(2); 
                }
                var avantagerace=game.i18n.localize("ombreoublie.avantrace1");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace61")){
                var avantagerace=game.i18n.localize("ombreoublie.avantrace2");
                html.find('.cpt28').val(5);
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace62")){
                var avantagerace=game.i18n.localize("ombreoublie.avantrace3");
                html.find('.cpt39').val(10);
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace63")){
                var avantagerace=game.i18n.localize("ombreoublie.avantrace4");
                if(armureperso<2){
                   html.find('.armureperso').val(2); 
                }
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace64")){
                html.find('.cpt27').val(-20);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace5");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace64")){
                html.find('.cpt28').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace6");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace65")){
                html.find('.cpt1').val(5);
                html.find('.cpt3').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace7");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace66")){
                html.find('.cpt1').val(5);
                html.find('.cpt18').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace8");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace67")){
                html.find('.cpt10').val(10);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace9");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace68")){
                html.find('.cpt1').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace10");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace69")){
                html.find('.cpt37').val(5);
                html.find('.cpt40').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace11");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace70")){
                html.find('.cpt1').val(5);
                html.find('.cpt27').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace12");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace71")){
                html.find('.cpt46').val(5);
                html.find('.cpt28').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace13");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace72")){
                var avantagerace=game.i18n.localize("ombreoublie.avantrace14");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace73")){
                html.find('.cpt18').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace15");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace74")){
                var avantagerace=game.i18n.localize("ombreoublie.avantrace16");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace75")){
                var avantagerace=game.i18n.localize("ombreoublie.avantrace17");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace76")){
                html.find('.cpt15').val(5);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace18");
            }else if(raceliste==game.i18n.localize("ombreoublie.avantrace77")){
                html.find('.cpt38').val(-10);
                var avantagerace=game.i18n.localize("ombreoublie.avantrace19");
            }else {
                var avantagerace="";
            }
            html.find('.race').val(raceliste);
            html.find('.avantagerace').val(avantagerace);
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

        html.find('.clanchoix').on('click',function(){ 
            var avantagerace=html.find('.avantagerace').val();
            var clanliste=html.find('.clanliste').val();
            html.find('.clan').val(clanliste);
            if(clanliste==game.i18n.localize("ombreoublie.avantrace40")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace20");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace41")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace21");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace42")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace22");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace43")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace23");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace44")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace24");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace45")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace25");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace46")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace26");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace47")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace27");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace48")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace28");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace49")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace29");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace50")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace30");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace51")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace31");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace52")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace32");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace53")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace33");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace54")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace34");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace55")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace35");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace56")){
                avantagerace+=game.i18n.localize("ombreoublie.avantrace36");
            }else if(clanliste==game.i18n.localize("ombreoublie.avantrace57")){
                avantagerace+="";
            }
            html.find('.avantagerace').val(avantagerace);
        });
        
        //choix culte
        /*html.find('.religionchoix').on('click',function(){ 
            var clanliste=html.find('.religionlist').val();
            html.find('.religion').val(clanliste);
        });*/

        //generateur d'histoire
        html.find('.generator').on('click',function(){
            var age = Math.floor((Math.random() * 34) + 16);
            var items0=[game.i18n.localize("ombreoublie.lang1"),game.i18n.localize("ombreoublie.lang2"),game.i18n.localize("ombreoublie.lang3"),game.i18n.localize("ombreoublie.lang4"),game.i18n.localize("ombreoublie.lang5"),game.i18n.localize("ombreoublie.lang6"),game.i18n.localize("ombreoublie.lang7"),game.i18n.localize("ombreoublie.lang8"),game.i18n.localize("ombreoublie.lang9"),game.i18n.localize("ombreoublie.lang10"),game.i18n.localize("ombreoublie.lang11"),game.i18n.localize("ombreoublie.lang12"),game.i18n.localize("ombreoublie.lang13"),game.i18n.localize("ombreoublie.lang14"),game.i18n.localize("ombreoublie.lang15"),game.i18n.localize("ombreoublie.lang16"),game.i18n.localize("ombreoublie.lang17"),game.i18n.localize("ombreoublie.lang18"),game.i18n.localize("ombreoublie.lang19")];
            var items1=[game.i18n.localize("ombreoublie.lang20"),game.i18n.localize("ombreoublie.lang21"),game.i18n.localize("ombreoublie.lang22"),game.i18n.localize("ombreoublie.lang23"),game.i18n.localize("ombreoublie.lang24"),game.i18n.localize("ombreoublie.lang25"),game.i18n.localize("ombreoublie.lang26"),game.i18n.localize("ombreoublie.lang27"),game.i18n.localize("ombreoublie.lang28"),game.i18n.localize("ombreoublie.lang29"),game.i18n.localize("ombreoublie.lang30"),game.i18n.localize("ombreoublie.lang31"),game.i18n.localize("ombreoublie.lang32"),game.i18n.localize("ombreoublie.lang33")];
            var items2=[game.i18n.localize("ombreoublie.lang34"),game.i18n.localize("ombreoublie.lang35"),game.i18n.localize("ombreoublie.lang36"),game.i18n.localize("ombreoublie.lang37"),game.i18n.localize("ombreoublie.lang38"),game.i18n.localize("ombreoublie.lang39"),game.i18n.localize("ombreoublie.lang40"),game.i18n.localize("ombreoublie.lang41"),game.i18n.localize("ombreoublie.lang42"),game.i18n.localize("ombreoublie.lang43"),game.i18n.localize("ombreoublie.lang44"),game.i18n.localize("ombreoublie.lang45"),game.i18n.localize("ombreoublie.lang46"),game.i18n.localize("ombreoublie.lang47")];
            var items3=[game.i18n.localize("ombreoublie.lang48"),game.i18n.localize("ombreoublie.lang49"),game.i18n.localize("ombreoublie.lang50"),game.i18n.localize("ombreoublie.lang51"),game.i18n.localize("ombreoublie.lang52"),game.i18n.localize("ombreoublie.lang53"),game.i18n.localize("ombreoublie.lang54"),game.i18n.localize("ombreoublie.lang55"),game.i18n.localize("ombreoublie.lang56"),game.i18n.localize("ombreoublie.lang57"),game.i18n.localize("ombreoublie.lang58"),game.i18n.localize("ombreoublie.lang59"),game.i18n.localize("ombreoublie.lang60"),game.i18n.localize("ombreoublie.lang61"),game.i18n.localize("ombreoublie.lang62")];
            var items4=[game.i18n.localize("ombreoublie.lang63"),game.i18n.localize("ombreoublie.lang64"),game.i18n.localize("ombreoublie.lang65"),game.i18n.localize("ombreoublie.lang66"),game.i18n.localize("ombreoublie.lang67"),game.i18n.localize("ombreoublie.lang68"),game.i18n.localize("ombreoublie.lang69"),game.i18n.localize("ombreoublie.lang70"),game.i18n.localize("ombreoublie.lang71"),game.i18n.localize("ombreoublie.lang72"),game.i18n.localize("ombreoublie.lang73"),game.i18n.localize("ombreoublie.lang74"),game.i18n.localize("ombreoublie.lang75"),game.i18n.localize("ombreoublie.lang76")]
            var nomville=items0[Math.floor(Math.random()*items0.length)];
            var evenement = items1[Math.floor(Math.random()*items1.length)];
            var tonchoix=items2[Math.floor(Math.random()*items2.length)];
            var motivation  = items3[Math.floor(Math.random()*items3.length)];
            var signeastro = items4[Math.floor(Math.random()*items4.length)];
            var textgen =game.i18n.localize("ombreoublie.lang77")+' '+age+' '+game.i18n.localize("ombreoublie.lang78")+' '+nomville+'. '+game.i18n.localize("ombreoublie.lang79")+' '+evenement+", "+motivation+' '+game.i18n.localize("ombreoublie.lang80")+' '+tonchoix+'. '+game.i18n.localize("ombreoublie.lang82")+' '+signeastro;
            html.find('.histoire').val(textgen);
        });

        //Ajout talent et faiblesse
        /*html.find('.choixtalent').on('click',function(){
            var talentliste=html.find('.talentliste').val();
            html.find('.talent').val(talentliste);
        });
        html.find('.choixfaiblesse').on('click',function(){
            var faiblesseliste=html.find('.faiblesseliste').val();
            html.find('.faiblesse').val(faiblesseliste);
        });*/

        //caractere aléatoire
        html.find('.caractergen').on('click',function(){ //lang
            var demeure = [game.i18n.localize("ombreoublie.caract1"),game.i18n.localize("ombreoublie.caract2"),game.i18n.localize("ombreoublie.caract3"),game.i18n.localize("ombreoublie.caract4"),game.i18n.localize("ombreoublie.caract5"),game.i18n.localize("ombreoublie.caract6"),game.i18n.localize("ombreoublie.caract7"),game.i18n.localize("ombreoublie.caract8"),game.i18n.localize("ombreoublie.caract9"),game.i18n.localize("ombreoublie.caract10"),game.i18n.localize("ombreoublie.caract11"),game.i18n.localize("ombreoublie.caract12")];
            var proximite=[game.i18n.localize("ombreoublie.caract13"),game.i18n.localize("ombreoublie.caract14"),game.i18n.localize("ombreoublie.caract15")];
            var lieu=[game.i18n.localize("ombreoublie.caract16"),game.i18n.localize("ombreoublie.caract17"),game.i18n.localize("ombreoublie.caract18"),game.i18n.localize("ombreoublie.caract19"),game.i18n.localize("ombreoublie.caract20"),game.i18n.localize("ombreoublie.caract21"),game.i18n.localize("ombreoublie.caract22"),game.i18n.localize("ombreoublie.caract23"),game.i18n.localize("ombreoublie.caract24"),game.i18n.localize("ombreoublie.caract25"),game.i18n.localize("ombreoublie.caract26"),game.i18n.localize("ombreoublie.caract27"),game.i18n.localize("ombreoublie.caract28"),game.i18n.localize("ombreoublie.caract29"),game.i18n.localize("ombreoublie.caract30"),game.i18n.localize("ombreoublie.caract31"),game.i18n.localize("ombreoublie.caract32"),game.i18n.localize("ombreoublie.caract33"),game.i18n.localize("ombreoublie.caract34")];
            var resident = demeure[Math.floor(Math.random()*demeure.length)]+" "+proximite[Math.floor(Math.random()*proximite.length)]+" "+lieu[Math.floor(Math.random()*lieu.length)];
            html.find('.residence').val(resident);
            var famille = ["Crochet","Valone","Parker","Onile","Pasteur","Labrocante","Vincente","Auditoré","Laporte","Blanchart","Giroux","Lesourd","Houillons","Castagné","Delasaintecroix","Macon","Chaumont","Lucent","Hover","Packard","Curie","Lyon","Lallemand","Langlais","Lecure","Macdonald","Dupont","Lafontaine","Boucher","Boureau","Godspeak","Pierre","Solitaire","Beauregard","Charmant","Marechal","Dufour","Leroux","Lemoine","Lombart","Lefourbe","Boulanger","Petit","Blanc","Chevalier","Leroy","Lebrun","Silver","Delarue","Notigame","Forest","Tonneau","Does","Martin","Deschamps","Dupuis","Macalisteur","Leloup","Bouquin","Lafleur","","Dugrenier","Lacroix","Lecomte","Poulain","Dumas"];
            var titre=[game.i18n.localize("ombreoublie.caract35"),game.i18n.localize("ombreoublie.caract36"),game.i18n.localize("ombreoublie.caract37"),game.i18n.localize("ombreoublie.caract38"),game.i18n.localize("ombreoublie.caract39"),game.i18n.localize("ombreoublie.caract40"),game.i18n.localize("ombreoublie.caract41"),game.i18n.localize("ombreoublie.caract42"),game.i18n.localize("ombreoublie.caract43"),game.i18n.localize("ombreoublie.caract44"),game.i18n.localize("ombreoublie.caract45"),game.i18n.localize("ombreoublie.caract46"),game.i18n.localize("ombreoublie.caract47"),game.i18n.localize("ombreoublie.caract48"),game.i18n.localize("ombreoublie.caract49"),game.i18n.localize("ombreoublie.caract50")];
            var sang = titre[Math.floor(Math.random()*titre.length)]+" de la famille "+famille[Math.floor(Math.random()*famille.length)];
            html.find('.sang').val(sang);       
            var rang=[game.i18n.localize("ombreoublie.caract51"),game.i18n.localize("ombreoublie.caract52"),game.i18n.localize("ombreoublie.caract53"),game.i18n.localize("ombreoublie.caract54"),game.i18n.localize("ombreoublie.caract55"),game.i18n.localize("ombreoublie.caract56"),game.i18n.localize("ombreoublie.caract57"),game.i18n.localize("ombreoublie.caract58"),game.i18n.localize("ombreoublie.caract59")]
            var organisation=[game.i18n.localize("ombreoublie.caract60"),game.i18n.localize("ombreoublie.caract61"),game.i18n.localize("ombreoublie.caract62"),game.i18n.localize("ombreoublie.caract63"),game.i18n.localize("ombreoublie.caract64"),game.i18n.localize("ombreoublie.caract65"),game.i18n.localize("ombreoublie.caract66"),game.i18n.localize("ombreoublie.caract67"),game.i18n.localize("ombreoublie.caract68"),game.i18n.localize("ombreoublie.caract69"),game.i18n.localize("ombreoublie.caract70"),game.i18n.localize("ombreoublie.caract71"),game.i18n.localize("ombreoublie.caract72"),game.i18n.localize("ombreoublie.caract73"),game.i18n.localize("ombreoublie.caract74"),game.i18n.localize("ombreoublie.caract75"),game.i18n.localize("ombreoublie.caract76"),game.i18n.localize("ombreoublie.caract77"),game.i18n.localize("ombreoublie.caract78"),game.i18n.localize("ombreoublie.caract79")]
            var politique=rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.secte').val(politique);
            var intret=[game.i18n.localize("ombreoublie.caract80"),game.i18n.localize("ombreoublie.caract81"),game.i18n.localize("ombreoublie.caract82"),game.i18n.localize("ombreoublie.caract83"),game.i18n.localize("ombreoublie.caract84"),game.i18n.localize("ombreoublie.caract85"),game.i18n.localize("ombreoublie.caract86"),game.i18n.localize("ombreoublie.caract87"),game.i18n.localize("ombreoublie.caract88"),game.i18n.localize("ombreoublie.caract89"),game.i18n.localize("ombreoublie.caract90"),game.i18n.localize("ombreoublie.caract91"),game.i18n.localize("ombreoublie.caract92"),game.i18n.localize("ombreoublie.caract93"),game.i18n.localize("ombreoublie.caract94"),game.i18n.localize("ombreoublie.caract95"),game.i18n.localize("ombreoublie.caract96"),game.i18n.localize("ombreoublie.caract97"),game.i18n.localize("ombreoublie.caract98"),game.i18n.localize("ombreoublie.caract99"),game.i18n.localize("ombreoublie.caract100"),game.i18n.localize("ombreoublie.caract101"),game.i18n.localize("ombreoublie.caract102")]
            var groupe=intret[Math.floor(Math.random()*intret.length)]
            html.find('.interet').val(groupe);
            var pertes=[game.i18n.localize("ombreoublie.caract103"),game.i18n.localize("ombreoublie.caract104"),game.i18n.localize("ombreoublie.caract105"),game.i18n.localize("ombreoublie.caract106"),game.i18n.localize("ombreoublie.caract107"),game.i18n.localize("ombreoublie.caract108"),game.i18n.localize("ombreoublie.caract109"),game.i18n.localize("ombreoublie.caract110"),game.i18n.localize("ombreoublie.caract111"),game.i18n.localize("ombreoublie.caract112"),game.i18n.localize("ombreoublie.caract113"),game.i18n.localize("ombreoublie.caract114"),game.i18n.localize("ombreoublie.caract115"),game.i18n.localize("ombreoublie.caract116"),game.i18n.localize("ombreoublie.caract117"),game.i18n.localize("ombreoublie.caract118")]
            var dc=pertes[Math.floor(Math.random()*pertes.length)]
            html.find('.proche').val(dc);
            var valeur=[game.i18n.localize("ombreoublie.caract119"),game.i18n.localize("ombreoublie.caract120"),game.i18n.localize("ombreoublie.caract121"),game.i18n.localize("ombreoublie.caract122"),game.i18n.localize("ombreoublie.caract123"),game.i18n.localize("ombreoublie.caract124"),game.i18n.localize("ombreoublie.caract125"),game.i18n.localize("ombreoublie.caract126"),game.i18n.localize("ombreoublie.caract127"),game.i18n.localize("ombreoublie.caract128"),game.i18n.localize("ombreoublie.caract129"),game.i18n.localize("ombreoublie.caract130"),game.i18n.localize("ombreoublie.caract131")]
            var moral=valeur[Math.floor(Math.random()*valeur.length)]
            html.find('.moral').val(moral);
            var race=[game.i18n.localize("ombreoublie.caract132"),game.i18n.localize("ombreoublie.caract133"),game.i18n.localize("ombreoublie.caract134"),game.i18n.localize("ombreoublie.caract135"),game.i18n.localize("ombreoublie.caract136"),game.i18n.localize("ombreoublie.caract137")]
            var rang=[game.i18n.localize("ombreoublie.caract138"),game.i18n.localize("ombreoublie.caract139"),game.i18n.localize("ombreoublie.caract140"),game.i18n.localize("ombreoublie.caract141"),game.i18n.localize("ombreoublie.caract142"),game.i18n.localize("ombreoublie.caract143"),game.i18n.localize("ombreoublie.caract144"),game.i18n.localize("ombreoublie.caract145")]
            var organisation=[game.i18n.localize("ombreoublie.caract146"),game.i18n.localize("ombreoublie.caract147"),game.i18n.localize("ombreoublie.caract148"),game.i18n.localize("ombreoublie.caract149"),game.i18n.localize("ombreoublie.caract150"),game.i18n.localize("ombreoublie.caract151"),game.i18n.localize("ombreoublie.caract152"),game.i18n.localize("ombreoublie.caract153"),game.i18n.localize("ombreoublie.caract154"),game.i18n.localize("ombreoublie.caract155"),game.i18n.localize("ombreoublie.caract156"),game.i18n.localize("ombreoublie.caract157"),game.i18n.localize("ombreoublie.caract158"),game.i18n.localize("ombreoublie.caract159"),game.i18n.localize("ombreoublie.caract160"),game.i18n.localize("ombreoublie.caract161"),game.i18n.localize("ombreoublie.caract162"),game.i18n.localize("ombreoublie.caract163"),game.i18n.localize("ombreoublie.caract164"),game.i18n.localize("ombreoublie.caract165")];
            var amour=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amour').val(amour)
            var ami=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.amitie').val(ami);
            var haine=race[Math.floor(Math.random()*race.length)]+" "+rang[Math.floor(Math.random()*rang.length)]+" "+organisation[Math.floor(Math.random()*organisation.length)];
            html.find('.haine').val(haine);
            var profession=[game.i18n.localize("ombreoublie.caract166"),game.i18n.localize("ombreoublie.caract167"),game.i18n.localize("ombreoublie.caract168"),game.i18n.localize("ombreoublie.caract169"),game.i18n.localize("ombreoublie.caract170"),game.i18n.localize("ombreoublie.caract171"),game.i18n.localize("ombreoublie.caract172"),game.i18n.localize("ombreoublie.caract173"),game.i18n.localize("ombreoublie.caract174"),game.i18n.localize("ombreoublie.caract175"),game.i18n.localize("ombreoublie.caract176"),game.i18n.localize("ombreoublie.caract177"),game.i18n.localize("ombreoublie.caract178"),game.i18n.localize("ombreoublie.caract179"),game.i18n.localize("ombreoublie.caract180"),game.i18n.localize("ombreoublie.caract181"),game.i18n.localize("ombreoublie.caract182"),game.i18n.localize("ombreoublie.caract183"),game.i18n.localize("ombreoublie.caract184"),game.i18n.localize("ombreoublie.caract185"),game.i18n.localize("ombreoublie.caract186"),game.i18n.localize("ombreoublie.caract187"),game.i18n.localize("ombreoublie.caract188"),game.i18n.localize("ombreoublie.caract189"),game.i18n.localize("ombreoublie.caract190"),game.i18n.localize("ombreoublie.caract191"),game.i18n.localize("ombreoublie.caract192"),game.i18n.localize("ombreoublie.caract193"),game.i18n.localize("ombreoublie.caract194"),game.i18n.localize("ombreoublie.caract195"),game.i18n.localize("ombreoublie.caract196"),game.i18n.localize("ombreoublie.caract197"),game.i18n.localize("ombreoublie.caract198"),game.i18n.localize("ombreoublie.caract199"),game.i18n.localize("ombreoublie.caract200"),game.i18n.localize("ombreoublie.caract201"),game.i18n.localize("ombreoublie.caract202"),game.i18n.localize("ombreoublie.caract203")]
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.principale').val(metier);
            var metier=profession[Math.floor(Math.random()*profession.length)]
            html.find('.secondaire').val(metier);
            var loisir=[game.i18n.localize("ombreoublie.caract204"),game.i18n.localize("ombreoublie.caract205"),game.i18n.localize("ombreoublie.caract206"),game.i18n.localize("ombreoublie.caract207"),game.i18n.localize("ombreoublie.caract208"),game.i18n.localize("ombreoublie.caract209"),game.i18n.localize("ombreoublie.caract210"),game.i18n.localize("ombreoublie.caract211"),game.i18n.localize("ombreoublie.caract212"),game.i18n.localize("ombreoublie.caract213"),game.i18n.localize("ombreoublie.caract214"),game.i18n.localize("ombreoublie.caract215"),game.i18n.localize("ombreoublie.caract216"),game.i18n.localize("ombreoublie.caract217"),game.i18n.localize("ombreoublie.caract218"),game.i18n.localize("ombreoublie.caract219"),game.i18n.localize("ombreoublie.caract220"),game.i18n.localize("ombreoublie.caract221"),game.i18n.localize("ombreoublie.caract222"),game.i18n.localize("ombreoublie.caract223"),game.i18n.localize("ombreoublie.caract224")]
            var metier=loisir[Math.floor(Math.random()*loisir.length)]
            html.find('.passion').val(metier);
            var caracterelist=[game.i18n.localize("ombreoublie.caract225"),game.i18n.localize("ombreoublie.caract226"),game.i18n.localize("ombreoublie.caract227"),game.i18n.localize("ombreoublie.caract228"),game.i18n.localize("ombreoublie.caract229"),game.i18n.localize("ombreoublie.caract230"),game.i18n.localize("ombreoublie.caract231"),game.i18n.localize("ombreoublie.caract232"),game.i18n.localize("ombreoublie.caract233"),game.i18n.localize("ombreoublie.caract234"),game.i18n.localize("ombreoublie.caract235"),game.i18n.localize("ombreoublie.caract236"),game.i18n.localize("ombreoublie.caract237")]
            var caractere=caracterelist[Math.floor(Math.random()*caracterelist.length)]
            html.find('.caractere').val(caractere);
            var personnalitelist=[game.i18n.localize("ombreoublie.caract238"),game.i18n.localize("ombreoublie.caract239"),game.i18n.localize("ombreoublie.caract240"),game.i18n.localize("ombreoublie.caract241"),game.i18n.localize("ombreoublie.caract242"),game.i18n.localize("ombreoublie.caract243"),game.i18n.localize("ombreoublie.caract244"),game.i18n.localize("ombreoublie.caract245"),game.i18n.localize("ombreoublie.caract246"),game.i18n.localize("ombreoublie.caract247"),game.i18n.localize("ombreoublie.caract248"),game.i18n.localize("ombreoublie.caract249"),game.i18n.localize("ombreoublie.caract250"),game.i18n.localize("ombreoublie.caract251"),game.i18n.localize("ombreoublie.caract252"),game.i18n.localize("ombreoublie.caract253"),game.i18n.localize("ombreoublie.caract254"),game.i18n.localize("ombreoublie.caract255")]
            var personnalite=personnalitelist[Math.floor(Math.random()*personnalitelist.length)]
            html.find('.personnalite').val(personnalite);
            var visionlist=[game.i18n.localize("ombreoublie.caract256"),game.i18n.localize("ombreoublie.caract257"),game.i18n.localize("ombreoublie.caract258"),game.i18n.localize("ombreoublie.caract259"),game.i18n.localize("ombreoublie.caract260"),game.i18n.localize("ombreoublie.caract261"),game.i18n.localize("ombreoublie.caract262"),game.i18n.localize("ombreoublie.caract263"),game.i18n.localize("ombreoublie.caract264"),game.i18n.localize("ombreoublie.caract265"),game.i18n.localize("ombreoublie.caract266"),game.i18n.localize("ombreoublie.caract267"),game.i18n.localize("ombreoublie.caract268"),game.i18n.localize("ombreoublie.caract269"),game.i18n.localize("ombreoublie.avantrace62")]
            var vision="Rempli de "+visionlist[Math.floor(Math.random()*visionlist.length)]
            html.find('.monde').val(vision);
            var objectiflist=[game.i18n.localize("ombreoublie.caract270"),game.i18n.localize("ombreoublie.caract271"),game.i18n.localize("ombreoublie.caract275"),game.i18n.localize("ombreoublie.caract273"),game.i18n.localize("ombreoublie.caract274"),game.i18n.localize("ombreoublie.caract275"),game.i18n.localize("ombreoublie.caract276"),game.i18n.localize("ombreoublie.caract277"),game.i18n.localize("ombreoublie.caract278")]
            var objectif=objectiflist[Math.floor(Math.random()*objectiflist.length)]
            html.find('.objectif').val(objectif);
            var racunelist=[game.i18n.localize("ombreoublie.oui"),game.i18n.localize("ombreoublie.non"),game.i18n.localize("ombreoublie.bof")]
            var racune=racunelist[Math.floor(Math.random()*racunelist.length)]
            html.find('.rancunier').val(racune);
            var tarelist=[game.i18n.localize("ombreoublie.caract279"),game.i18n.localize("ombreoublie.caract280"),game.i18n.localize("ombreoublie.caract281"),game.i18n.localize("ombreoublie.caract282"),game.i18n.localize("ombreoublie.caract283"),game.i18n.localize("ombreoublie.caract284"),game.i18n.localize("ombreoublie.caract285"),game.i18n.localize("ombreoublie.caract286"),game.i18n.localize("ombreoublie.caract287"),game.i18n.localize("ombreoublie.caract288"),game.i18n.localize("ombreoublie.caract289"),game.i18n.localize("ombreoublie.caract290"),game.i18n.localize("ombreoublie.caract291"),game.i18n.localize("ombreoublie.caract292"),game.i18n.localize("ombreoublie.caract293"),game.i18n.localize("ombreoublie.caract294"),game.i18n.localize("ombreoublie.caract295"),game.i18n.localize("ombreoublie.caract296"),game.i18n.localize("ombreoublie.caract297"),game.i18n.localize("ombreoublie.caract298"),game.i18n.localize("ombreoublie.caract299"),game.i18n.localize("ombreoublie.caract300"),game.i18n.localize("ombreoublie.caract301"),game.i18n.localize("ombreoublie.caract302"),game.i18n.localize("ombreoublie.caract303"),game.i18n.localize("ombreoublie.caract304"),game.i18n.localize("ombreoublie.caract305"),game.i18n.localize("ombreoublie.caract306"),game.i18n.localize("ombreoublie.caract307"),game.i18n.localize("ombreoublie.caract308"),game.i18n.localize("ombreoublie.caract309"),game.i18n.localize("ombreoublie.caract310"),game.i18n.localize("ombreoublie.caract311"),game.i18n.localize("ombreoublie.caract312"),game.i18n.localize("ombreoublie.caract313"),game.i18n.localize("ombreoublie.caract314"),game.i18n.localize("ombreoublie.caract315"),game.i18n.localize("ombreoublie.caract316"),game.i18n.localize("ombreoublie.caract317"),game.i18n.localize("ombreoublie.caract318"),game.i18n.localize("ombreoublie.caract319"),game.i18n.localize("ombreoublie.caract320"),game.i18n.localize("ombreoublie.caract321"),game.i18n.localize("ombreoublie.caract322"),game.i18n.localize("ombreoublie.caract323"),game.i18n.localize("ombreoublie.caract324"),game.i18n.localize("ombreoublie.caract325"),game.i18n.localize("ombreoublie.caract326"),game.i18n.localize("ombreoublie.caract327"),game.i18n.localize("ombreoublie.caract328"),game.i18n.localize("ombreoublie.caract329"),game.i18n.localize("ombreoublie.caract330"),game.i18n.localize("ombreoublie.caract331"),game.i18n.localize("ombreoublie.caract332"),game.i18n.localize("ombreoublie.caract333"),game.i18n.localize("ombreoublie.caract334"),game.i18n.localize("ombreoublie.caract335"),game.i18n.localize("ombreoublie.caract336"),game.i18n.localize("ombreoublie.caract337"),game.i18n.localize("ombreoublie.caract338"),game.i18n.localize("ombreoublie.caract339"),game.i18n.localize("ombreoublie.caract340"),game.i18n.localize("ombreoublie.caract341"),game.i18n.localize("ombreoublie.caract342"),game.i18n.localize("ombreoublie.caract343"),game.i18n.localize("ombreoublie.caract344"),game.i18n.localize("ombreoublie.caract345"),game.i18n.localize("ombreoublie.caract346"),game.i18n.localize("ombreoublie.caract347"),game.i18n.localize("ombreoublie.caract348"),game.i18n.localize("ombreoublie.caract349"),game.i18n.localize("ombreoublie.caract350"),game.i18n.localize("ombreoublie.caract351"),game.i18n.localize("ombreoublie.caract352"),game.i18n.localize("ombreoublie.caract353"),game.i18n.localize("ombreoublie.caract354"),game.i18n.localize("ombreoublie.caract355"),game.i18n.localize("ombreoublie.caract356"),game.i18n.localize("ombreoublie.caract357"),game.i18n.localize("ombreoublie.caract358"),game.i18n.localize("ombreoublie.caract359"),game.i18n.localize("ombreoublie.caract360"),game.i18n.localize("ombreoublie.caract361"),game.i18n.localize("ombreoublie.caract362"),game.i18n.localize("ombreoublie.caract363"),game.i18n.localize("ombreoublie.caract364"),game.i18n.localize("ombreoublie.caract36"),game.i18n.localize("ombreoublie.caract366"),game.i18n.localize("ombreoublie.caract367"),game.i18n.localize("ombreoublie.caract368"),game.i18n.localize("ombreoublie.caract369"),game.i18n.localize("ombreoublie.caract370"),game.i18n.localize("ombreoublie.caract371"),game.i18n.localize("ombreoublie.caract372"),game.i18n.localize("ombreoublie.caract373"),game.i18n.localize("ombreoublie.caract374"),game.i18n.localize("ombreoublie.caract375"),game.i18n.localize("ombreoublie.caract376"),game.i18n.localize("ombreoublie.caract377"),game.i18n.localize("ombreoublie.caract378"),game.i18n.localize("ombreoublie.caract379"),game.i18n.localize("ombreoublie.caract380"),game.i18n.localize("ombreoublie.caract381"),game.i18n.localize("ombreoublie.caract382"),game.i18n.localize("ombreoublie.caract383"),game.i18n.localize("ombreoublie.caract384"),game.i18n.localize("ombreoublie.caract385"),game.i18n.localize("ombreoublie.caract386"),game.i18n.localize("ombreoublie.caract387"),game.i18n.localize("ombreoublie.caract388"),game.i18n.localize("ombreoublie.caract389"),game.i18n.localize("ombreoublie.caract390"),game.i18n.localize("ombreoublie.caract391"),game.i18n.localize("ombreoublie.caract392"),game.i18n.localize("ombreoublie.caract393"),game.i18n.localize("ombreoublie.caract394"),game.i18n.localize("ombreoublie.caract395"),game.i18n.localize("ombreoublie.caract396"),game.i18n.localize("ombreoublie.caract397"),game.i18n.localize("ombreoublie.caract398"),game.i18n.localize("ombreoublie.caract399"),game.i18n.localize("ombreoublie.caract400"),game.i18n.localize("ombreoublie.caract401"),game.i18n.localize("ombreoublie.caract402"),game.i18n.localize("ombreoublie.caract403"),game.i18n.localize("ombreoublie.caract404"),game.i18n.localize("ombreoublie.caract405"),game.i18n.localize("ombreoublie.caract406"),game.i18n.localize("ombreoublie.caract407"),game.i18n.localize("ombreoublie.caract408"),game.i18n.localize("ombreoublie.caract409"),game.i18n.localize("ombreoublie.caract410"),game.i18n.localize("ombreoublie.caract411"),game.i18n.localize("ombreoublie.caract412"),game.i18n.localize("ombreoublie.caract413"),game.i18n.localize("ombreoublie.caract414"),game.i18n.localize("ombreoublie.caract415"),game.i18n.localize("ombreoublie.caract416"),game.i18n.localize("ombreoublie.caract417"),game.i18n.localize("ombreoublie.caract418"),game.i18n.localize("ombreoublie.caract419"),game.i18n.localize("ombreoublie.caract420"),game.i18n.localize("ombreoublie.caract421"),game.i18n.localize("ombreoublie.caract422"),game.i18n.localize("ombreoublie.caract423"),game.i18n.localize("ombreoublie.caract424"),game.i18n.localize("ombreoublie.caract425"),game.i18n.localize("ombreoublie.caract426"),game.i18n.localize("ombreoublie.caract427"),game.i18n.localize("ombreoublie.caract428"),game.i18n.localize("ombreoublie.caract429"),game.i18n.localize("ombreoublie.caract430"),game.i18n.localize("ombreoublie.caract431")]
            var tare=tarelist[Math.floor(Math.random()*tarelist.length)]
            html.find('.tare').val(tare);
            var obsessionlist=[game.i18n.localize("ombreoublie.oui"),game.i18n.localize("ombreoublie.non"),game.i18n.localize("ombreoublie.bof")]
            var obsession=obsessionlist[Math.floor(Math.random()*obsessionlist.length)]
            html.find('.obsession').val(obsession);
            var distinguelist=[game.i18n.localize("ombreoublie.oui"),game.i18n.localize("ombreoublie.non"),game.i18n.localize("ombreoublie.bof")]
            var distingue=distinguelist[Math.floor(Math.random()*distinguelist.length)]
            html.find('.distingue').val(distingue);
        });

        //point restant
        var espece=html.find('.race').val();
        var phys=parseInt(html.find('.phys').val());
        var forc=parseInt(html.find('.forc').val());
        var agil=parseInt(html.find('.agil').val());
        var soci=parseInt(html.find('.soci').val());
        var char=parseInt(html.find('.char').val());
        var saga=parseInt(html.find('.saga').val());
        var ment=parseInt(html.find('.mental').val());
        var astu=parseInt(html.find('.astu').val());
        var memo=parseInt(html.find('.memo').val());
        var reste=170-(phys+soci+ment);
        if(espece==game.i18n.localize("ombreoublie.avantrace61")){
            if(soci<5){
                html.find('.soci').val(5);
                soci=5;
            }
            reste=reste+5;
        }
        html.find('.pointrestant').val(reste);
        if(phys<(forc+agil)){
            alert(game.i18n.localize("ombreoublie.alert1"))
        }
        if(soci<(char+saga)){
            alert(game.i18n.localize("ombreoublie.alert2"))
        }
        if(ment<(astu+memo)){
            alert(game.i18n.localize("ombreoublie.alert3"))
        }

        //calcul point capacité
        var level = parseInt(html.find('.niveau').val());
        var resultat=35+(level*15);
        if(espece==game.i18n.localize("ombreoublie.avantrace60")){
            resultat=resultat-20;
        }else if(espece==game.i18n.localize("ombreoublie.avantrace61") || espece=='Semi-humain'){
            resultat=resultat+15;
            var cap28=parseInt(html.find('.cpt28').val());
            if(cap28<5){
                html.find('.cpt28').val(5);
            }
        }else if(espece==game.i18n.localize("ombreoublie.avantrace64")){
            resultat=resultat-40;
        }else if(espece==game.i18n.localize("ombreoublie.avantrace62")){
            resultat=resultat+10;
        }else if(espece==game.i18n.localize("ombreoublie.avantrace68")){
            resultat=resultat+30;
            var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
            var cap29=parseInt(html.find('.cpt3').val());
            if(cap29<5){html.find('.cpt3').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace66")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
            var cap29=parseInt(html.find('.cpt18').val());
            if(cap29<5){html.find('.cpt18').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace67")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt10').val());
            if(cap28<10){html.find('.cpt10').val(10);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace68")){
            resultat=resultat+15;
             var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace69")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt37').val());
            if(cap28<5){html.find('.cpt37').val(5);}
            var cap29=parseInt(html.find('.cpt40').val());
            if(cap29<5){html.find('.cpt40').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace70")){
            resultat=resultat+25;
            var cap28=parseInt(html.find('.cpt1').val());
            if(cap28<5){html.find('.cpt1').val(5);}
            var cap29=parseInt(html.find('.cpt27').val());
            if(cap29<5){html.find('.cpt27').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace71")){
            resultat=resultat+20;
            var cap28=parseInt(html.find('.cpt46').val());
            if(cap28<5){html.find('.cpt46').val(5);}
            var cap29=parseInt(html.find('.cpt28').val());
            if(cap29<5){html.find('.cpt28').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace73")){
            resultat=resultat+5;
            var cap29=parseInt(html.find('.cpt18').val());
            if(cap29<5){html.find('.cpt18').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace76")){
            resultat=resultat+5;
            var cap29=parseInt(html.find('.cpt15').val());
            if(cap29<5){html.find('.cpt15').val(5);}
        }else if(espece==game.i18n.localize("ombreoublie.avantrace77")){
            resultat=resultat-30;
        }
        for(i=0;i<58;i++){
            var ajout=parseInt(html.find('.cpt'+i).val());
            if(ajout>20){
                html.find('.cpt'+i).val(20);
                ajout=20;
            }
            if(i==1 || i==3 || i==4 || i==5 || i==6 || i==7 || i==8 || i==14 || i==17 || i==24 || i==28 || i==30 || i==37 || i==38 || i==41 || i==45 || i==47 || i==50 || i==51 || i==56){
                var muti=3;
            }else if(i==2 || i==10 || i==11 || i==12 || i==16 || i==25 || i==27 || i==29 || i==52 || i==57){
                var muti=2;
            }else{
                var muti=1;
            }
            resultat=resultat-(ajout*muti);
        }

        html.find('.restant').val(resultat);

        
        //Stat base
        var b_psy=Math.round((parseInt(ment)+(parseInt(soci)/2)-parseInt(phys)+5)/4+2);
        var b_nb=Math.round(parseInt(b_psy)/4)+1+parseInt(level);
        var b_cout=Math.round((parseInt(b_psy)-parseInt(b_nb))/2)+3;

        //stat actuel
        var psy=parseInt(html.find('.psymax').val());
        var PVmin=Math.round(parseInt(phys)/3);
        var PSYmin=b_psy;
        var cout=Math.round((parseInt(psy)-parseInt(b_nb))/2)+3;
        //calcul cout et nb sort
        var xcout=Math.floor((parseInt(psy)-parseInt(b_nb))/2+3);//cout sort        
        var corbeau=this.actor.data.data.clan;
        if(corbeau !=game.i18n.localize("ombreoublie.avantrace56")){
            xcout=level;
        }

        var listsort=this.actor.sort;
        var nbsorts=listsort.length;
        var calsort=parseInt(b_nb)-parseInt(nbsorts);
        html.find('.maxsort').val(calsort);
        html.find('.coutmax').val(cout);
        if(calsort<0){
            //alert(game.i18n.localize("ombreoublie.alert4"));
            html.find('.maxsort').css({color:"red"});
        }else{
            html.find('.maxsort').css({color:"white"});
        }
        var hpmax=parseInt(html.find('.hpmax').val());
        var psymax=parseInt(html.find('.psymax').val());
        
        if(hpmax<PVmin && this.actor.data.type=="personnage" && hpmax!=0){
           html.find('.hpmax').val(PVmin);
        }
        if(psymax<PSYmin && this.actor.data.type=="personnage" && psymax!=0 && corbeau !=game.i18n.localize("ombreoublie.avantrace56")){
           html.find('.psymax').val(PSYmin);
        }
        var pointxp=(level-1)*3;
        var calcultotxp=hpmax-PVmin+psymax-PSYmin;
        if(calcultotxp>pointxp && this.actor.data.type=="personnage" ){
            alert(game.i18n.localize("ombreoublie.alert"));
        }

        //test des capacités acrives
        $( ".tableaucreation input" ).each(function( index ) {
          var valor= $( this ).val();
          if(valor>0){
            $( this ).css({"background":"#56853b","color": "white"});
          }else if(valor<0){
            $( this ).css({"background":"#a51b1b","color": "white"});
          }
        });
        //Magie lancer un sort
        html.find('.item-lancer').on('click',function(){
            let monJetDeDes = "1d100";
            let mental = html.find('.mental').val();
            let bonus = html.find('.bonusactor').val();
            let malus = html.find('.malussactor').val();
            let posture = html.find('.postures').val();
            var cout =  $(this).data('cout');
            const name = $(this).data('name');
            const nom = html.find('.nomperso').val();
            var psy = html.find('.psy').val();
            var hp = html.find('.hp').val();
            var insoi = html.find('.insoin').val();

            var bonuspost=0;
            var critique=5;
            if(posture=="Focus"){
                bonuspost=5;
            }else if(posture="Offensif"){
                critique=10;
            }
            if(bonus==undefined){
            	bonus=0;
            }
            let inforesult=parseInt(mental)+parseInt(bonus)+bonuspost+parseInt(malus);
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
            }else if(retour<=critique){
                succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("ombreoublie.lang83")+"</h4>";
            }else if(retour<=inforesult){
                succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("ombreoublie.lang84")+"</h4>";
            }else{
                succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>"+game.i18n.localize("ombreoublie.lang85")+"</h4>";
            }
            if(posture=="Focus"){
               cout=parseInt(cout)-1; 
            }
            if(cout<0){
                cout=0;
            }
            if(psy<cout){
                var diff= parseInt(cout)-parseInt(psy)
                hp=parseInt(hp)-parseInt(diff);
                psy=0;
                insoi= parseInt(insoi)+parseInt(diff);
                html.find('.insoin').val(insoi);
                html.find('.hp').val(hp);
            }else {
                psy = parseInt(psy)-parseInt(cout)
            }
            html.find('.psy').val(psy);
            const texte = "Lance " + name + " : 1d100 - " + inforesult + succes;
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ alias: nom }),
                flavor: texte
            });
        });


        //Avantage
        var avant=html.find('.avant').val();
        var desan=html.find('.desan').val();
        if(avant>0){
            html.find('.avant').css("opacity", "1");
        }else {
            html.find('.avant').css("opacity", "0.5");
        }
        if(desan>0){
            html.find('.desan').css("opacity", "1");
        }else {
            html.find('.desan').css("opacity", "0.5");
        }

        //Insoignable
        var insoin=html.find('.insoin').val();
        var hp=html.find('.hp').val();
        var hpmax=html.find('.hpmax').val();
        if(hpmax==hp && insoin>0){
            hp=parseInt(hpmax)-parseInt(insoin);
            html.find('.hp').val(hp);
        }

        //Posture
        var postures=html.find('.postures').val();
        $('.offensif').on('click',function(){
            let messageTable = game.i18n.localize("ombreoublie.lang86");
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker(),
                content: messageTable
            };
            ChatMessage.create(chatData, {});
        });
        $('.defensif').on('click',function(){
             let messageTable = game.i18n.localize("ombreoublie.lang87");
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker(),
                content: messageTable
            };
            ChatMessage.create(chatData, {});
        });
        $('.focus').on('click',function(){
            let messageTable = game.i18n.localize("ombreoublie.lang88");
            let chatData = {
                user: game.user._id,
                speaker: ChatMessage.getSpeaker(),
                content: messageTable
            };
            ChatMessage.create(chatData, {});
        }); 
        if(postures=="Focus"){
            html.find('.focus').css("opacity", "1");
        }else if(postures=="Offensif"){
            html.find('.offensif').css("opacity", "1");
                    
        }else if(postures=="Défensif"){
            html.find('.defensif').css("opacity", "1");
            
        }else{
            html.find('.aucune').css("opacity", "1");
            
        }
        $('.aucune').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Aucune");

        });
        $('.focus').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Focus");
        });
        $('.offensif').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Offensif");
        });
        $('.defensif').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".postures").val("Défensif");
        });

        //Etat
        var etats=['inconsient','invisible','blesse','mort','empoisonné','prie','attache','fort','faible','concentre','brule','mordu','aucun']
        var actoretat=html.find('.etats').val();
        for (var i = 0; i <= 13; i++) {
            if(actoretat==etats[i]){
                html.find('.etat'+i).css("opacity", "1");
            }
        }
        $('.etat0').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('inconsient');
        });
        $('.etat1').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('invisible');
        });
        $('.etat2').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('blesse');
        });
        $('.etat3').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('mort');
        });
        $('.etat4').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('empoisonné');
        });
        $('.etat5').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('prie');
        });
        $('.etat6').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('attache');
        });
        $('.etat7').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('fort');
        });
        $('.etat8').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('faible');
        });
        $('.etat9').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('concentre');
        });
        $('.etat10').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('brule');
        });
        $('.etat11').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('mordu');
        });
        $('.etat12').on('click',function(){
            $(this).parent().children("button").css({"opacity": "0.5"});
            //$(this).css("opacity", "1");
            $(this).parent().find(".etats").val('aucun');
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

        //monstre level up
        $('.levelup').on('click',function(){
            var lvl=html.find('.lvl').val();
            var pv=html.find('.hpmax').val();
            var ps=html.find('.psymax').val();
            pv=parseInt(pv)+3;
            ps=parseInt(ps)+3;

            html.find('.hpmax').val(pv);
            html.find('.psymax').val(ps);
            var bonus=0;
            if(lvl<=3){
                bonus=1;
            }else {
                bonus=0;
            }
            var ar=html.find('.protection').val();
            if(ar==undefined||ar==""){
                ar=0;
            }
            ar=parseInt(ar)+(parseInt(bonus));
            
            html.find('.protection').val(ar);

            var degat=html.find('.degat').val();
            var fixe = degat.split('+');
            var number=fixe[1];
            if(number==undefined||number==""){
                number=0;
            }
            if(lvl<=5){
                number=parseInt(number)+1;
            }
            html.find('.degat').val(fixe[0]+'+'+number);
            lvl++;
            html.find('.lvl').val(lvl);
        });

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
        let bonus =this.actor.data.data.bonus;
        let malus =this.actor.data.data.malus;
        let posture =this.actor.data.data.posture;
        const name = event.target.dataset["name"];
        const jetdeDesFormule = monJetDeDes.replace("d", "d100");
        var bonuspost=0;
        var critique=5;
        if(posture=="Focus"){
            bonuspost=5;
        }else if(posture=="Offensif"){
            critique=10;
        }

        if(bonus==""){bonus=0;}
        if(malus==""){malus=0;}
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
        if(retour>95){//lang
            succes="<h4 class='result' style='background:#ff3333;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec critique</h4>";
        }else if(retour<=critique){
            succes="<h4 class='result' style='background:#7dff33;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite critique</h4>";
        }else if(retour<=inforesult){
            succes="<h4 class='result' style='background:#78be50;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Réussite</h4>";
        }else{
            succes="<h4 class='result' style='background:#ff5733;text-align: center;color: #fff;padding: 5px;border: 1px solid #999;'>Echec</h4>";
        }

        const texte = "Jet de " + name + " : " + jetdeDesFormule +" - " + inforesult +succes;
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