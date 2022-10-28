import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: [],
})
export class RegistroComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.vs.nombreApellidoPattern),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.vs.emailPattern)],
        [this.evs],
      ],
      username: ['', [Validators.required, this.vs.noPuedeSerStrider]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [this.vs.camposIguales('password', 'confirmPassword')],
    }
  );

  get nombreErrorMsg(): string {
    const errors = this.miFormulario.get('nombre')?.errors;
    if (errors!['required']) {
      return 'El campo es obligatorio';
    } else if (errors!['pattern']) {
      return 'Debe de ser en formato de nombre y apellido';
    }

    return '';
  }

  constructor(
    private fb: FormBuilder,
    private vs: ValidatorService,
    private evs: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.patchValue({
      nombre: 'Adrian Molina',
      email: 'test1@test.com',
      username: 'Machiner',
      password: '123456',
      confirmPassword: '123456',
    });
  }

  campoNoValido(campo: string) {
    return (
      this.miFormulario.controls[campo].invalid &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  get nombre() {
    return this.miFormulario.get('nombre');
  }

  get email() {
    return this.miFormulario.get('email');
  }

  get username() {
    return this.miFormulario.get('username');
  }

  get password() {
    return this.miFormulario.get('password');
  }

  get confirmPassword() {
    return this.miFormulario.get('confirmPassword');
  }
}
