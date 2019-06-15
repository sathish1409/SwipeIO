import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRefinedlogComponent } from './employee-refinedlog.component';

describe('EmployeeRefinedlogComponent', () => {
  let component: EmployeeRefinedlogComponent;
  let fixture: ComponentFixture<EmployeeRefinedlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRefinedlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRefinedlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
