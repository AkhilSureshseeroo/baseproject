import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ConfirmedValidator } from 'src/app/core/services/confirmed.validator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild("profileAddNgForm")
  profileAddNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message: "success",
  };

  profileAddForm!: FormGroup;
  profileDetails:any;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  imageSrc:any ='assets/images/images.jpeg';
  image: any;
  token:any=(localStorage.getItem('accessToken'));

  // image:File='';




  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _router: Router
  )

  {console.log(localStorage.getItem('userId'))
    this.profileAddForm = this._formBuilder.group({
      _id:[localStorage.getItem('userId')],
      username:['',[Validators.required]],
      file:['',[Validators.required]],

      // fileSource:['', [Validators.required]],
      email:['',[Validators.required]],
      password: ['', [Validators.required]],
      confirmpassword:['',[Validators.required]]


    },
    {
      validator: ConfirmedValidator('password', 'confirmpassword')
    });




   }

  ngOnInit(): void {

    this._authService.getprofileDetails(this.profileAddForm.value._id,this.token).subscribe(
      // () => {
      //   debugger
      //   // const redirectURL =
      //   //   this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
      //   //   "/signed-in-redirect";

      //   // // Navigate to the redirect url
      //   // this._router.navigateByUrl(redirectURL);
      // },
      (response) => {
        debugger
        this.profileDetails = response.data;
        this.profileAddForm.get('username')?.setValue(this.profileDetails.username);
        this.profileAddForm.get('email')?.setValue(this.profileDetails.email);

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
    return this.profileAddForm.get(controlName)!.hasError(errorName);
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



        this.profileAddForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.profileAddForm.invalid) {
      return;
    }

    // Disable the form
    this.profileAddForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();
          addObjc.append('_id', this.profileAddForm.value._id)
          addObjc.append('image', this.image);
          addObjc.append('username', this.profileAddForm.value.username);
          addObjc.append('email', this.profileAddForm.value.email);
          addObjc.append('password', this.profileAddForm.value.password);
          addObjc.append('confirmpassword', this.profileAddForm.value.confirmpassword);

    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._authService.ProfileAdd(addObjc).subscribe(
      () => {
        debugger
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/signed-in-redirect";

        // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        debugger
        console.log(response)
        // Re-enable the form
        this.profileAddForm.enable();

        // Reset the form
        this.profileAddNgForm.resetForm();

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
