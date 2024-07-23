import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoContattoComponent } from './nuovo-contatto.component';

describe('NuovoContattoComponent', () => {
  let component: NuovoContattoComponent;
  let fixture: ComponentFixture<NuovoContattoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuovoContattoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuovoContattoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
