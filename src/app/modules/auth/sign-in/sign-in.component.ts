import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild("signInNgForm")
  signInNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message: "success",
  };
  signInForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    debugger
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.signInForm.get(controlName)!.hasError(errorName);
  };

  signIn(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;


    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(
      (response) => {
        debugger
        console.log(response)
        localStorage.setItem('user_Id', response._id);

        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/signed-in-redirect";

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        // Re-enable the form
        this.signInForm.enable();

        // Reset the form
        this.signInNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: "alert-warning",
          message: "Wrong email or password",
        };

        // Show the alert
        this.showAlert = true;
      }
    );
  }



}
