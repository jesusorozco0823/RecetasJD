import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';// importamos para hacer el formulario
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  isToastOpen = false;
  loginForm: FormGroup;
  errorMessage: any;
  FormErros = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'minlength', message: 'La contraseña minimo 6 caracteres' },
      { type: 'required', message: 'La contraseña es obligatoria' }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    })
  }

  ngOnInit() {
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  loginUser(credentials: any) {
    this.authService.login(credentials).then((res: any) => {
      this.storage.set('user', res.user);
      this.storage.set('isUserLoggedIn', true);
      this.errorMessage = '';
      this.navCtrl.navigateForward('/menu/home');
    }).catch(err => {
      console.log(err);
      this.errorMessage = err;
      this.setOpenToast(true)
    });
  }
  // Register(){
  //   console.log('Register');
  //   this.navCtrl.navigateForward('/register'); 
  // }
}