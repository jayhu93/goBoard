import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';
import {} from 'jasmine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  
  public isLoggedIn: Boolean;
  public user_displayName: string;
  private user_email: String;
  private debug = false; // debug switch
  
  constructor (private authService: AuthService, private router: Router) {
    this.authService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
          this.user_displayName = 'logged out';
          this.user_email = '';
          this.router.navigate(['login']);
        } else {
          this.isLoggedIn = true;
          if (this.debug) debugger;
          this.user_displayName = auth.google.displayName;
          if (this.debug) debugger;
          this.user_email = auth.google.email;
          this.router.navigate(['']);
        }
      }
    );
  }
}