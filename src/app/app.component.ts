import { Component } from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    HomeComponent,
    LoginComponent,
    RouterModule,
    CommonModule
  ]

})
export class AppComponent {
  title = 'simple-oauth-login';
}
