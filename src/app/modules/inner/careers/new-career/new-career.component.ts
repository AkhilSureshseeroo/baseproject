import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CareersService } from 'src/app/shared/services/careers.service';

@Component({
  selector: 'app-new-career',
  templateUrl: './new-career.component.html',
  styleUrls: ['./new-career.component.scss']
})
export class NewCareerComponent implements OnInit {
  @ViewChild("careerAddNgForm")
  careerAddNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message:""
  };
  careerAddForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  imageSrc:any ='assets/images/download.png';
  image: any;
  description:any;
  email: string = "";
  careerDetails: any;
  token:any=(localStorage.getItem('accessToken'));
  statuses:any=['true','false']


  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _careersservice:CareersService ,
    private _router: Router
  ) {console.log(localStorage.getItem('userId')),
  console.log(localStorage.getItem('accessToken'))
  this.careerAddForm = this._formBuilder.group({
    _id:[localStorage.getItem('userId')],
    title:['',[Validators.required]],
    description:['',[Validators.required]],

    // fileSource:['', [Validators.required]],
    file:['',[Validators.required]],
    email: ['', [Validators.required]],
    sortorder:['',[Validators.required]],
    status:['',Validators.required]

});



  }

  ngOnInit(): void {
    this.email = this._careersservice.email;
    this._authservice.getprofileDetails(this.careerAddForm.value._id,this.token).subscribe(

      (response) => {
        debugger
        this.careerDetails = response.data;

        this.careerAddForm.get('email')?.setValue(this.careerDetails.email);

        console.log(response)

      }
    );
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.careerAddForm.get(controlName)!.hasError(errorName);
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



        this.careerAddForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.careerAddForm.invalid) {
      return;
    }

    // Disable the form
    this.careerAddForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();

          addObjc.append('title', this.careerAddForm.value.title);
          addObjc.append('description', this.careerAddForm.value.description);
          addObjc.append('Image', this.image);
          addObjc.append('email', this.careerAddForm.value.email);
          addObjc.append('sortorder', this.careerAddForm.value.sortorder);
          addObjc.append('status', this.careerAddForm.value.status);

    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._careersservice.createCareer(addObjc,this.token).subscribe(
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
        this.careerAddForm.enable();

        // Reset the form
        this.careerAddNgForm.resetForm();

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
