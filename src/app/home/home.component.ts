import { Component, inject, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { AuthGoogleService } from '../services/auth-google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [JsonPipe],
  standalone: true,
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthGoogleService);
  private router = inject(Router);
  profile: any;
  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.profile = this.authService.getProfile();
    console.log(this.profile);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']).then((r) => {});
  }
}
