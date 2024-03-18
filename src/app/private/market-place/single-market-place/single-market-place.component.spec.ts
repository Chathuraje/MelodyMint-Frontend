import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMarketPlaceComponent } from './single-market-place.component';

describe('SingleMarketPlaceComponent', () => {
  let component: SingleMarketPlaceComponent;
  let fixture: ComponentFixture<SingleMarketPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMarketPlaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMarketPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
