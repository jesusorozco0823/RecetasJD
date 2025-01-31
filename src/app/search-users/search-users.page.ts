import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { concat } from 'rxjs';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false
})
export class SearchUsersPage implements OnInit { 
  users: any[] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';
  hasHoreUsers: boolean = true;
  current_user: any;

  constructor(
    private userService: UserService,
    private storage: Storage,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    toast.present();
  }

  async loadUsers(event?: any){
    this.current_user = await this.storage.get('user');
    const followingUers = this.current_user.followees || [];
  
    this.userService.listUsers(this.page, this.limit, this.query).then(
      (data: any) => {
        if (data.users.length > 0){
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUers.some((followedUser: any) => followedUser.id == user.id),
          }));

          this.users = [...this.users, ...updateUsers];
          this.page++;
        }else{
          this.hasHoreUsers = false;
        }
        if (event){
          event.target.complete();
        }
      }
    ).catch(
      (error) => {
        this.showToast("Ocurrio un error al recuperar la lista de usuarios", "danger");
        event.target.complete();
      }
    );
  }

  searchUsers(event?: any){
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasHoreUsers = true;
    this.loadUsers();
  }

  follow(followee_id: any){
    const user_id = this.current_user.id;
    this.userService.followUser(user_id, followee_id).then(
      (data: any) => {
        console.log(data);
        this.users = this.users.map((user: any) => {
          if (user.id == followee_id){
            this.showToast("Ahora sigues a " + user.name + " " + user.last_name, "success");
            return {
              ...user,
              is_following: true
            }
          }
          return user;
        });
       
      }
    ).catch(
      (error) => {
        this.showToast(error, "danger");
      });
  }

  unfollow(followee_id: any){
    const user_id = this.current_user.id;
    this.userService.unFollow(user_id, followee_id).then(
      (data: any) => {
        console.log(data);
        this.users = this.users.map((user: any) => {
          if (user.id == followee_id){
            this.showToast("Ahora has dejado de seguir a " + user.name + " " + user.last_name, "warning");
            return {
              ...user,
              is_following: false
            }
          }
          return user;
        });
      }
    ).catch(
      (error) => {
        this.showToast(error, "danger");
      });
  }

  toggleFollow(user: any){
    if (user.is_following){
      this.unfollow(user.id);
    }else{
      this.follow(user.id);
    }
  }

}