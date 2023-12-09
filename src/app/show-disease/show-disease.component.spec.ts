import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDiseaseComponent } from './show-disease.component';

describe('ShowDiseaseComponent', () => {
  let component: ShowDiseaseComponent;
  let fixture: ComponentFixture<ShowDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDiseaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
