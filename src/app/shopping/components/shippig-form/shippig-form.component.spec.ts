import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippigFormComponent } from './shippig-form.component';

describe('ShippigFormComponent', () => {
  let component: ShippigFormComponent;
  let fixture: ComponentFixture<ShippigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
