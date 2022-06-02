import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CareersService } from 'src/app/shared/services/careers.service';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  @ViewChild("clientAddNgForm")
  clientAddNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message:""
  };
  clientAddForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  imageSrc:any ='assets/images/download.png';
  image: any;
  description:any;
  email: string = "";
  clientDetails: any;
  token:any=(localStorage.getItem('accessToken'));

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _clientservice:ClientService ,
    private _router: Router
  ) { console.log(localStorage.getItem('userId')),
  console.log(localStorage.getItem('accessToken'))
  this.clientAddForm = this._formBuilder.group({
    _id:[localStorage.getItem('userId')],
    name:['',[Validators.required]],
    description:['',[Validators.required]],

    // fileSource:['', [Validators.required]],
    file:['',[Validators.required]],
    email: ['', [Validators.required]],
    sortorder:['',[Validators.required]],
    status:['',[Validators.required]]

});

  }

  ngOnInit(): void {
    this.email = this._clientservice.email;
    this._authservice.getprofileDetails(this.clientAddForm.value._id,this.token).subscribe(

      (response) => {
        debugger
        this.clientDetails = response.data;

        this.clientAddForm.get('email')?.setValue(this.clientDetails.email);

        console.log(response)

      }
    );
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.clientAddForm.get(controlName)!.hasError(errorName);
  };
  onFileChange(event:any) {
    debugger

    const reader = new FileReader();



    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

          this.image= event.target.files[0];






      reader.readAsDataURL(file);



      reader.onload = () => {



        this.imageSrc = reader.result as string;



        this.clientAddForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.clientAddForm.invalid) {
      return;
    }

    // Disable the form
    this.clientAddForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();

          addObjc.append('name', this.clientAddForm.value.name);
          addObjc.append('description', this.clientAddForm.value.description);
          addObjc.append('Image', this.image);
          addObjc.append('email', this.clientAddForm.value.email);
          addObjc.append('sortorder', this.clientAddForm.value.sortorder);
          addObjc.append('status', this.clientAddForm.value.status);

    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._clientservice.createClient(addObjc,this.token).subscribe(
      () => {
        debugger
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/dashboard";

        // // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        debugger
        console.log(response)
        // Re-enable the form
        this.clientAddForm.enable();

        // Reset the form
        this.clientAddNgForm.resetForm();

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
