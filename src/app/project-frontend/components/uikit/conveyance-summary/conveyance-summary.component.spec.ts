import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveyanceSummaryComponent } from './conveyance-summary.component';

describe('ConveyanceSummaryComponent', () => {
  let component: ConveyanceSummaryComponent;
  let fixture: ComponentFixture<ConveyanceSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveyanceSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveyanceSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
