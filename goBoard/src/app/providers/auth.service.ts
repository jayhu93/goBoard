import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { } from 'jasmine';

@Injectable()
export class AuthService {

    constructor(public af: AngularFire) { }

    /* Firebase stuff */
    login() {
        return this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        });
    }

    logout() {
        return this.af.auth.logout();
    }

}
