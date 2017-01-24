import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    DragulaModule
    ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
