import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteDetailsPage } from './quote-details.page';

describe('QuoteDetailsPage', () => {
  let component: QuoteDetailsPage;
  let fixture: ComponentFixture<QuoteDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuoteDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
