import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients:any=[];
  imageSrc:any;
  token:any=(localStorage.getItem('accessToken'));


  constructor(
    private _clientservice:ClientService
  ) { }

  ngOnInit(): void {
    this._clientservice.getClients(this.token).subscribe((data:any)=>{
      debugger
      this.clients=data.data;

      console.log(this.clients)
    })
  }
  deleteclient(_id:any){
    this._clientservice.deleteclient(_id,this.token).subscribe(res =>{
      this.clients=this.clients.filter((item: { _id: any; }) => item._id ! ==_id);
      console.log("page deleted successfully")
    })
  }



}
