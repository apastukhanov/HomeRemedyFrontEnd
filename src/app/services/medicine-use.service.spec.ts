import { TestBed } from '@angular/core/testing';

import { MedicineUseService } from './medicine-use.service';

describe('MedicineUseService', () => {
  let service: MedicineUseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineUseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
