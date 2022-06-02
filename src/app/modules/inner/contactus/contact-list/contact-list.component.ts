import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  contacts:any=[];
  token:any=(localStorage.getItem('accessToken'));

  constructor(
    private _contactservice:ContactService
  ) { }

  ngOnInit(): void {
    this._contactservice.getContacts(this.token).subscribe((data:any)=>{
      debugger
      this.contacts=data.data;

      console.log(this.contacts)
    })
  }
  deletecontact(_id:any){
    this._contactservice.deletecontact(_id,this.token).subscribe(res =>{
      this.contacts=this.contacts.filter((item: { _id: any; }) => item._id ! ==_id);
      console.log("page deleted successfully")
    })
  }


  }


