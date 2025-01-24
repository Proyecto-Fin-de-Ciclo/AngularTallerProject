import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
//Prime-NG
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumb',
  standalone: false,

  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css'
})
export class BreadCrumbComponent implements OnInit{
  items: MenuItem[] = [];
  home: MenuItem = {icon: 'pi pi-home', routerLink:'/'};
  private titleSub$:Subscription


  constructor(private router:Router){
    this.titleSub$ = this.getDataRouter().subscribe(
      ({title})=>{
        this.items = []
        this.items.push({label: title})
    })
  }
  ngOnInit(): void {

  }
  getDataRouter(){
      return this.router.events.pipe(
        filter((e:any)=>e instanceof ActivationEnd),
        filter((e:ActivationEnd)=>e.snapshot.firstChild===null),
        map((e:ActivationEnd)=>e.snapshot.data)

        )
  }
}

