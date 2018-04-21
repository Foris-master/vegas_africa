export class Service {


  private _id: string;
  private _nom: string;
  private _code: string;
  private _description: string;
  private _image: string;


  public static GetNewInstance(): Service {
    return new Service()
  }

  public static ParseFromObject(object): Service {
    const model = Service.GetNewInstance();
    if (object) {
      model.id = object.id;
      model.nom = object.nom;
      model.code = object.code;
      model.description = object.description;
      model.image = object.image;

    }


    return model;
  }
  public static ParseFromArray(data: Array<object>): Array<Service>{
    const models = [];
    data.forEach((val,key)=>{
      models.push(Service.ParseFromObject(val));
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


  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  public toJSON()
  {
    return {
      id : this.id,
      nom : this.nom,
    code :this.code,
    description : this.description,
    image : this.image
    };
  }
}
