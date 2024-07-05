import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthGoogleService } from '../services/auth-google.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [JsonPipe, CommonModule, MatCardModule, MatButtonModule],
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
    console.log('profile : ', this.profile);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
