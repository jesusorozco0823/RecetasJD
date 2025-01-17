import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Storage } from '@ionic/storage-angular'; //IMPORTAMOS EL STORAGE

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private storage: Storage //INICIALIZAMOS EL STORAGE
  ) {}
  async ngOnInit() { //AÑADIMOS EL MÉTODO ngOnInit
    await this.storage.create(); //CREAMOS EL STORAGE
  }
}