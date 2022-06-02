import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CareersService } from 'src/app/shared/services/careers.service';

@Component({
  selector: 'app-edit-career',
  templateUrl: './edit-career.component.html',
  styleUrls: ['./edit-career.component.scss']
})
export class EditCareerComponent implements OnInit {
  @ViewChild("careerEditNgForm")
  careerEditNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message: "success",
  };
  _id:any;
  careerEditForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  // imageSrc:any ='photo.jpg';
  imageSrc:any ='assets/images/download.png';
  image: any;
  description:any;
  email: string = "";
  careerEditDetails: any;
  careerDetails: any;
  snapshot:any;
  token:any=(localStorage.getItem('accessToken'));
  statuses:any=['true','false'];




  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _careersservice:CareersService,
    private _router: Router
  ) {
    this.careerEditForm = this._formBuilder.group({
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


    this._careersservice.getCareerDetails(this._activatedRoute.snapshot.params['id'],this.token).subscribe(

      (response:any) => {
        debugger
        this.careerEditDetails = response.data;
        debugger
        this.careerEditForm.get('title')?.setValue(this.careerEditDetails.title);
        this.careerEditForm.get('description')?.setValue(this.careerEditDetails.description);
        // this.pageEditForm.get('file')?.setValue(this.pageDetails.Image);
        debugger
        this.careerEditForm.get('email')?.setValue(this.careerEditDetails.createdby);
        this.careerEditForm.get('sortorder')?.setValue(this.careerEditDetails.sortorder);
        this.careerEditForm.get('status')?.setValue(this.careerEditDetails.status);

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
  // public hasError = (controlName: string, errorName: string) => {
  //   return this.careerEditForm.get(controlName)!.hasError(errorName);
  // };
  onFileChange(event:any) {
    debugger

    const reader = new FileReader();



    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

          this.image= event.target.files[0];






      reader.readAsDataURL(file);



      reader.onload = () => {



        this.careerEditDetails.Image = reader.result as string;



        this.careerEditForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.careerEditForm.invalid) {
      return;
    }

    // Disable the form
    this.careerEditForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();

          addObjc.append('title', this.careerEditForm.value.title);
          addObjc.append('description', this.careerEditForm.value.description);
          addObjc.append('Image', this.image);
          addObjc.append('email', this.careerEditForm.value.email);
          addObjc.append('sortorder', this.careerEditForm.value.sortorder);
          addObjc.append('status', this.careerEditForm.value.status);


    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._careersservice.editcareer(this._id,addObjc,this.token).subscribe(
      () => {
        debugger
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/careers";

        // // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        debugger
        console.log(response)
        // Re-enable the form
        this.careerEditForm.enable();

        // Reset the form
        this.careerEditNgForm.resetForm();

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
