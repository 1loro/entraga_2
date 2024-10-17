import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EsperandoPage } from './esperando.page';

describe('EsperandoPage', () => {
  let component: EsperandoPage;
  let fixture: ComponentFixture<EsperandoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EsperandoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
