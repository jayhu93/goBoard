import { Component } from '@angular/core';
import { Notes } from './notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notes = [];
  colorlist = ['#ffd685', '#7aa9f7', '#99d3a9', '#f4a19a'];
  randomNumber;
  rcolor;

  onPress(note: string) {
        this.randomNumber = Math.floor(Math.random() * this.colorlist.length);
        this.rcolor = this.colorlist[this.randomNumber];
        
        if (note){
          this.notes.push(new Notes(note, this.rcolor));
        }
        //console.log(JSON.stringify(note));
    }
}
