import { TestBed } from '@angular/core/testing';

import { FundApi } from './fund-api';

describe('FundsApi', () => {
  let service: FundApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
