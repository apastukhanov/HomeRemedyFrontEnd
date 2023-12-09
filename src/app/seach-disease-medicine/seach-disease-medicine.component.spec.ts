import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeachDiseaseMedicineComponent } from './seach-disease-medicine.component';

describe('SeachDiseaseMedicineComponent', () => {
  let component: SeachDiseaseMedicineComponent;
  let fixture: ComponentFixture<SeachDiseaseMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeachDiseaseMedicineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeachDiseaseMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
