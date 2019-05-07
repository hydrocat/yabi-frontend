import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryNewComponent } from './query-new.component';

describe('QueryNewComponent', () => {
  let component: QueryNewComponent;
  let fixture: ComponentFixture<QueryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
