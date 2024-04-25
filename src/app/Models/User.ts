// user.model.ts 
export class User {
    id?: string; 
    email!: string;
    password?: string;
    displayName?: string;
    createdAt?: string;
  }
  


  export class NewUser {
    constructor(
      public email: string,
      public id: string,
      private _token: string,
      private _expiresIn: Date
    ){

    }

    get token(){
      if(!this._expiresIn || this._expiresIn < new Date()){
        return null;
      }
      return this._token;
    }
  }