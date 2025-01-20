import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(credentials: any){
    console.log(credentials.email, "DESDE EL SERVICIO");
    return new Promise((accept, reject) => {
      if(credentials.email == 'jesusorozco@gmail.com'){
        accept('Login Correcto');
      }else{
        reject('Login Incorrecto');
      }
    });
  }
}
