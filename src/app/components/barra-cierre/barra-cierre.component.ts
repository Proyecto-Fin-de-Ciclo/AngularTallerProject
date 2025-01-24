import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-barra-cierre',
  templateUrl: './barra-cierre.component.html',
  styleUrls: ['./barra-cierre.component.css'],
  standalone: true
})
export class BarraCierreComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
navigateToMain() {
  this.router.navigate(['/']);
}

}
