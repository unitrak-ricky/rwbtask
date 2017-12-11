import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPriceUpdateComponent } from './event-price-update.component';

describe('EventPriceUpdateComponent', () => {
  let component: EventPriceUpdateComponent;
  let fixture: ComponentFixture<EventPriceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPriceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPriceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
