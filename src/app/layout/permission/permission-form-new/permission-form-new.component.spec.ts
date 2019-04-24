import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionFormNewComponent } from './permission-form-new.component';

describe('PermissionFormNewComponent', () => {
  let component: PermissionFormNewComponent;
  let fixture: ComponentFixture<PermissionFormNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionFormNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
