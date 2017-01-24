"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'board',
            template: "\n  <h3>Very simple goBoard layout</h3>\n  <div>\n    <div class='wrapper'>\n      <div class='container' id=\"content\" [dragula]='\"first-bag\"'>\n        <div id=\"taskmargins\">Create board</div>\n        <div id=\"taskmargins\">Add Responsive Layout</div>\n        <div id=\"taskmargins\">Able to add tasks</div>\n        <div id=\"taskmargins\">Able to edit tasks</div>\n      </div>\n      <div class='container' id=\"middle\" [dragula]='\"first-bag\"'>\n        <div id=\"taskmargins\">Make millions of dollars</div>\n        <div id=\"taskmargins\">Sell to google</div>\n        <div id=\"taskmargins\">Make it the best scrum board in the world</div>\n      </div>\n      <div class='container' id=\"sidebar\" [dragula]='\"first-bag\"'>\n        <div id=\"taskmargins\">Jay buy me KBBQ</div>\n        <div id=\"taskmargins\">I am hungry</div>\n        <div id=\"taskmargins\">Rule the entire world.</div>\n      </div>\n    </div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map