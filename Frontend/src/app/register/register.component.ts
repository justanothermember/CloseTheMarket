import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountUser } from '../models/accountuser.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signup: FormGroup = new FormGroup({
    fullname: new FormControl(''),
    username: new FormControl(''),
    age: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  form: any = {
    name: null,
    username: null,
    age: null,
    password: null
  };

  submitted = false;
  isSignUpFailed = false;
  errorMessage = '';
  repeatTextType!: boolean;
  passTextType!: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.repeatTextType = false;
    this.passTextType = false;
    this.signup = this.formBuilder.group(
      {
        fullname: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50)
          ]
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        age: ['',
          [
          Validators.required,
          Validators.pattern("^[0-9]*$")
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40),
            Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [this.match('password', 'confirmPassword')]
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if(this.signup.valid) {
      let user:AccountUser = {
        id: 0,
        username: this.signup.get("username")?.value,
        password: this.signup.get("password")?.value,
        first_name: this.signup.get("first_name")?.value,
        last_name: this.signup.get("last_name")?.value,
        email: this.signup.get("email")?.value,
        age: this.signup.get("age")?.value,
        isBanned: 0,
        isAdmin: 0,
        date_created: new Date(),
      }
    }
  }

  onReset(): void {
    this.submitted = false;
    this.signup.reset();
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.signup.controls;
  }

  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  toggleRepeatTextType(): void {
    this.repeatTextType = !this.repeatTextType;
  }

  togglePassTextType(): void {
    this.passTextType = !this.passTextType;
  }

}