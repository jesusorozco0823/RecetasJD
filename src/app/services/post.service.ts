import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = { headers: new HttpHeaders({'Content-Type': 'application/json' })};

  constructor(
    private http: HttpClient
  ) { }
  getPosts(){
    return new Promise ((accept, reject) => {
      this.http.get(`${this.urlServer}/posts`, this.httpHeaders).subscribe(
        (data: any) =>{
          accept(data);
        },
        (error) => {
          console.log(error);
          if (error.status == 422 ){
            reject('Usuario o contraseña incorrectos');
          }else{
            reject('Error al obtener los posts');
          }  
        }
      )
    });
  }
  createPost(post_data: any){
    return new Promise((accept, reject) => {
      this.http.post(`${this.urlServer}/posts`, post_data, this.httpHeaders).subscribe(
        (data: any) => {
          accept(data);
        },
        (error) => {
          console.log(error, 'error');
          if (error.status == 500){
            reject('Error por favor intente mas tarde')
          }else{
            reject('Error al crear el post')
          }
        }
      )
    });
  }
}
