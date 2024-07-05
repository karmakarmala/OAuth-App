import { Component, inject } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class LoginComponent {
  private authService = inject(AuthGoogleService);
  title = 'Simple OAuth Login';
  loginInWithGoogle() {
    this.authService.login();
  }
  loginInWithFacebook() {}
}
