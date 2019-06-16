import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGateComponent } from './add-gate.component';

describe('AddGateComponent', () => {
  let component: AddGateComponent;
  let fixture: ComponentFixture<AddGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
