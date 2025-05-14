import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule, MatIconModule], // Import Angular Material modules used in the component
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test to check if the header contains a toolbar
  it('should contain a mat-toolbar', () => {
    const toolbar = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbar).toBeTruthy();
  });

  // Test to check if the header contains the bookmark icon
  it('should display the bookmark icon', () => {
    const icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent).toContain('bookmark_border');
  });

  // Test to check if the header displays the application title
  it('should display the application title', () => {
    const title = fixture.debugElement.query(By.css('span'));
    expect(title).toBeTruthy();
    expect(title.nativeElement.textContent).toContain('Bookmark Manager');
  });
});
