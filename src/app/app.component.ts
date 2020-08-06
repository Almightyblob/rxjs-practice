import {Component, OnInit} from '@angular/core';

import {FizzbuzzService} from "./services/fizzbuzz.service";
import {Observable} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fizzbuzz';

  fizzbuzz$: Observable<string | number>;
  result$: Observable<boolean>;
  points$: Observable<number>;

  constructor(private fizzbuzzService: FizzbuzzService) {
  }

  ngOnInit() {
    this.fizzbuzz$ = this.fizzbuzzService.fizzBuzz$
    this.result$ = this.fizzbuzzService.result$
    this.points$ = this.fizzbuzzService.points$
    this.fizzbuzzService.fizzBuzz()
  }

  isNumber(val): boolean { return typeof val === 'number'; }

  checkFizz(){
    this.fizzbuzzService.checkFizz('Fizz')
  }

  checkBuzz(){
    this.fizzbuzzService.checkFizz('Buzz')
  }

  checkFizzBuzz(){
    this.fizzbuzzService.checkFizz('FizzBuzz')
  }

}
