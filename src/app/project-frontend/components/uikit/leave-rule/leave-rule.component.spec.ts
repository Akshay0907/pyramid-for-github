import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRuleComponent } from './leave-rule.component';

describe('LeaveRuleComponent', () => {
  let component: LeaveRuleComponent;
  let fixture: ComponentFixture<LeaveRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
