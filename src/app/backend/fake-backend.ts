import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpResponse} from  '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        let users:any[]  = JSON.parse(localStorage.getItem('users')) || [];

        return of(null).pipe(
            mergeMap(() => {

                // for register 

                if(req.url.endsWith('/users/register') && req.method === 'POST'){
                    let newUser = req.body;
                  let duplicateUser =  users.filter(user => user.username === newUser.username).length

                    if(duplicateUser){

                        throwError({
                            error:{
                                message:('new username '+newUser.username+'is already taken')
                            }
                        })
                    }
                    newUser.id = users.length+1;
                    users.push(newUser);
                    localStorage.setItem('users',JSON.stringify(users));
                    return of(new HttpResponse({status:200}))
              
                }

                // login we have to authenticate the user credentials

                if(req.url.endsWith('/users/authenticate') && req.method === "POST"){
                
                   let loginedUser = users.filter(singleUser => {
                       return singleUser.username === req.body.username && singleUser.password === req.body.password;})

                       if(loginedUser){
                        let user = loginedUser[0];
                        let body ={

                            id : user.id,
                            firstname :user.firstName,
                            lastname : user.lastname,
                            username:user.username,
                            password : user.password,
                            token : '0000-jwt-auth-token-0000'

                        }
                        return of(new HttpResponse({status : 200,body : body}))

                       }else {
                        throwError({
                            error:{
                                message:("Invalid Credentials")
                            }
                        })

                       }

                } 

            })
        )

    }

    constructor() {
    }
}
export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

