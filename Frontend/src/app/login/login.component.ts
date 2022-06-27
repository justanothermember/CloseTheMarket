import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  isLoginFailed = false;
  errorMessage = "";

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required
          ]
        ],
        password: [
          '',
          [
            Validators.required
          ]
        ]
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    const username = this.login.get("username")?.value;
    const password = this.login.get("password")?.value;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }

  reloadPage(): void {
    window.location.reload();
  }

}
