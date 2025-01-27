import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';// importamos para hacer el formulario
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;
  FormErros = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
    ],
    last_name:[
      { type: 'required', message: 'El apellido es obligatorio' },
    ],
    username: [
      { type: 'required', message: 'El usuario es obligatorio' },
    ],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    password: [
      { type: 'minlength', message: 'La contraseña minimo 6 caracteres' },
      { type: 'required', message: 'La contraseña es obligatoria' }
    ],
    password_confirmation: [
      { type: 'required', message: 'La contraseña no concide' }
    ]
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCrtl: NavController
  ) { 
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      last_name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      password_confirmation: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  ngOnInit() {
  }
  registerUser(registerData : any){
    this.authService.register(registerData).then(res =>{
      console.log(res);
      this.errorMessage= '';
      this.navCrtl.navigateForward('/login');
    }).catch(err =>{
      console.log(err);
      this.errorMessage = err;
    })
  }
}
