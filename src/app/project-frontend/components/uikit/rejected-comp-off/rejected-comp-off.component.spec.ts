import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedCompOffComponent } from './rejected-comp-off.component';

describe('RejectedCompOffComponent', () => {
  let component: RejectedCompOffComponent;
  let fixture: ComponentFixture<RejectedCompOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedCompOffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedCompOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
