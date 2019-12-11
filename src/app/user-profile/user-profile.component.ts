import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    public loggedUser:any;
  
    profileForm: FormGroup;
    loading :boolean = false;
    submitted :boolean = false;

  constructor(

    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snakbar : MatSnackBar,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit() {
    if(localStorage.getItem("currentUser")){

      this.loggedUser    =  JSON.parse( localStorage.getItem("currentUser"));
    }
      
      
      
      
      
    this.profileForm = this.formBuilder.group({
      firstname: [this.loggedUser.firstname, Validators.required],
      lastName: [this.loggedUser.lastname, Validators.required],
      username: [this.loggedUser.username, Validators.required],
      password: [this.loggedUser.password, [Validators.required, Validators.minLength(6)]]
  });
      
      
      
      


    
  }

  get f() { return this.profileForm.controls; }


  onSubmit() {
     
    this.loading = true;
      this.submitted = true;

      // stop here if form is invalid
      if (this.profileForm.invalid) {
          return;
      }

      //Update the user profile
      this.userService.register(this.profileForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  console.log(data);
                  this.snakbar.open('Profile updated successful','Undo');
                  //this.alertService.success('Registration successful', true);
                //  this.router.navigate(['/login']);
              },
              error => {
                 // this.alertService.error(error);
                  this.loading = false;
              });


     
      
      //reset the login token
      this.authenticationService.login(this.profileForm.value.username, this.profileForm.value.password)
              .pipe(first())
              .subscribe(
                  data => {
                      this.snakbar.open('logged in successfully.','undo');
                     
                  },
                  error => {
                      //this.alertService.error(error);
                      this.loading = false;
        });




  }

}
