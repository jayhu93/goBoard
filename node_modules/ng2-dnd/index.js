// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
import { NgModule } from "@angular/core";
import { DragDropConfig } from './src/dnd.config';
import { DragDropService, DragDropSortableService, dragDropServiceFactory, dragDropSortableServiceFactory } from './src/dnd.service';
import { DraggableComponent } from './src/draggable.component';
import { DroppableComponent } from './src/droppable.component';
import { SortableContainer, SortableComponent } from './src/sortable.component';
export * from './src/abstract.component';
export * from './src/dnd.config';
export * from './src/dnd.service';
export * from './src/draggable.component';
export * from './src/droppable.component';
export * from './src/sortable.component';
export var providers = [
    DragDropConfig,
    { provide: DragDropService, useFactory: dragDropServiceFactory },
    { provide: DragDropSortableService, useFactory: dragDropSortableServiceFactory, deps: [DragDropConfig] }
];
export var DndModule = (function () {
    function DndModule() {
    }
    DndModule.forRoot = function () {
        return {
            ngModule: DndModule,
            providers: providers
        };
    };
    DndModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent],
                    exports: [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent],
                },] },
    ];
    /** @nocollapse */
    DndModule.ctorParameters = function () { return []; };
    return DndModule;
}());
