import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from './result.component';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports: [MatCardModule, MatButtonModule, MatIconModule], // Import Angular Material modules used in the component
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if the thank-you message is displayed
  it('should display the thank-you message', () => {
    const thankYouMessage = fixture.debugElement.query(
      By.css('h1.text-success')
    );
    expect(thankYouMessage).toBeTruthy();
    expect(thankYouMessage.nativeElement.textContent).toContain('Thank You!');
  });

  // Test to check if the success message is displayed
  it('should display the success message', () => {
    const successMessage = fixture.debugElement.query(By.css('p.text-center'));
    expect(successMessage).toBeTruthy();
    expect(successMessage.nativeElement.textContent).toContain(
      'Your bookmark has been saved successfully.'
    );
  });

  // Test to check if the bookmark details are displayed when bookmarkDetails is set
  it('should display bookmark details if bookmarkDetails exists', () => {
    component.bookmarkDetails = {
      url: 'https://example.com',
      category: 'Tech',
      createdOn: '2023-01-01',
    };
    fixture.detectChanges();

    const urlElement = fixture.debugElement.query(By.css('a.text-info'));
    const categoryElement = fixture.debugElement.query(
      By.css('p strong:nth-child(2)')
    );
    const createdOnElement = fixture.debugElement.query(
      By.css('p strong:nth-child(3)')
    );

    expect(urlElement).toBeTruthy();
    expect(urlElement.nativeElement.textContent).toContain(
      'https://example.com'
    );
    expect(categoryElement.nativeElement.textContent).toContain('Tech');
    expect(createdOnElement.nativeElement.textContent).toContain('2023-01-01');
  });

  // Test to check if the "Go Back" button is displayed
  it('should display the "Go Back" button', () => {
    const goBackButton = fixture.debugElement.query(By.css('button'));
    expect(goBackButton).toBeTruthy();
    expect(goBackButton.nativeElement.textContent).toContain('Go Back');
  });

  // Test to check if the "Go Back" button triggers the navigateBack method
  it('should call navigateBack when "Go Back" button is clicked', () => {
    spyOn(component, 'navigateBack');
    const goBackButton = fixture.debugElement.query(By.css('button'));
    goBackButton.nativeElement.click();
    expect(component.navigateBack).toHaveBeenCalled();
  });
});
