import { Component, OnInit } from '@angular/core';
import { PagemanagementAPI } from 'src/app/shared/constants/api-end-points/pages.Constant';
import { Pages } from 'src/app/shared/models/pages.modal';
import { PagesService } from 'src/app/shared/services/pages.service';
@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  pages:any=[];
  imageSrc:any;
  token:any=(localStorage.getItem('accessToken'));



  constructor(
    private _pageservice:PagesService
  ) { }

  ngOnInit(): void {
    this._pageservice.getPages(this.token).subscribe((data:any)=>{
      debugger
      this.pages=data.data;

      console.log(this.pages)
    })
  }
  deletepage(_id:any){
    this._pageservice.deletepage(_id,this.token).subscribe(res =>{
      this.pages=this.pages.filter((item: { _id: any; }) => item._id ! ==_id);
      console.log("page deleted successfully")
    })
  }

}
