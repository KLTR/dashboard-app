import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBySrcComponent } from './alert-by-src.component';

describe('AlertBySrcComponent', () => {
  let component: AlertBySrcComponent;
  let fixture: ComponentFixture<AlertBySrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertBySrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBySrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
