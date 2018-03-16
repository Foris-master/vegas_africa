export class AuthenticatedUser {


  private _cle_de_session: string;
  private _nom_prenom: string;
  private _num_tel: string;
  private _email: string;
  private _ville: string;


  public static GetNewInstance(): AuthenticatedUser {
    return new AuthenticatedUser(null, null, null)
  }

  public static ParseFromObject(object): AuthenticatedUser {
    const model = AuthenticatedUser.GetNewInstance();

    if (object) {
      model.cle_de_session = object.cle_de_session;
      model.nom_prenom = object.nom_prenom;
      model.num_tel = object.num_tel;
      model.email = object.email;
      model.ville = object.ville;
    }

    return model;
  }

  constructor(nom_prenom: string, id: number, cle_de_session: string) {
    this._nom_prenom = nom_prenom;
    this._cle_de_session = cle_de_session;
  }

  get nom_prenom(): string {
    return this._nom_prenom;
  }

  set nom_prenom(value: string) {
    this._nom_prenom = value;
  }

  get cle_de_session(): string {
    return this._cle_de_session;
  }

  set cle_de_session(value: string) {
    this._cle_de_session = value;
  }


  get num_tel(): string {
    return this._num_tel;
  }

  set num_tel(value: string) {
    this._num_tel = value;
  }


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get ville(): string {
    return this._ville;
  }

  set ville(value: string) {
    this._ville = value;
  }

  public toJSON()
  {
    return {
      cle_de_session : this.cle_de_session,
    nom_prenom : this.nom_prenom,
    num_tel :this.num_tel,
    email : this.email,
    ville : this.ville
    };
  }
}
