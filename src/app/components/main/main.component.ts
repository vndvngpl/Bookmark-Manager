import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/layout/header/header.component";
import { FooterComponent } from "../../shared/layout/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet,HeaderComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
