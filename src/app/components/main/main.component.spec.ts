import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainComponent], // Declare the MainComponent
      imports: [RouterTestingModule], // Import RouterTestingModule for testing router-outlet
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent); // Create the component fixture
    component = fixture.componentInstance; // Get the component instance
    fixture.detectChanges(); // Trigger change detection
  });

  // Test to check if the component is created
  it('should create', () => {
    expect(component).toBeTruthy(); // Verify that the component is created
  });

  // Test to check if the header component is rendered
  it('should render the header component', () => {
    const headerElement =
      fixture.debugElement.nativeElement.querySelector('app-header');
    expect(headerElement).toBeTruthy(); // Verify that the header component is rendered
  });

  // Test to check if the footer component is rendered
  it('should render the footer component', () => {
    const footerElement =
      fixture.debugElement.nativeElement.querySelector('app-footer');
    expect(footerElement).toBeTruthy(); // Verify that the footer component is rendered
  });

  // Test to check if the router-outlet is present
  it('should contain a router-outlet', () => {
    const routerOutlet =
      fixture.debugElement.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy(); // Verify that the router-outlet is present
  });
});
