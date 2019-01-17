import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryShowComponent } from './query-show.component';

describe('QueryShowComponent', () => {
  let component: QueryShowComponent;
  let fixture: ComponentFixture<QueryShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
