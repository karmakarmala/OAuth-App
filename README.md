# Authentication with OAuth 2.0 and OpenID Connect

## What is Auth0?

Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications. It supports various authentication methods and integrates with numerous identity providers, including social, enterprise, and custom identity providers.

### Key Features of Auth0

1. **Universal Login**:
   - Provides a customizable login page hosted by Auth0, offering a consistent login experience across different applications.

2. **Multiple Identity Providers**:
   - Supports social identity providers (like Google, Facebook), enterprise identity providers (like Active Directory, LDAP), and custom databases.

3. **OAuth 2.0 and OpenID Connect**:
   - Implements industry-standard protocols, including OAuth 2.0 and OpenID Connect, to secure access to APIs and user data.

4. **Security**:
   - Offers built-in security features such as brute-force protection, breached password detection, and multi-factor authentication (MFA).

5. **User Management**:
   - Provides comprehensive user management capabilities, including user registration, profile management, and password reset functionalities.

6. **Extensibility**:
   - Allows customization and extension through rules, hooks, and custom actions to modify the authentication and authorization process.

## What is OpenID Connect?

OpenID Connect (OIDC) is an identity layer built on top of the OAuth 2.0 protocol. It enables clients (such as web applications, mobile apps, or APIs) to verify the identity of an end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the user. Here’s a detailed breakdown of OpenID Connect:

### Key Features of OpenID Connect

1. **User Authentication**:
   - OpenID Connect allows clients to authenticate users without having to manage user credentials directly.
   - It leverages existing identity providers (IDPs) such as Google, Facebook, or enterprise identity systems like Azure AD.

2. **OAuth 2.0 Foundation**:
   - OIDC is built on top of OAuth 2.0, a widely adopted authorization framework.
   - It adds an authentication layer to OAuth 2.0, providing a standardized way to handle user sign-ins.

3. **ID Token**:
   - The core of OpenID Connect is the ID token, a JSON Web Token (JWT) that contains claims about the authenticated user.
   - The ID token includes information such as the user’s unique identifier, authentication time, and issuing authority.

4. **User Info Endpoint**:
   - Clients can retrieve additional profile information about the user by calling the UserInfo endpoint, which provides standardized user attributes like name, email, and profile picture.

### How OpenID Connect Works

1. **Authentication Request**:
   - The client initiates an authentication request to the OpenID Provider (OP), typically including a `scope` parameter requesting the `openid` scope, which indicates that OpenID Connect is being used.

2. **User Authentication**:
   - The OpenID Provider authenticates the user using their credentials (e.g., username and password, biometrics).

3. **Authorization Code**:
   - After successful authentication, the OP redirects the user back to the client with an authorization code.

4. **Token Exchange**:
   - The client exchanges the authorization code for tokens (ID token, access token) by making a request to the OP’s token endpoint.

5. **ID Token**:
   - The client validates the ID token to ensure it is issued by a trusted OP and that it has not been tampered with. The ID token contains information about the user and the authentication event.

6. **User Info Retrieval**:
   - Optionally, the client can call the UserInfo endpoint with the access token to retrieve additional user profile information.

### Benefits of OpenID Connect

1. **Interoperability**:
   - OIDC provides a standardized way to handle user authentication across different platforms and services, promoting interoperability.

2. **Security**:
   - It leverages the security features of OAuth 2.0, including token exchange and scopes, while adding identity-specific protections such as token validation and claim-based assertions.

3. **Simplicity**:
   - OIDC simplifies the process of adding authentication to applications, reducing the need to manage user credentials and complex authentication logic.

4. **Flexibility**:
   - It supports various application types, including web applications, mobile apps, and APIs, and can be integrated with multiple identity providers.

## Common Use Cases

1. **Single Sign-On (SSO)**:
   - Enables users to sign in once and gain access to multiple applications without having to re-enter their credentials.

