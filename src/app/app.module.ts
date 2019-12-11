import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { fakeBackendProvider} from './backend/fake-backend'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';



import { DemoMaterialModule} from './material.module'
import { AppComponent } from './app.component';
import { StoreService } from './services/store.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './navbar/sidenav/sidenav.component';
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {JwtInterceptor} from  './backend/jwt.interceptor';
import  {AuthGuard} from  './guards/auth-guard'
import {UserComponent} from './user/user.component'
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    SignInComponent,
    SignUpComponent,
    UserComponent,
    UserProfileComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    DemoMaterialModule,
    HttpClientModule,
    AppRoutingModule,
FormsModule,ReactiveFormsModule,MatSnackBarModule,
MatToolbarModule,MatIconModule,MatSidenavModule,MatListModule,MatButtonModule
    
  ],
  providers: [StoreService,UserService,AlertService,AuthenticationService,fakeBackendProvider,AuthGuard,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
       
    
    
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
