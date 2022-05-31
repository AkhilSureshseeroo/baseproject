import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {
  services:any=[];
  imageSrc:any;
  token:any=(localStorage.getItem('accessToken'));

  constructor(
    private _servicesservice:ServicesService
  ) { }

  ngOnInit(): void {
    this._servicesservice.getPages(this.token).subscribe((data:any)=>{
      debugger
      this.services=data.data;

      console.log(this.services)
    })
  }
  deletepage(_id:any){
    this._servicesservice.deletepage(_id,this.token).subscribe(res =>{
      this.services=this.services.filter((item: { _id: any; }) => item._id ! ==_id);
      console.log("page deleted successfully")
    })
  }

  }


