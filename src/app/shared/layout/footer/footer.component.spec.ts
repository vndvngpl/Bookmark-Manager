import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if the footer contains the Privacy Policy link
  it('should contain a link to the Privacy Policy page', () => {
    const privacyLink = fixture.debugElement.query(
      By.css('a[routerLink="/privacy"]')
    );
    expect(privacyLink).toBeTruthy();
    expect(privacyLink.nativeElement.textContent).toContain('Privacy Policy');
  });

  // Test to check if the footer contains the Terms of Service link
  it('should contain a link to the Terms of Service page', () => {
    const termsLink = fixture.debugElement.query(
      By.css('a[routerLink="/terms"]')
    );
    expect(termsLink).toBeTruthy();
    expect(termsLink.nativeElement.textContent).toContain('Terms of Service');
  });

  // Test to check if the footer contains the Contact Us link
  it('should contain a link to the Contact Us page', () => {
    const contactLink = fixture.debugElement.query(
      By.css('a[routerLink="/contact"]')
    );
    expect(contactLink).toBeTruthy();
    expect(contactLink.nativeElement.textContent).toContain('Contact Us');
  });

  // Test to check if the footer displays the copyright text
  it('should display the copyright text', () => {
    const copyrightText = fixture.debugElement.query(By.css('p'));
    expect(copyrightText).toBeTruthy();
    expect(copyrightText.nativeElement.textContent).toContain(
      '© 2025 Bookmark Manager. All rights reserved.'
    );
  });
});
