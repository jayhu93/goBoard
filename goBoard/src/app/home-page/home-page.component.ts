import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, Renderer } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Note } from './note';
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

    colorlist = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB',
        '#B2EBF2', '#B2DFDB', '#C8E6C9', '#F0F4C3', '#FFECB3', '#FFE0B2', '#FFCCBC'];
    randomNumber;
    rcolor;
    private debug = false;        // debug switch

    public myNoteList: FirebaseListObservable<Note[]>;
    items: FirebaseListObservable<any>;
    name: string;
    msgVal: string;

    connection;

    private chatIsHidden = false;

    constructor(public af: AngularFire,
        public ac: AppComponent,
        private authService: AuthService,
        private router: Router,
        private _renderer: Renderer,
        private _el: ElementRef,
        private noteService: HomePageService) {
        this.items = af.database.list('/messages');
        this.name = ac.user_displayName;
        this.myNoteList = af.database.list('/notes');
    }

    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }
  
    sendNoteToFirebase(note: Note) {
        this.myNoteList.push(note);
    }

    sendMessage(theirMessage: string) {
        if (this.ac.isLoggedIn === true) {
            this.name = this.ac.user_displayName;
        }
        this.items.push({ message: theirMessage, name: this.name });
        this.msgVal = '';
    }

    onDrag(note) {
        var rect = document.getElementById('note').getBoundingClientRect();
        // this.sendNoteToFirebase(note);
        note.x = rect.left;
        note.y = rect.top;

        this.myNoteList.update(note.$key, {x: rect.left, y: rect.top});

        console.log("x: " + note.x);
        console.log("y: " + note.y);
        // note.setPosition(this.x, this.y);
        if (this.debug) {// Debug
            setTimeout(() => {
                // console.log(' realXY:', this.x, this.y);
                console.log(' noteXY:', note.getX(), note.getY());
            }, 100);
        }
    }

    onPress(desc: string) {
        this.randomNumber = Math.floor(Math.random() * this.colorlist.length);
        this.rcolor = this.colorlist[this.randomNumber];
        if (desc) {
            let note = new Note(desc, this.rcolor, 0, 0);
            this.sendNoteToFirebase(note);
          
            if (this.debug) {// Debug
                console.log('inside onPress', note);
                setTimeout(() => {
                    console.log('note id', document.getElementById('note').getBoundingClientRect());
                }, 1000);
                console.log(JSON.stringify(desc));
            }
        }
    }

    removeNote(note) {
        this.myNoteList.remove(note.$key);
    }
    
    
    //web socket stuff, might not need it because we are using firebase?

/*
    ngOnInit() {
        this.connection = this.noteService.getNotes().subscribe(notes => {
            let len = this.notes.length;
            if (notes[len] != null)
                this.notes.push(notes[len]);
            if (this.debug) { // Debug
                console.log('inside connection notes:', notes);
                console.log('outside notes:', this.notes);
            }
        });
    }
*/

    ngOnDestroy() {
        this.connection.unsubscribe();
    }


}
