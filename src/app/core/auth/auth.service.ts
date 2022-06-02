import { Injectable } from "@angular/core";
import { CommunicationService } from "src/app/core/services/communication.service";
import { Observable, of, throwError } from "rxjs";

import { catchError, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoginAPI } from "src/app/shared/constants/api-end-points/login.Constant";
import { SignUpAPI } from "src/app/shared/constants/api-end-points/signup.Constant";
import { getprofileAPI, ProfileAddAPI } from "src/app/shared/constants/api-end-points/profile.Constant";
import { ApiResponse } from "src/app/shared/models/api.response.model";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _authenticated: boolean = false;

  set accessToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  get accessToken(): string {
    return localStorage.getItem("accessToken") ?? "";
  }

  set userId(id: string) {
    localStorage.setItem("userId", id);
  }

  get userId(): string {
    return localStorage.getItem("userId") ?? "";
  }

  set userName(id: string) {
    localStorage.setItem("userName", id);
  }

  get userName(): string {
    return localStorage.getItem("userName") ?? "";
  }

  set accessControl(id: any) {
    localStorage.setItem("accessControl", id);
  }

  get accessControl(): any {
    return localStorage.getItem("accessControl");
  }

  constructor(private communicationService: CommunicationService) {}

  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    debugger
    if (this._authenticated) {
      return throwError(() => new Error('User is already logged in'));
    }

    return this.communicationService
      .post<any>(LoginAPI.login(), credentials)
      .pipe(
        switchMap((response: any) => {
          debugger
          // Store the access token in the local storage
          this.accessToken = response.token;

          this.userId = response.user_id;

          this.userName = response.username;

          // this.accessControl = JSON.stringify(response.acl[0]);

          // Set the authenticated flag to true
          this._authenticated = true;

          // Return a new observable with the response
          return of(response);
        })
      );
  }
  signUp(credentials: { username: string; email:string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    debugger
    if (this._authenticated) {
      return throwError(() => new Error('User is already registered'));
    }


    return this.communicationService
      .post<any>(SignUpAPI.signup(), credentials)
      .pipe(
        switchMap((response: any) => {
          debugger
          // Store the access token in the local storage
          this.accessToken = response.token;

          this.userId = response.user.user_id;

          this.userName = response.user.username;

          // this.accessControl = JSON.stringify(response.acl[0]);

          // Set the authenticated flag to true
          this._authenticated = true;

          // Return a new observable with the response
          return of(response);
        })
      );
  }
  getprofileDetails(_id: any,session:any): Observable<ApiResponse<any>> {
    return this.communicationService.get<ApiResponse<any>>(
      getprofileAPI.getprofiledetails(_id),'',session
    );
  }

  ProfileAdd(credentials:any): Observable<any> {
    // Throw error, if the user is already logged in
    debugger
    if (this._authenticated) {
      return throwError(() => new Error('User is already registered'));
    }



    return this.communicationService
      .post<any>(ProfileAddAPI.ProfileAdd(), credentials)
      .pipe(
        switchMap((response: any) => {
          debugger
          // Store the access token in the local storage
          this.accessToken = response.token;

          // this.userId = response.user.userid;

          // this.userName = response.user.username;

          // this.accessControl = JSON.stringify(response.acl[0]);

          // Set the authenticated flag to true
          this._authenticated = true;

          // Return a new observable with the response
          return of(response);
        })
      );
  }


  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    } else {
      return of(true);
    }
  }
}
