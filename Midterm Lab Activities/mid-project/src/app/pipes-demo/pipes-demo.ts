import { AsyncPipe, CurrencyPipe, DatePipe, DecimalPipe, KeyValuePipe, LowerCasePipe, NgFor, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pipes-demo',
  imports: [DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, SlicePipe, AsyncPipe, DecimalPipe, KeyValuePipe, TitleCasePipe, PercentPipe, NgFor],
  templateUrl: './pipes-demo.html',
  template: `
  <div style="text-align:center">
    <h3>Decimal Pipe</h3>
    <p> {{decimalNum1 | number}} </p>
    <p> {{decimalNum2 | number}} </p>
  </div>
  `,
  styleUrl: './pipes-demo.css',
})

export class PipesDemo {
  presentDate = new Date();
  price = 2000;
  time$ = interval(1000)
  .pipe(map(val => new Date()));
  Fruits = ["Appe", " Orange", " Grapes", " Mango", " Kiwi", " Pomegranate"];

  decimalNum1: number = 8.7589623;
  decimalNum2: number = 5.43;

  // TitleCase Pipe
  userName: string = 'anne nichole alimurung';

  // Percent Pipe
  attendance: number = 0.85;

  // KeyValue Pipe
  student = {
    name: 'Anne',
    age: 21,
    course: 'BSIT'
  };
}
