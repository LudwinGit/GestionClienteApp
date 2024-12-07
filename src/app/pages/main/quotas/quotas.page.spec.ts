import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuotasPage } from './quotas.page';

describe('QuotasPage', () => {
  let component: QuotasPage;
  let fixture: ComponentFixture<QuotasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
