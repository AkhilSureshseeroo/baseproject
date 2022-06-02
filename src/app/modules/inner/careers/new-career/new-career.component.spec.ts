import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCareerComponent } from './new-career.component';

describe('NewCareerComponent', () => {
  let component: NewCareerComponent;
  let fixture: ComponentFixture<NewCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCareerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
