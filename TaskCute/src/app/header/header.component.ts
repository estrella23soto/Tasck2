import { Component } from '@angular/core';
import { AuthenticationService } from '../guards/authentication.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public authenticationService:AuthenticationService){
    
  }

}
