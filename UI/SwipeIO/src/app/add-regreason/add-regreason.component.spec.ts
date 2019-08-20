import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegreasonComponent } from './add-regreason.component';

describe('AddRegreasonComponent', () => {
  let component: AddRegreasonComponent;
  let fixture: ComponentFixture<AddRegreasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRegreasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
