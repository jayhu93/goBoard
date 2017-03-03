import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})

export class ReversePipe {
  transform(value) {
    return value.slice().reverse();
  }
}