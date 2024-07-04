import { Component, inject } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
})
export class LoginComponent {
  private authService = inject(AuthGoogleService);

  signInWithGoogle() {
    console.log('signInWithGoogle called');
    this.authService.login();
  }
}
