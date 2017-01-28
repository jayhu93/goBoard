import { Component } from '@angular/core';
import { Notes } from './notes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  notes = [];

  onPress(note: string) {
        if (note){
          this.notes.push(new Notes(note));
        }
        //console.log(JSON.stringify(note));
    }
}
