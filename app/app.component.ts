import { Component } from '@angular/core';

@Component({
  selector: 'board',
  template: `
  <h3>Very simple goBoard layout</h3>
  <div>
    <div class='wrapper'>
      <div class='container' id="content" [dragula]='"first-bag"'>
        <div id="taskmargins">Create board</div>
        <div id="taskmargins">Add Responsive Layout</div>
        <div id="taskmargins">Able to add tasks</div>
        <div id="taskmargins">Able to edit tasks</div>
      </div>
      <div class='container' id="middle" [dragula]='"first-bag"'>
        <div id="taskmargins">Make millions of dollars</div>
        <div id="taskmargins">Sell to google</div>
        <div id="taskmargins">Make it the best scrum board in the world</div>
      </div>
      <div class='container' id="sidebar" [dragula]='"first-bag"'>
        <div id="taskmargins">Jay buy me KBBQ</div>
        <div id="taskmargins">I am hungry</div>
        <div id="taskmargins">Rule the entire world.</div>
      </div>
    </div>
  </div>
  `
})

export class AppComponent  { 

}
