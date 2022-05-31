import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Pages } from 'src/app/shared/models/pages.modal';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {
  @ViewChild("pageEditNgForm")
  pageEditNgForm!: NgForm;

  alert: { type: string; message: string } = {
    type: "alert-success",
    message: "success",
  };
  _id:any;
  pageEditForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  // imageSrc:any ='photo.jpg';
  imageSrc:any ='assets/images/download.png';
  image: any;
  description:any;
  email: string = "";
  pageEditDetails: any;
  pageDetails: any;
  snapshot:any;
  token:any=(localStorage.getItem('accessToken'));


  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _pageservice: PagesService,
    private _router: Router
  ) { this.pageEditForm = this._formBuilder.group({

    title:['',[Validators.required]],
    description:['',[Validators.required]],

    // fileSource:['', [Validators.required]],
    file:['',[Validators.required]],
    email: ['', [Validators.required]]



  });


  }

  ngOnInit(): void {
    this._id=this._activatedRoute.snapshot.params['id'];
    console.log(this._id)
    debugger


    this._pageservice.getpageDetails(this._activatedRoute.snapshot.params['id'],this.token).subscribe(

      (response:any) => {
        debugger
        this.pageDetails = response.data;
        debugger
        this.pageEditForm.get('title')?.setValue(this.pageDetails.title);
        this.pageEditForm.get('description')?.setValue(this.pageDetails.description);
        this.pageEditForm.get('file')?.setValue(this.pageDetails.Image);
        debugger
        this.pageEditForm.get('email')?.setValue(this.pageDetails.createdby);

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
    return this.pageEditForm.get(controlName)!.hasError(errorName);
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



        this.pageEditForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.pageEditForm.invalid) {
      return;
    }

    // Disable the form
    this.pageEditForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();

          addObjc.append('title', this.pageEditForm.value.title);
          addObjc.append('description', this.pageEditForm.value.description);
          addObjc.append('Image', this.image);
          addObjc.append('email', this.pageEditForm.value.email);

    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._pageservice.editPage(this._id,addObjc,this.token).subscribe(
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
        this.pageEditForm.enable();

        // Reset the form
        this.pageEditNgForm.resetForm();

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
