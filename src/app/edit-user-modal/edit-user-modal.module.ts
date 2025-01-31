import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditUserModalPageRoutingModule } from './edit-user-modal-routing.module';
import { EditUserModalPage } from './edit-user-modal.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditUserModalPageRoutingModule
  ],
  declarations: [EditUserModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditUserModalPageModule {}
