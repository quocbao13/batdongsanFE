import {Component, OnInit} from '@angular/core';
import {SecurityService} from '../security.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private securityService: SecurityService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initUserForm();
  }

  private initUserForm(): void {
    this.userForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      role: ["ROLE_ADMIN"],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      cardId: ['', Validators.required],
      age: ['', Validators.required],
      houseNumber: ['', Validators.required],
      img: ['', Validators.required],
      street: ['', Validators.required],
      wardId: ['', Validators.required],
    });
  }

  login(): any {
    return this.userForm?.get('login');
  }

  password(): any {
    return this.userForm?.get('password');
  }

  submitForm(): void {
    this.securityService.register(this.userForm.getRawValue()).subscribe(data => {
      console.log(data);
    })
  }
}
