# Angular 2 Drag-and-Drop [![npm version](https://badge.fury.io/js/ng2-dnd.svg)](https://badge.fury.io/js/ng2-dnd) [![npm monthly downloads](https://img.shields.io/npm/dm/ng2-dnd.svg?style=flat-square)](https://www.npmjs.com/package/ng2-dnd)
Angular 2 Drag-and-Drop without dependencies.

Follow me [![twitter](https://img.shields.io/twitter/follow/akopkokhyants.svg?style=social&label=%20akopkokhyants)](https://twitter.com/akopkokhyants) to be notified about new releases.

[![Build Status](https://travis-ci.org/akserg/ng2-dnd.svg?branch=master)](https://travis-ci.org/akserg/ng2-dnd)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Dependency Status](https://david-dm.org/akserg/ng2-dnd.svg)](https://david-dm.org/akserg/ng2-dnd)
[![devDependency Status](https://david-dm.org/akserg/ng2-dnd/dev-status.svg)](https://david-dm.org/akserg/ng2-dnd#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/akserg/ng2-dnd/badge.svg)](https://snyk.io/test/github/akserg/ng2-dnd)

_Some of these APIs and Components are not final and are subject to change!_

## Installation
```bash
npm install ng2-dnd --save
```

## Demo
Simple examples using ng2-dnd:
- with SystemJS in [ng2-systemjs-demo](https://github.com/akserg/ng2-systemjs-demo)
- with Webpack in [ng2-webpack-demo](https://github.com/akserg/ng2-webpack-demo)

Online demo available [here](http://akserg.github.io/ng2-webpack-demo)

Plunker demo available [here](http://embed.plnkr.co/JbG8Si)

## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ng2-dnd': 'node_modules/ng2-dnd/bundles/index.umd.js'
    }
});
```

#### 1. Add the default styles
- Import the `style.css` into your web page

#### 2. Import the `DndModule`
Import `DndModule.forRoot()` in the NgModule of your application. 
The `forRoot` method is a convention for modules that provide a singleton service.

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {DndModule} from 'ng2-dnd';

@NgModule({
    imports: [
        BrowserModule,
        DndModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

If you have multiple NgModules and you use one as a shared NgModule (that you import in all of your other NgModules), 
don't forget that you can use it to export the `DndModule` that you imported in order to avoid having to import it multiple times.

```ts
@NgModule({
    imports: [
        BrowserModule,
        DndModule.forRoot()
    ],
    exports: [BrowserModule, DndModule],
})
export class SharedModule {
}
```

#### 3. Use Drag-and-Drop operations with no code

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h4>Simple Drag-and-Drop</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true">
                    <div class="panel-body">
                        <div>Drag Me</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info">
            <div class="panel-heading">Place to drop</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-warning">
            <div class="panel-heading">Restricted to drop</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent { }
```

###$ 4. Restriction Drag-and-Drop operations with drop zones
You can use property *dropZones* (actually an array) to specify in which place you would like to drop the draggable element:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h4>Restricting Drag-and-Drop with zones</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-primary">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true"
                    [dropZones]="['zone1']">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>Zone 1 only</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true"
                    [dropZones]="['zone1', 'zone2']">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>Zone 1 & 2</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info" [dropZones]="['zone1']">
            <div class="panel-heading">Zone 1</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-warning" [dropZones]="['zone2']">
            <div class="panel-heading">Zone 2</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent { }
```

#### 5. Transfer custom data via Drag-and-Drop
You can transfer data from draggable to droppable component via *dragData* property of Draggable component:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h4>Transfer custom data in Drag-and-Drop</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true"
                    [dragData]="transferData">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>{{transferData | json}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info"
            (onDropSuccess)="transferDataSuccess($event)">
            <div class="panel-heading">Place to drop (Items:{{receivedData.length}})</div>
            <div class="panel-body">
                <div [hidden]="!receivedData.length > 0"
                    *ngFor="let data of receivedData">{{data | json}}</div>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {

    transferData:Object = {id:1, msg: 'Hello'};
    receivedData:Array<any> = [];

    constructor() { }

    /**
     * The $event is a structure:
     * {
     *   dragData: any,
     *   mouseEvent: MouseEvent
     * }
     */
    transferDataSuccess($event) {
        this.receivedData.push($event.dragData);
    }
}
```

#### 6. Use a custom function to determine where dropping is allowed
For use-cases when a static set of `dropZone`s is not possible, a custom
function can be used to dynamically determine whether an item can be dropped or
not. To achieve that, set the `allowDrop` property to this boolean function.

In the following example, we have two containers that only accept numbers that
are multiples of a user-input base integer. `dropZone`s are not helpful here
because they are static, whereas the user input is dynamic.

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h4>Use a custom function to determine where dropping is allowed</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragData]="6">
                    <div class="panel-body">dragData = 6</div>
                </div>
                <div class="panel panel-default" dnd-draggable [dragData]="10">
                    <div class="panel-body">dragData = 10</div>
                </div>
                <div class="panel panel-default" dnd-draggable [dragData]="30">
                    <div class="panel-body">dragData = 30</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <pre>allowDropFunction(baseInteger) {
    return (dragData) => dragData % baseInteger === 0;
}</pre>
        <div class="row">
            <div class="col-sm-6">
                <div dnd-droppable class="panel panel-info" [allowDrop]="allowDropFunction(box1Integer)">
                    <div class="panel-heading">
                        Multiples of
                        <input type="number" [(ngModel)]="box1Integer" style="width: 4em">
                        only
                    </div>
                    <div class="panel-body">
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div dnd-droppable class="panel panel-warning" [allowDrop]="allowDropFunction(box2Integer)">
                    <div class="panel-heading">
                        Multiples of
                        <input type="number" [(ngModel)]="box2Integer" style="width: 4em">
                        only
                    </div>
                    <div class="panel-body">
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {
    box1Integer: number = 3;
    box2Integer: number = 10;

    allowDropFunction(baseInteger): boolean {
        return (dragData) => dragData % baseInteger === 0;
    }
}
```

#### 7. Complex example (includes all shown above) with Drag-and-Drop
Here is an example of shopping backet with products adding via drag and drop operation:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h4>Shopping basket</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available products</div>
            <div class="panel-body">
                <div *ngFor="#product of availableProducts" class="panel panel-default"
                    dnd-draggable [dragEnabled]="product.quantity>0" [dragData]="product"
                    (onDragSuccess)="orderedProduct($event)" [dropZones]="['demo1']">
                    <div class="panel-body">
                        <div [hidden]="product.quantity===0">{{product.name}} - \${{product.cost}}
                        <br>(available: {{product.quantity}})</div>
                        <div [hidden]="product.quantity>0"><del>{{product.name}}</del>
                        <br>(NOT available)</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable (onDropSuccess)="addToBasket($event)" [dropZones]="['demo1']"
            class="panel panel-info">
            <div class="panel-heading">Shopping Basket<br>(to pay: \${{totalCost()}})</div>
            <div class="panel-body">
                <div *ngFor="#product of shoppingBasket" class="panel panel-default">
                    <div class="panel-body">
                    {{product.name}}<br>(ordered: {{product.quantity}}
                        <br>cost: \${{product.cost * product.quantity}})
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {

    availableProducts: Array<Product> = [];
    shoppingBasket: Array<Product> = [];

    constructor() {
        this.availableProducts.push(new Product("Blue Shoes", 3, 35));
        this.availableProducts.push(new Product("Good Jacket", 1, 90));
        this.availableProducts.push(new Product("Red Shirt", 5, 12));
        this.availableProducts.push(new Product("Blue Jeans", 4, 60));
     }

    orderedProduct(orderedProduct: Product) {
        orderedProduct.quantity--;
    }

    /**
     * The $event is a structure:
     * {
     *   dragData: any,
     *   mouseEvent: MouseEvent
     * }
     */
    addToBasket($event) {
        let newProduct: Product = $event.dragData;
        for (let indx in this.shoppingBasket) {
            let product:Product = this.shoppingBasket[indx];
            if (product.name === newProduct.name) {
                product.quantity++;
                return;
            }
        }
        this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
    }

    totalCost():number {
        let cost:number = 0;
        for (let indx in this.shoppingBasket) {
            let product:Product = this.shoppingBasket[indx];
            cost += (product.cost * product.quantity);
        }
        return cost;
    }
}
```

#### 8. Simple sortable with Drag-and-Drop
Here is an example of simple sortable of favorite drinks moving in container via drag and drop operation:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h4>Simple sortable</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">
                Favorite drinks
            </div>
            <div class="panel-body">
                <ul class="list-group" dnd-sortable-container [sortableData]="listOne">
                    <li *ngFor="#item of listOne; #i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-default">
            <div class="panel-body">
                My prefences:<br/>
                <span *ngFor="#item of listOne; #i = index">{{i + 1}}) {{item}}<br/></span>
            </div>
        </div>
    </div>
</div>`
})
export class AppComponent {
    listOne:Array<string> = ['Coffee','Orange Juice','Red Wine','Unhealty drink!','Water'];
}
```

#### 9. Multi list sortable with Drag-and-Drop
Here is an example of multi list sortable of boxers moving in container and between containers via drag and drop operation:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'app',
    template: `
<h4>Multi list sortable</h4>
  <div class="row">
    <div class="col-sm-3">
      <div class="panel panel-warning">
        <div class="panel-heading">
          Available boxers
        </div>
        <div class="panel-body" dnd-sortable-container [dropZones]="['boxers-zone']" [sortableData]="listBoxers">
          <ul class="list-group" >
            <li *ngFor="#item of listBoxers; #i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-success">
        <div class="panel-heading">
          First Team
        </div>
        <div class="panel-body" dnd-sortable-container [dropZones]="['boxers-zone']" [sortableData]="listTeamOne">
          <ul class="list-group" >
            <li *ngFor="#item of listTeamOne; #i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-3">
      <div class="panel panel-info">
        <div class="panel-heading">
          Second Team
        </div>
        <div class="panel-body" dnd-sortable-container [dropZones]="['boxers-zone']" [sortableData]="listTeamTwo">
          <ul class="list-group">
            <li *ngFor="#item of listTeamTwo; #i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>`
})
export class AppComponent {
    listBoxers:Array<string> = ['Sugar Ray Robinson','Muhammad Ali','George Foreman','Joe Frazier','Jake LaMotta','Joe Louis','Jack Dempsey','Rocky Marciano','Mike Tyson','Oscar De La Hoya'];
    listTeamOne:Array<string> = [];
    listTeamTwo:Array<string> = [];
}
```

# Credits
- [Francesco Cina](https://github.com/ufoscout)

# License
 [MIT](/LICENSE)
