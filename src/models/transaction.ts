export class Transaction {


  private _client: string;
  private _date_operation: string;
  private _description: string;
  private _montant: string;
  private _solde_restant: string;
  private _type_operation: string;
  private _utilisateur: string;
  public show_details: boolean = false;


  public static GetNewInstance(): Transaction {
    return new Transaction()
  }

  public static ParseFromObject(object): Transaction {
    const model = Transaction.GetNewInstance();

    if (object) {
      model.client = object.col_client;
      model.date_operation = object.col_date_operation;
      model.description = object.col_description;
      model.montant = object.col_montant;
      model.solde_restant = object.col_solde_restant;
      model.type_operation = object.col_type_operation;
      model.utilisateur = object.col_utilisateur;
    }


    return model;
  }
  public static ParseFromArray(data: Array<object>): Array<Transaction>{
    const models = [];
     data.forEach((val,key)=>{
       models.push(Transaction.ParseFromObject(val));
     })
    return models;
  }

  constructor() {

  }


  get client(): string {
    return this._client;
  }

  set client(value: string) {
    this._client = value;
  }

  get date_operation(): string {
    return this._date_operation;
  }

  set date_operation(value: string) {
    this._date_operation = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get montant(): string {
    return this._montant;
  }

  set montant(value: string) {
    this._montant = value;
  }

  get solde_restant(): string {
    return this._solde_restant;
  }

  set solde_restant(value: string) {
    this._solde_restant = value;
  }

  get type_operation(): string {
    return this._type_operation;
  }

  set type_operation(value: string) {
    this._type_operation = value;
  }

  get utilisateur(): string {
    return this._utilisateur;
  }

  set utilisateur(value: string) {
    this._utilisateur = value;
  }

  public toJSON()
  {
    return {

      client : this.client,
    date_operation : this.date_operation,
    description : this.description,
    montant : this.montant,
    solde_restant : this.solde_restant,
    type_operation : this.type_operation,
    utilisateur : this.utilisateur
    };
  }
}
