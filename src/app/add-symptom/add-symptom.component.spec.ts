import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSymptomComponent } from './add-symptom.component';

describe('AddSymptomComponent', () => {
  let component: AddSymptomComponent;
  let fixture: ComponentFixture<AddSymptomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSymptomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSymptomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
