import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};

  UpdateDataUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient
  ) { }

  getUser(id: any){
    return new Promise((accept, reject) => {
      this.http.get(`${this.urlServer}/current_user/${id}`, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error) => {
          console.log(error, 'error');
           if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al obtener el usuario');
          }
        }
      )
    });
  }

  updateUser(user: any){
    const user_params = {
      user: user
    }
    console.log(user_params);
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/update/${user.id}`, user_params, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error) => {
          console.log(error, 'error');
           if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al actualizar el usuario');
          }
        }
      )
    });
  }
  updateDataUser(user: any){
    const user_params = {
     "user":{
        "name": user.name,
        "last_name": user.last_name,
        "image": user.image
      }
    }
    console.log(user_params);
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/update/${user.id}`, user_params, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
            this.UpdateDataUser.emit(data);
        },
        (error) => {
          console.log(error, 'error');
           if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al actualizar el usuario');
          }
        }
      )
    });
  }
  listUsers(page: number, perPage: number, query: string = ''){
    const url = `${this.urlServer}/list_users?page=${page}&per_page=${perPage}&query=${query}`;
    return this.http.get(url).toPromise();
  }

  followUser(user_id: any, followee_id: any){
    const follow_params = {
      followee_id: followee_id
    }
    console.log(user_id, follow_params);
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/follow/${user_id}`, follow_params, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error) => {
          console.log(error, 'error');
           if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al seguir al usuario');
          }
        }
      )
    });
  }

  unFollow(user_id: any, followee_id: any){
    const follow_params = {
      followee_id: followee_id
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/unfollow/${user_id}`, follow_params, this.httpHeaders).subscribe(
        (data: any)=>{
            accept(data);
        },
        (error) => {
          console.log(error, 'error');
           if (error.status == 500){
            reject('Error Porfavor intenta mas tarde');
          }else{
            reject('Error al seguir al usuario');
          }
        }
      )
    });
  }
}