import { Component, OnInit } from '@angular/core';
import { CareersService } from 'src/app/shared/services/careers.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.scss']
})
export class CareerListComponent implements OnInit {
  careers:any=[];
  imageSrc:any;
  token:any=(localStorage.getItem('accessToken'));


  constructor(
    private _careersservice:CareersService
  ) { }

  ngOnInit(): void {
    this._careersservice.getCareers(this.token).subscribe((data:any)=>{
      debugger
      this.careers=data.data;

      console.log(this.careers)
    })
  }
  deletepage(_id:any){
    this._careersservice.deletecareer(_id,this.token).subscribe(res =>{
      this.careers=this.careers.filter((item: { _id: any; }) => item._id ! ==_id);
      console.log("page deleted successfully")
    })
  }

  }


