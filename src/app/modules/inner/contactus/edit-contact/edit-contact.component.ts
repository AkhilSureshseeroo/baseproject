import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  @ViewChild("contactEditNgForm")
  contactEditNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message: "success",
  };
  _id:any;
  contactEditForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  address:any;
  email: string = "";
  contactEditDetails: any;
  token:any=(localStorage.getItem('accessToken'));
  snapshot:any;



  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _contactservice:ContactService ,
    private _router: Router
  ) {this.contactEditForm = this._formBuilder.group({
    _id:[localStorage.getItem('userId')],
    email:['',[Validators.required]],
    phonenumber:['',[Validators.required]],
    address:['',[Validators.required]],

  });

  }

  ngOnInit(): void {
    this._id=this._activatedRoute.snapshot.params['id'];
    console.log(this._id)
    debugger
    this._contactservice.getContactDetails(this._activatedRoute.snapshot.params['id'],this.token).subscribe(

      (response:any) => {
        debugger
        this.contactEditDetails = response.data;
        debugger
        this.contactEditForm.get('email')?.setValue(this.contactEditDetails.email);
        this.contactEditForm.get('phonenumber')?.setValue(this.contactEditDetails.phonenumber);
        // this.pageEditForm.get('file')?.setValue(this.pageDetails.Image);
        debugger
        this.contactEditForm.get('address')?.setValue(this.contactEditDetails.address);


        console.log(response)
        // Re-enable the form
        // this.profileAddForm.enable();

        // Reset the form
        // this.profileAddNgForm.resetForm();

        // Set the alert
        // this.alert = {
        //   type: "alert-warning",
        //   message: "Wrong format ",
        // };

        // Show the alert
        this.showAlert = true;
      }
    );

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.contactEditForm.invalid) {
      return;
    }
    // Disable the form
    this.contactEditForm.disable();

    // Hide the alert
    this.showAlert = false;

    this._contactservice.editcontact(this._id,this.contactEditForm.value,this.token).subscribe(
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
        this.contactEditForm.enable();

        // Reset the form
        this.contactEditNgForm.resetForm();

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




