import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PagesService } from 'src/app/shared/services/pages.service';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.scss']
})
export class PageNewComponent implements OnInit {
  @ViewChild("pageAddNgForm")
  pageAddNgForm!: NgForm;
  


  alert: { type: string; message: string } = {
    type: "alert-success",
    message:""
  };
  pageAddForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  imageSrc:any ='assets/images/download.png';
  image: any;
  description:any;
  email: string = "";
  pageDetails: any;
  tinyMceSettings: any;


  token:any=(localStorage.getItem('accessToken'));
  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _pageservice: PagesService,
    private _router: Router,
    

  ) {console.log(localStorage.getItem('userId')),
     console.log(localStorage.getItem('accessToken'))

    this.pageAddForm = this._formBuilder.group({
    _id:[localStorage.getItem('userId')],
    title:['',[Validators.required]],
    description:['',[Validators.required]],

    // fileSource:['', [Validators.required]],
    file:['',[Validators.required]],
    email: ['', [Validators.required]]



  });
  

  }

  ngOnInit(): void {
    
    
    this.email = this._pageservice.email;
    this._authservice.getprofileDetails(this.pageAddForm.value._id,this.token).subscribe(

      (response) => {
        debugger
        this.pageDetails = response.data;

        this.pageAddForm.get('email')?.setValue(this.pageDetails.email);

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
        // this.showAlert = true;
      }
    );



  }
  public hasError = (controlName: string, errorName: string) => {
    return this.pageAddForm.get(controlName)!.hasError(errorName);
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



        this.pageAddForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.pageAddForm.invalid) {
      return;
    }

    // Disable the form
    this.pageAddForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();

          addObjc.append('title', this.pageAddForm.value.title);
          addObjc.append('description', this.pageAddForm.value.description);
          addObjc.append('Image', this.image);
          addObjc.append('email', this.pageAddForm.value.email);

    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._pageservice.createPage(addObjc,this.token).subscribe(
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
        this.pageAddForm.enable();

        // Reset the form
        this.pageAddNgForm.resetForm();

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



