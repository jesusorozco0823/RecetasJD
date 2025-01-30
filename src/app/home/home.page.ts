import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ModalController } from '@ionic/angular';
import { AddPostModalPage } from '../add-post-modal/add-post-modal.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  posts: any;
  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log('home page');
    this.postService.getPosts().then((data: any) => {
      console.log(data);
      this.posts = [];
      data.filter((post: any) => {
        this.posts.push({ ...post, showCompleteDescription: false });
      })
      console.log(this.posts);
    })
  }

  toggleTextDisplay(postId: any) {
    this.posts.filter((post: any) => {
      if (post.id == postId) {
        post.showCompleteDescription = !post.showCompleteDescription;
      }
    })
  }

  async addPost() {
    console.log("add Post");
    const modal = await this.modalController.create({
      component: AddPostModalPage,
      componentProps: {}
    });
    return await modal.present();
  }
}