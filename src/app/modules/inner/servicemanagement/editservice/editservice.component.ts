import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-editservice',
  templateUrl: './editservice.component.html',
  styleUrls: ['./editservice.component.scss']
})
export class EditserviceComponent implements OnInit {
  @ViewChild("pageEditNgForm")
  serviceEditNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message: "success",
  };
  _id:any;
  serviceEditForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  // imageSrc:any ='photo.jpg';
  imageSrc:any ='assets/images/download.png';
  image: any;
  description:any;
  email: string = "";
  serviceEditDetails: any;
  serviceDetails: any;
  snapshot:any;
  token:any=(localStorage.getItem('accessToken'));




  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _servicesservice:ServicesService,
    private _router: Router
  ) {this.serviceEditForm = this._formBuilder.group({
    _id:[localStorage.getItem('userId')],
    title:['',[Validators.required]],
    description:['',[Validators.required]],

    // fileSource:['', [Validators.required]],
    file:['',[Validators.required]],
    email: ['', [Validators.required]],
    sortorder:['',[Validators.required]],
    status:['',[Validators.required]]


  });

}

  ngOnInit(): void {
    this._id=this._activatedRoute.snapshot.params['id'];
    console.log(this._id)
    debugger


    this._servicesservice.getServiceDetails(this._activatedRoute.snapshot.params['id'],this.token).subscribe(

      (response:any) => {
        debugger
        this.serviceEditDetails = response.data;
        debugger
        this.serviceEditForm.get('title')?.setValue(this.serviceEditDetails.title);
        this.serviceEditForm.get('description')?.setValue(this.serviceEditDetails.description);
        // this.pageEditForm.get('file')?.setValue(this.pageDetails.Image);
        debugger
        this.serviceEditForm.get('email')?.setValue(this.serviceEditDetails.createdby);
        this.serviceEditForm.get('email')?.setValue(this.serviceEditDetails.createdby);
        this.serviceEditForm.get('email')?.setValue(this.serviceEditDetails.createdby);

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
  public hasError = (controlName: string, errorName: string) => {
    return this.serviceEditForm.get(controlName)!.hasError(errorName);
  };
  onFileChange(event:any) {
    debugger

    const reader = new FileReader();



    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

          this.image= event.target.files[0];






      reader.readAsDataURL(file);



      reader.onload = () => {



        this.serviceEditDetails.Image = reader.result as string;



        this.serviceEditForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.serviceEditForm.invalid) {
      return;
    }

    // Disable the form
    this.serviceEditForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();

          addObjc.append('title', this.serviceEditForm.value.title);
          addObjc.append('description', this.serviceEditForm.value.description);
          addObjc.append('Image', this.image);
          addObjc.append('email', this.serviceEditForm.value.email);
          addObjc.append('sortorder', this.serviceEditForm.value.sortorder);
          addObjc.append('status', this.serviceEditForm.value.status);


    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._servicesservice.editService(this._id,addObjc,this.token).subscribe(
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
        this.serviceEditForm.enable();

        // Reset the form
        this.serviceEditNgForm.resetForm();

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

