import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-newservice',
  templateUrl: './newservice.component.html',
  styleUrls: ['./newservice.component.scss']
})
export class NewserviceComponent implements OnInit {
  @ViewChild("serviceAddNgForm")
  serviceAddNgForm!: NgForm;


  alert: { type: string; message: string } = {
    type: "alert-success",
    message:""
  };
  serviceAddForm!: FormGroup;
  showAlert: boolean = false;
  isSubmited: boolean = false;
  imageSrc:any ='assets/images/download.png';
  image: any;
  description:any;
  email: string = "";
  pageDetails: any;
  token:any=(localStorage.getItem('accessToken'));
  statuses:any=['true','false']

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authservice:AuthService,
    private _servicesservice:ServicesService ,
    private _router: Router
  ) { console.log(localStorage.getItem('userId')),
      console.log(localStorage.getItem('accessToken'))

      this.serviceAddForm = this._formBuilder.group({
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
    this.email = this._servicesservice.email;
    this._authservice.getprofileDetails(this.serviceAddForm.value._id,this.token).subscribe(

      (response) => {
        debugger
        this.pageDetails = response.data;

        this.serviceAddForm.get('email')?.setValue(this.pageDetails.email);

        console.log(response)

      }
    );



  }
  public hasError = (controlName: string, errorName: string) => {
    return this.serviceAddForm.get(controlName)!.hasError(errorName);
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



        this.serviceAddForm.patchValue({

          fileSource: reader.result

        });



      };



    }

  }
  onSubmit(): void {
    debugger
    this.isSubmited = true;
    // Return if the form is invalid
    if (this.serviceAddForm.invalid) {
      return;
    }

    // Disable the form
    this.serviceAddForm.disable();

    // Hide the alert
    this.showAlert = false;
    const addObjc = new FormData();

          addObjc.append('title', this.serviceAddForm.value.title);
          addObjc.append('description', this.serviceAddForm.value.description);
          addObjc.append('Image', this.image);
          addObjc.append('email', this.serviceAddForm.value.email);
          addObjc.append('sortorder', this.serviceAddForm.value.sortorder);
          addObjc.append('status', this.serviceAddForm.value.status);

    // this._authService.ProfileAdd(this.profileAddForm.value).subscribe(

      this._servicesservice.createService(addObjc,this.token).subscribe(
      () => {
        debugger
        const redirectURL =
          this._activatedRoute.snapshot.queryParamMap.get("redirectURL") ||
          "/servicemanagement";

        // // Navigate to the redirect url
        this._router.navigateByUrl(redirectURL);
      },
      (response) => {
        debugger
        console.log(response)
        // Re-enable the form
        this.serviceAddForm.enable();

        // Reset the form
        this.serviceAddNgForm.resetForm();

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


