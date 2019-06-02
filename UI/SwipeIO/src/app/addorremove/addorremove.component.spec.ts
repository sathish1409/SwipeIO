import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorremoveComponent } from './addorremove.component';

describe('AddorremoveComponent', () => {
  let component: AddorremoveComponent;
  let fixture: ComponentFixture<AddorremoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddorremoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddorremoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
