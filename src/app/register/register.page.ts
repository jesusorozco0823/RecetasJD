import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: any;
  formErrors = {
    name: [{ type: 'required', message: 'El nombre es obligatorio' }],
    lastname: [{ type: 'required', message: 'El apellido es obligatorio' }],
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es valido' }
    ],
    username: [{ type: 'required', message: 'El usuario es obligatorio' }],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' },
    ],
    passwordConfirmation: [
      { type: 'required', message: 'La confirmación de contraseña es obligatoria' },
    ],
  }
  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    })
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: ['', Validators.required],
      },
      {
        validator: this.matchPasswords('password', 'passwordConfirmation'),
      }
    );
  }
  matchPasswords(password: string, passwordConfirmation: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(password);
      const passwordConfirmationControl = formGroup.get(passwordConfirmation);
      if (passwordControl?.value !== passwordConfirmationControl?.value) {
        passwordConfirmationControl?.setErrors({ mismatch: true });
      } else {
        passwordConfirmationControl?.setErrors(null);
      }
    };
  }
  registerUser(registerData: any){
    console.log(registerData, "Datos del registro");
  }
}