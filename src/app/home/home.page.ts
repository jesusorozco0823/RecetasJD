import { Component } from '@angular/core';
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
  posts: any[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;
  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log('home page');
    this.loadPosts();
    this.postService.postCreated.subscribe((newPost: any)=>{
      console.log(newPost);
      this.posts.unshift(newPost);
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

  loadPosts(event?: any){
    console.log('Load Posts');
    console.log(this.page, this.limit);
    this.isLoading = true;
    this.postService.getPosts(this.page, this.limit).then(
      (data: any)=>{
        if (data.length > 0){
          this.posts = [...this.posts, ...data];
          this.page++;
        }else{
          this.hasMore = false;
        }
        this.isLoading = false;
        if (event){
          event.target.complete();
        }
      },
      (error)=>{
        console.log(error);
        this.isLoading = false;
        if (event){
          event.target.complete();
        }
      }
    )
  }

}