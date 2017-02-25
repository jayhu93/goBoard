import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notes } from './notes';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})

export class AppComponent {
  /*     Messaging socket.io Stuff    */
  messages = [];
  connection;
  message;

  constructor (private appService:AppService) {}

  sendMessage() 
  {
    this.appService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() 
  {
    this.connection = this.appService.getMessages().subscribe(message =>
    {
      this.messages.push(message);
    })
  }

  ngOnDestroy()
  {
    this.connection.unsubscribe();
  }




  /*     Note Stuff      */
  public notes: Array<Notes> = [];
  colorlist = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB',
    '#B2EBF2', '#B2DFDB', '#C8E6C9', '#F0F4C3', '#FFECB3', '#FFE0B2', '#FFCCBC'];
  randomNumber;
  rcolor;

  onPress(note: string) {
        this.randomNumber = Math.floor(Math.random() * this.colorlist.length);
        this.rcolor = this.colorlist[this.randomNumber];
        if (note)
          this.notes.push(new Notes(note, this.rcolor));
        //console.log(JSON.stringify(note));
  }
  removeNote(note: Notes)
  {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
    
}
