import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  selectedPriority: number = 0;
  priorityCounts: any = { "heigh": 0, "medium": 0, "low": 0 };
  ngZone: any;


  constructor() { }

  ngOnInit(): void {
  }

}
