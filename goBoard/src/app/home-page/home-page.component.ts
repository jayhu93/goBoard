import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Notes } from './notes';
import { HomePageService } from './home-page.service';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [HomePageService]
})

export class HomePageComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { console.log('Scroll to bottom failed yo!') }
  }

  /*     Messaging socket.io Stuff    */
  messages = [];
  connection;
  message;
  user = {};

  private isLoggedIn: Boolean;
  private user_displayName: String;
  private user_email: String;
  
  constructor (private af: AngularFire, private homepageService:HomePageService, private authService: AuthService, private router: Router) {
   this.af.auth.subscribe(user => {
      if (user) {
        // user is logged in
        this.user = user;
      }
      else {
        this.user = {};
      }
    });
  }

  sendMessage() 
  {
    this.homepageService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() 
  {
    this.connection = this.homepageService.getMessages().subscribe(message =>
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


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
