import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinedLogComponent } from './refined-log.component';

describe('RefinedLogComponent', () => {
  let component: RefinedLogComponent;
  let fixture: ComponentFixture<RefinedLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefinedLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinedLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
