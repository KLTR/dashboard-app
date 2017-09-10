import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInputComponent } from './admin-input.component';

describe('AdminInputComponent', () => {
  let component: AdminInputComponent;
  let fixture: ComponentFixture<AdminInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
