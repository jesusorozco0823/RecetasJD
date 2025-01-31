import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { FormBuilder, FormGroup, FormControl, Validators, ValueChangeEvent } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
defineCustomElements(window);

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone: false
})
export class AddPostModalPage implements OnInit {
  post_image: any;
  addPostForm: FormGroup;
  errorMessage: any;
  FormErros = {
    image: [
      { type: 'required', message: 'La foto es obligatoria' },
    ],
    description: [
      { type: 'requiere', message: 'la descripción es obligatoria' },
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.addPostForm = this.formBuilder.group({
      description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      image: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  ngOnInit() {
  }

  cancel() {
    this.modalController.dismiss()
  }

  async uploadPhone() {
    const uploadPhone = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 100
    });
    this.post_image = uploadPhone.dataUrl;
    this.addPostForm.patchValue({
      image: this.post_image
    });
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

  async addPost(post_data: any) {
    const user = await this.storage.get('user')
    const post_param = {
      post: {
        description: post_data.description,
        image: post_data.image,
        user_id: user.id
      }
    }
    
    this.postService.createPost(post_param).then(
      (data: any) => {
        this.showToast("post creado correctamente", "success");
        this.modalController.dismiss({ null: null });
        data.user = {
          id: user.id,
          name: user.name,
          image: user.image || 'assets/avatar/avatar.png'
        };
        this.postService.postCreated.emit(data);
        this.addPostForm.reset();
        this.post_image = null;
        this.modalController.dismiss();
      },
      (error) => {
        this.showToast("Ocurrio un error al crear el post", "danger");
      }
    );
  }
}
