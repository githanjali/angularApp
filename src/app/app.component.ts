import { Component, Output, ViewChild, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hello-world';
  public user;
  public firstName;
  public isChkUser : boolean = false;


  constructor(private authService: AuthenticationService) {
    //alert(this.details.test); 
  }
  // checkUserProfile(){
  //   if(localStorage.getItem('currentUser')){
  //     let user = JSON.parse(localStorage.getItem('currentUser'));
  //      this.firstName = user.firstName;
  //   }
  //   else  this.firstName = 'geetha';

  // }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      this.firstName = user.firstname;
      //this.isChkUser = true;
      return true;
    }
    else{
     return false;

    }
  }
  Logout() {
    this.authService.logout();
  }




}
