import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Draggable } from 'ng2draggable/draggable.directive';

/* Firebase */
import { 
  AngularFireModule, 
  AuthMethods, 
  AuthProviders 
} from "angularfire2";

const firebaseConfig = {
  apiKey: "AIzaSyCtEFa6iU7OIn73IlolN-PF4kUF6tuCOy8",
  authDomain: "goboard-9399d.firebaseapp.com",
  databaseURL: "https://goboard-9399d.firebaseio.com",
  storageBucket: "goboard-9399d.appspot.com",
  messagingSenderId: "351423815295"
};

@NgModule({
  declarations: [
    AppComponent,
    Draggable
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Popup })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
