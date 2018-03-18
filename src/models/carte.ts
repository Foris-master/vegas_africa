export class Carte {


  private _id: string;
  private _adresse: string;
  private _num_carte: string;
  private _quartier: string;
  private _telephone: string;
  private _ville: string;
  private _show_details: boolean = false;
  public login: string;
  public cle_de_session: string;

  public static GetNewInstance(): Carte {
    return new Carte()
  }

  public static ParseFromObject(object): Carte {
    const model = Carte.GetNewInstance();
    if (object) {
      model.id = object.col_id;
      model.adresse = object.col_adresse;
      model.num_carte = object.col_num_carte;
      model.quartier = object.col_quartier;
      model.telephone = object.col_telephone;
      model.ville = object.col_ville;
    }


    return model;
  }
  public static ParseFromArray(data: Array<object>): Array<Carte>{
    const models = [];
    data.forEach((val,key)=>{
      models.push(Carte.ParseFromObject(val));
    })

    return models;
  }

  constructor() {

  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get adresse(): string {
    return this._adresse;
  }

  set adresse(value: string) {
    this._adresse = value;
  }

  get num_carte(): string {
    return this._num_carte;
  }

  set num_carte(value: string) {
    this._num_carte = value;
  }

  get quartier(): string {
    return this._quartier;
  }

  set quartier(value: string) {
    this._quartier = value;
  }

  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }

  get ville(): string {
    return this._ville;
  }

  set ville(value: string) {
    this._ville = value;
  }

  get show_details(): boolean {
    return this._show_details;
  }

  set show_details(value: boolean) {
    this._show_details = value;
  }

  public toJSON()
  {
    return {
      id : this.id,
      adresse : this.adresse,
    telephone :this.telephone,
    ville : this.ville,
    num_carte : this.num_carte,
    quartier : this.quartier,
    };
  }
}
