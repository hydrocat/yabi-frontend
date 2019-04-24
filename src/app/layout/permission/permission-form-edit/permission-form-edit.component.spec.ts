import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFormEditComponent } from './permission-form-edit.component';

describe('PermissionFormEditComponent', () => {
  let component: PermissionFormEditComponent;
  let fixture: ComponentFixture<PermissionFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
