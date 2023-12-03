import { TestBed } from '@angular/core/testing';

import { DiseaseMedicineService } from './disease-medicine.service';

describe('DiseaseMedicineService', () => {
  let service: DiseaseMedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiseaseMedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
