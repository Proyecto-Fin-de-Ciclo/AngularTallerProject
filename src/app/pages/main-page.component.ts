import { LoginComponent } from './../login/login.component';
import { Component } from '@angular/core';
import { LoginAuthService } from './../services/loginAuth.service';

@Component({
  selector: 'app-main-page',
  standalone: false,

  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  user: any;

  constructor(private loginAuthService:LoginAuthService) {}

  ngOnInit(): void {
    this.user = this.loginAuthService.getUser();

}
}
