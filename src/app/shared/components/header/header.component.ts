import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string = "";
  searchForm!: FormGroup;
  isSearchBar: boolean = false;

  constructor(private authService: AuthService,
    private _formBuilder: FormBuilder,
    // private commonService :CommonService

  ) {this.buildForm() }

  ngOnInit(): void {

    this.userName = this.authService.userName;
    // this.commonService.IsSearchBar.subscribe(
    //   (selectedData) => {
    //     this.isSearchBar = selectedData

    //   })
  }
  // onSearch(){
  //   this.searchForm.value.searchText
  //   debugger
  //   this.commonService.globalSearch(this.searchForm.value.searchText);

  // }
  private buildForm() {
    this.searchForm = this._formBuilder.group({
      searchText: [''],

    });
  }

}
