import { TestBed } from '@angular/core/testing';

import { FundUseCase } from './fund-use-case';

describe('FoundUsecase', () => {
  let service: FundUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
