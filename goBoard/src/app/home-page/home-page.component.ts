import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Renderer } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Notes } from './notes';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AppComponent } from '../app.component';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [HomePageService]
})

export class HomePageComponent implements AfterViewChecked, OnDestroy {

  connection;

  // Hide chat
  private isHidden = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {  }
  }
  
  items: FirebaseListObservable<any>;
  name: any;
  msgVal: string;
  
  constructor (private af: AngularFire, private ac: AppComponent, 
  private authService: AuthService, private router: Router, private _renderer: Renderer,
  private _el: ElementRef, private noteService: HomePageService) {
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




  // Find coordinates debug
  private x: Number;
  private y: Number;
  private rect: any;

  onDrag(note: string) {
    this.rect = document.getElementById('note').getBoundingClientRect();
    this.x = this.rect.left;
    this.y = this.rect.top;

    setTimeout(() => {
      console.log("note id", this.x, this.y);
    }, 100);
  }
  
  descript: string;
  onPress(note: string) {
        this.randomNumber = Math.floor(Math.random() * this.colorlist.length);
        this.rcolor = this.colorlist[this.randomNumber];
        if (note) {
          this.descript = note;
          this.notes.push(new Notes(note, this.rcolor));
          this.noteService.sendNote(this.notes);  
          this.descript = '';        
          
        // Debug
          setTimeout(() => {
           console.log("note id", document.getElementById('note').getBoundingClientRect());
          }, 1000);
        }
        //console.log(JSON.stringify(note));
  }

  removeNote(note: Notes) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }

  ngOnInit() {
    this.connection = this.noteService.getNotes().subscribe(notes => {
      this.notes.push(new Notes(this.descript, this.rcolor));
    });
  }

  ngOnDestroy()
  {
    this.connection.unsubscribe();
  }

}
