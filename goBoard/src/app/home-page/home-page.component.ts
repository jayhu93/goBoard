import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Notes } from './notes';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements AfterViewChecked {

  // Hide chat
  private isHidden = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { console.log('Failed to scroll to bottom') }
  }
  
  items: FirebaseListObservable<any>;
  name: any;
  msgVal: string;
  
  constructor (private af: AngularFire, private ac: AppComponent, private authService: AuthService, private router: Router) {
    this.items = af.database.list('/messages');
    this.name = ac.user_displayName;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  
  sendMessage(theirMessage: string) {
    this.items.push({ message: theirMessage, name: this.name });
    this.msgVal = '';
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
