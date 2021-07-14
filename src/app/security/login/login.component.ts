import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from '../security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private securityService: SecurityService,
    private fb: FormBuilder,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.initUserForm();
  }

  private initUserForm(): void {
    this.userForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): any {
    return this.userForm?.get('login');
  }

  password(): any {
    return this.userForm?.get('password');
  }

  submitForm(): void {
    this.securityService.login(this.userForm.getRawValue()).subscribe(data => {
      this.route.navigateByUrl('/admin');
    });
  }
}
