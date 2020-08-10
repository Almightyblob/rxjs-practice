import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {FizzbuzzService} from "./services/fizzbuzz.service";
import {fromEvent, Observable, of} from "rxjs";
import {mapTo, merge, switchMap, distinctUntilChanged, tap} from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'fizzbuzz';

  fizzBuzz$: Observable<string | number>;
  result$: Observable<boolean>;
  points$: Observable<number>;
  fails$: Observable<number>;

  @ViewChild('fizz', {static: true}) fizzButton: ElementRef;
  @ViewChild('buzz', {static: true}) buzzButton: ElementRef
  @ViewChild('fizzBuzz', {static: true}) fizzBuzzButton: ElementRef

  checkTrue(value) {
    const fizzValue = this.fizzbuzzService.fizzStream$.getValue()
        if ((value == fizzValue && typeof fizzValue == 'string')) {
          console.log('correct')
            return true;
        } else if ((value !== fizzValue && typeof fizzValue == 'string')) {
          console.log('wrong')
            return false;
        } else {
            return
        }
    }

  constructor(private fizzbuzzService: FizzbuzzService) {
  }

  ngOnInit() {
    this.fizzBuzz$ = this.fizzbuzzService.fizzBuzz$
    this.fizzbuzzService.fizzBuzz();
  }

  ngAfterViewInit() {
    console.log(this.fizzButton)
    const fizz = fromEvent(this.fizzButton.nativeElement, 'click')

    const buzz = fromEvent(this.buzzButton.nativeElement, 'click')

    const fizzBuzz = fromEvent(this.fizzBuzzButton.nativeElement, 'click')

    const userInput = of().pipe(merge(
        fizz.pipe(mapTo('Fizz')),
        buzz.pipe(mapTo('Buzz')),
        fizzBuzz.pipe(mapTo('FizzBuzz'))),
        distinctUntilChanged()
    )

    const compare = this.fizzbuzzService.fizzBuzz$.pipe(switchMap(x => userInput),
        tap(value => this.checkTrue(value))).subscribe(console.log)
  }

  isNumber(val): boolean { return typeof val === 'number'; }

}
