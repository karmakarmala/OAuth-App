import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  oAuthService = inject(OAuthService);
  router = inject(Router);

  constructor() {
    this.initConfiguration();
  }

  initConfiguration() {
    console.log('Initializing OAuth Configuration');
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      redirectUri: window.location.origin + '/home',
      clientId:
        '7813125497-3gdsa8agoihvavb7bcbkcc96dkhqn8fp.apps.googleusercontent.com',
      // responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true,
    };
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        console.log('OAuth initialization completed');
        console.log('Access Token:', this.oAuthService.getAccessToken());
        console.log('ID Token:', this.oAuthService.getIdToken());
        if (this.oAuthService.hasValidAccessToken()) {
          console.log('Access token is valid, navigating to home');
          this.router.navigate(['/home']);
        } else {
          console.log('No valid access token found');
        }
      })
      .catch((error) => {
        console.error('Error during OAuth initialization', error);
      });
    // Subscribe to OAuth events
    this.oAuthService.events.subscribe((event: OAuthEvent) => {
      console.log('OAuth Event:', event);
      if (event.type === 'token_received') {
        console.log('Token received event');
        console.log('Access Token:', this.oAuthService.getAccessToken());
        console.log('ID Token:', this.oAuthService.getIdToken());
      } else if (event.type === 'token_error') {
        console.error('Token error event', event);
        // Handle token error, e.g., display error message or redirect to login page
      }
      // Add more handling for other event types as needed
    });
  }
  login() {
    console.log('Starting login process');
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    console.log('Starting logout process');
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
  }

  getProfile() {
    const profile = this.oAuthService.getIdentityClaims();
    return profile;
  }

  getToken() {
    return this.oAuthService.getAccessToken();
  }
}