2. **Federated Identity**:
   - Allows applications to accept identities from multiple identity providers, facilitating cross-organization collaboration and user management.

3. **User Profile Management**:
   - Provides a standardized way to access user profile information, simplifying the integration of user data across different systems.

## Popular Implementations

- **Identity Providers**:
  - Google, Microsoft, Facebook, and many other large platforms support OpenID Connect.
- **Enterprise Solutions**:
  - Azure Active Directory, Okta, Auth0 provide robust OpenID Connect implementations for enterprise environments.
- **Open Source Libraries**:
  - Libraries and frameworks for implementing OIDC are available in many programming languages, making it easy to integrate into existing applications.

## Conclusion

OpenID Connect is a powerful and flexible protocol that builds on OAuth 2.0 to provide secure and standardized user authentication. It simplifies the process of verifying user identities and managing user sessions, making it an essential tool for modern web and mobile applications. By leveraging OIDC, developers can enhance the security and user experience of their applications while reducing the complexity of authentication logic.

## Example: OAuth 2.0 with Google IDP in Angular

Below is an example of how to integrate OAuth 2.0 with Google Identity Provider in an Angular application. This example assumes you have a basic Angular application set up.

### Step 1: Install the Required Packages

First, install the Angular OAuth2 OIDC package:

```bash
npm install angular-oauth2-oidc
```

### Step 2: Create the Authentication Service
Create a file auth-google.service.ts in the app/services directory:

```typescript
import { inject, Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
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
      clientId: 'your-client-id',
      scope: 'openid profile email',
    };
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
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
    return this.oAuthService.getIdentityClaims();
  }
}
```

### Step 3: Configure the Application
Update your app.config.ts to provide the OAuth client:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideOAuthClient()],
};
```

### Step 4: Create the Login Component
Create a login.component.ts file:

```typescript
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

  loginInWithFacebook() {
    // Facebook login logic can be added here
  }
}

```


```html
<div class="login-card-container">
  <mat-card class="login-card">
    <mat-card-header>
      <mat-card-title class="title">{{ title }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="button-row">
        <button
          class="login-button"
          mat-raised-button
          color="primary"
          (click)="loginInWithGoogle()"
        >
          <img
            src="assets/icons/google.png"
            alt="Google"
            style="width: 20px; height: 20px; vertical-align: middle; margin-right: 4px;"
          />
          Log in with Google
        </button>
        <button
          class="login-button"
          mat-raised-button
          color="accent"
          (click)="loginInWithFacebook()"
        >
          <img
            src="assets/icons/facebook.png"
            alt="Facebook"
            style="width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;"
          />
          Log in with Facebook
        </button>
      </div>
    </mat-card-content>
  </mat-card>
</div>

```
### Step 5: Create the Home Component

```typescript
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

```


```html
<div class="home">
  <h1>Home Page</h1>
  <p>Name: {{ profile.name }}</p>
  <p>Email: {{ profile.email }}</p>
  <p><img [src]="profile.picture" /></p>
  <button mat-raised-button color="primary" (click)="logOut()">LogOut</button>
</div>

```
### Conclusion
You have successfully integrated OAuth 2.0 authentication using Google IDP in your Angular application. This setup allows users to log in using their Google accounts, and provides a basic structure for handling user sessions and profile information.

Feel free to customize the components and services to suit your application's requirements.


## Login Page
![Login Page](https://github.com/karmakarmala/OAuth-App/raw/master/src/assets/demo/1.png)

## Google Verification
![Select google account](https://github.com/karmakarmala/OAuth-App/raw/master/src/assets/demo/3.png)
![Google Verification](https://github.com/karmakarmala/OAuth-App/raw/master/src/assets/demo/4.png)

## Redirection
On Successful authentication redirect to Home page , displays information from user profile example name, emailid and picture
![Home Page](https://github.com/karmakarmala/OAuth-App/raw/master/src/assets/demo/5.png)





