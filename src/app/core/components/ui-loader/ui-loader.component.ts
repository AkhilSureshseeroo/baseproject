import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { UiLoaderService } from './ui-loader.service';

@Component({
  selector: 'sxp-ui-loader',
  template: `
    <block-ui>
    </block-ui>
  `
})

export class UiLoaderComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  constructor(
    private uiLoaderService: UiLoaderService
  ) { }

  ngOnInit(): void {
    this.subscribeEvents();
  }

  /* Private Methods */
  private subscribeEvents(): void {
  this.uiLoaderService.loaderVisibility$.subscribe((visibility: boolean) => {
      const loaderText = this.uiLoaderService.loaderText;
      if (visibility) {
        this.blockUI.start(loaderText ?? 'Loading...');
      } else {
        this.blockUI.stop();
      }
    });
  }
}
