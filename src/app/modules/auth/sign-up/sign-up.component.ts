import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  @ViewChild("signUpNgForm")
  signUpNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message: "success",
  };
  signUpForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  _Id!: any;


  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.signUpForm = this._formBuilder.group({
      username:['',[Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.signUpForm.get(controlName)!.hasError(errorName);
  };
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    // Disable the form
    this.signUpForm.disable();

    // Hide the alert
    this.showAlert = false;

    this._authService.signUp(this.signUpForm.value).subscribe(
      (response) => {
        debugger
        console.log(response)
        localStorage.setItem('user_Id', response._id);
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/signed-up-redirect";

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        debugger
        console.log(response)

        // Re-enable the form
        this.signUpForm.enable();

        // Reset the form
        this.signUpNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: "alert-warning",
          message: "Wrong format in username or email or password",
        };

        // Show the alert
        this.showAlert = true;
      }
    );
  }


  }
