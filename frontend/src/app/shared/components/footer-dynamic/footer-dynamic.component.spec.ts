import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDynamicComponent } from './footer-dynamic.component';

describe('FooterDynamicComponent', () => {
  let component: FooterDynamicComponent;
  let fixture: ComponentFixture<FooterDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
