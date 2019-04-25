import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryFormNewComponent } from './directory-form-new.component';

describe('DirectoryFormNewComponent', () => {
  let component: DirectoryFormNewComponent;
  let fixture: ComponentFixture<DirectoryFormNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectoryFormNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectoryFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
