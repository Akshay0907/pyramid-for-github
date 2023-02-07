import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConveyancePageComponent } from './conveyance-page.component';

describe('ConveyancePageComponent', () => {
  let component: ConveyancePageComponent;
  let fixture: ComponentFixture<ConveyancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConveyancePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConveyancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
