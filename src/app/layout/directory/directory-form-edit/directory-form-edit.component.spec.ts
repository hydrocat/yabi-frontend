import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryFormEditComponent } from './directory-form-edit.component';

describe('DirectoryFormEditComponent', () => {
  let component: DirectoryFormEditComponent;
  let fixture: ComponentFixture<DirectoryFormEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryFormEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
