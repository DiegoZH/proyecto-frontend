import { Component } from '@angular/core';
import {AppService} from "./services/app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto-frontend';
  constructor(
    private appService: AppService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  optionOne(): void{
    this.router.navigate(['./tienda'],{
      relativeTo: this.activatedRoute
    })
  }
  optionTwo(): void{
    this.router.navigate(['./producto'],{
      relativeTo: this.activatedRoute
    })
  }
  optionThree(): void{
    this.router.navigate(['./productoxtienda/create'],{
      relativeTo: this.activatedRoute
    })
  }
  optionFour(): void{
    this.router.navigate(['./productoxtienda'],{
      relativeTo: this.activatedRoute
    })
  }
}
