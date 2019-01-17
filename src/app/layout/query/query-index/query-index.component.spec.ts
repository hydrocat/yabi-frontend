import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryIndexComponent } from './query-index.component';

describe('QueryIndexComponent', () => {
  let component: QueryIndexComponent;
  let fixture: ComponentFixture<QueryIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
