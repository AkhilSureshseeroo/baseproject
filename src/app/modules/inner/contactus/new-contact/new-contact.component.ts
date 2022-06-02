import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss']
})
export class NewContactComponent implements OnInit {
  @ViewChild("contactAddNgForm")
  contactAddNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message:""
  };
  contactAddForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  address:any;
  email: string = "";
  contactDetails: any;
  token:any=(localStorage.getItem('accessToken'));


  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _contactservice:ContactService ,
    private _router: Router
  ) { console.log(localStorage.getItem('userId')),
  console.log(localStorage.getItem('accessToken'))
  this.contactAddForm = this._formBuilder.group({
    _id:[localStorage.getItem('userId')],
    email:['',[Validators.required]],
    phonenumber:['',[Validators.required]],
    address:['',[Validators.required]]


});

  }

  ngOnInit(): void {

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.contactAddForm.get(controlName)!.hasError(errorName);
  };
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.contactAddForm.invalid) {
      return;
    }
    // Disable the form
    this.contactAddForm.disable();

    // Hide the alert
    this.showAlert = false;

    this._contactservice.createContact(this.contactAddForm.value,this.token).subscribe(
      (response) => {
        debugger
        console.log(response)

        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/contactus";

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        debugger
        console.log(response)

        // Re-enable the form
        this.contactAddForm.enable();

        // Reset the form
        this.contactAddNgForm.resetForm();

        // Set the alert
        this.alert = {
          type: "alert-warning",
          message: "Wrong format ",
        };

        // Show the alert
        this.showAlert = true;
      }
    );
  }


}
