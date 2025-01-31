import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  closeMenu() {
    this.menu.close();
  }
  log_out() {
    this.storage.remove("isUserLoggedIn");
    this.storage.remove("user");
    this.navCtrl.navigateRoot("/login");
  }
  account() {
    this.navCtrl.navigateRoot("/menu/account");
    this.closeMenu()
  }
  home() {
    this.navCtrl.navigateRoot("/menu/home");
    this.closeMenu()
  }
  intro() {
    this.navCtrl.navigateRoot("/intro");
    this.closeMenu()
  }
  searchUsers(){
    this.navCtrl.navigateRoot("/menu/search-users");
    this.closeMenu()
  }
}
