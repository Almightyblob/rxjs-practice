import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {FizzbuzzService} from "./services/fizzbuzz.service";
import {fromEvent, Observable, of, Subject} from "rxjs";
import {mapTo, merge, switchMap, distinctUntilChanged, tap} from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'fizzbuzz';

  fizzBuzz$: Observable<string | number>;
  result$ = new Subject()
  points$: Observable<number>;
  fails$: Observable<number>;

  @ViewChild('fizz', {static: true}) fizzButton: ElementRef;
  @ViewChild('buzz', {static: true}) buzzButton: ElementRef
  @ViewChild('fizzBuzz', {static: true}) fizzBuzzButton: ElementRef

  checkTrue(value) {
    const fizzValue = this.fizzbuzzService.fizzStream$.getValue()
        if ((value == fizzValue && typeof fizzValue == 'string')) {
            this.result$.next(true)
        } else if ((value !== fizzValue && typeof fizzValue == 'string')) {
          console.log('wrong')
            this.result$.next(false)
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
    const fizzBet$ = fromEvent(this.fizzButton.nativeElement, 'click')

    const buzzBet$ = fromEvent(this.buzzButton.nativeElement, 'click')

    const fizzBuzzBet$ = fromEvent(this.fizzBuzzButton.nativeElement, 'click')

    const userInput$ = of().pipe(merge(
        fizzBet$.pipe(mapTo('Fizz')),
        buzzBet$.pipe(mapTo('Buzz')),
        fizzBuzzBet$.pipe(mapTo('FizzBuzz'))),
        distinctUntilChanged(),
    )

    const inputPerInterval$ = this.fizzbuzzService.fizzBuzz$.pipe(switchMap(x => userInput$),
        tap(value => this.checkTrue(value))).subscribe(console.log)
  }

  isNumber(val): boolean { return typeof val === 'number'; }

}
