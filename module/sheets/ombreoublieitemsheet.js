export class ombreoublieItemSheet extends ItemSheet{
    get template(){
        console.log(`ombreoublie | Récupération du fichier html ${this.item.type}-sheet.`);

        return `systems/ombreoublie/templates/sheets/${this.item.type}-sheet.html`;
    }

    getData(){
        const data = super.getData();
        data.dtypes = ["String", "Number", "Boolean"];
        console.log(data);

        return data;
    }
}