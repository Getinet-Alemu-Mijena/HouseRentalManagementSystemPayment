import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HchrmsPaymentComponent } from './hchrms-payment.component';

describe('HchrmsPaymentComponent', () => {
  let component: HchrmsPaymentComponent;
  let fixture: ComponentFixture<HchrmsPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HchrmsPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HchrmsPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
