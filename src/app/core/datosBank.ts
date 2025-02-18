import { User } from './user';

export class DatosBank {
  id:number;
  user:User;
  cardNum:string;
  cvv:string;
  titular:string;

  constructor(id:number, user:User, cardNum:string, cvv:string, titular:string){
    this.id=id;
    this.user=user;
    this.cardNum=cardNum;
    this.cvv=cvv;
    this.titular=titular;
  }
}
