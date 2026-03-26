import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsPage } from './funds-page';

describe('FundsPage', () => {
  let component: FundsPage;
  let fixture: ComponentFixture<FundsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FundsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
