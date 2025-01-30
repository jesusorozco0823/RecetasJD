import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.page.html',
  styleUrls: ['./edit-user-modal.page.scss'],
  standalone: false
})
export class EditUserModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  cancel() {
    this.modalController.dismiss()
  }
}
