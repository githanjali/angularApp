import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public user:any;
  constructor() { }

  ngOnInit() {

     this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("in user component after login",this.user);

  }

}
