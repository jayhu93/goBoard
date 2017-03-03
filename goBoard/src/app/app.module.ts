import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ReversePipe } from './home-page/home-page.pipe';

import { AppComponent } from './app.component';
import { Draggable } from 'ng2draggable/draggable.directive';
import { AuthService } from './providers/auth.service';

/* Firebase */
import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";

import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const firebaseConfig = {
  apiKey: "AIzaSyCtEFa6iU7OIn73IlolN-PF4kUF6tuCOy8",
  authDomain: "goboard-9399d.firebaseapp.com",
  databaseURL: "https://goboard-9399d.firebaseio.com",
  storageBucket: "goboard-9399d.appspot.com",
  messagingSenderId: "351423815295"
};

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    Draggable,
    LoginPageComponent,
    HomePageComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
