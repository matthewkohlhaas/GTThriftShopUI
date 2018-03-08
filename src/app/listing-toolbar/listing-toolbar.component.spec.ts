import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingToolbarComponent } from './listing-toolbar.component';

describe('ListingToolbarComponent', () => {
  let component: ListingToolbarComponent;
  let fixture: ComponentFixture<ListingToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
