import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import  {first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  loading :boolean = false;
  submitted :boolean = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,
      private alertService: AlertService,
      private snakbar : MatSnackBar) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
     
    this.loading = true;
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  console.log(data);
                  this.snakbar.open('Registration successful','Undo');
                  //this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                 // this.alertService.error(error);
                  this.loading = false;
              });
  }

}
