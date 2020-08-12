import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {FizzbuzzService} from "./services/fizzbuzz.service";
import {combineLatest, fromEvent, interval, Observable, of, Subject} from "rxjs";
import {
  mapTo,
  merge,
  switchMap,
  distinctUntilChanged,
  tap,
  mergeMap,
  map,
  take,
  share,
  delay,
  filter, scan
} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'fizzbuzz';

  fizzBuzz$: Observable<string | number>;
  result$
  points$: Observable<number>;
  fails$: Observable<number>;

  @ViewChild('fizz', {static: true}) fizzButton: ElementRef;
  @ViewChild('buzz', {static: true}) buzzButton: ElementRef
  @ViewChild('fizzBuzz', {static: true}) fizzBuzzButton: ElementRef

  constructor(private fizzbuzzService: FizzbuzzService) {
  }

  ngOnInit() {
    this.fizzBuzz$ = this.fizzbuzzService.fizzBuzz$
    this.fizzbuzzService.startFizz();
  }

  ngAfterViewInit() {
    console.log(this.fizzButton)
    const fizzBet$ = fromEvent(this.fizzButton.nativeElement, 'click')

    const buzzBet$ = fromEvent(this.buzzButton.nativeElement, 'click')

    const fizzBuzzBet$ = fromEvent(this.fizzBuzzButton.nativeElement, 'click')

    const userInput$ = of().pipe(merge(
        fizzBet$.pipe(mapTo('Fizz')),
        buzzBet$.pipe(mapTo('Buzz')),
        fizzBuzzBet$.pipe(mapTo('FizzBuzz')),
        interval(1950).pipe(mapTo('None'))),
        distinctUntilChanged()
    )

    this.result$ = this.fizzBuzz$
        .pipe(
            switchMap(currentFizz => userInput$.pipe(
                map( input => {
                  if (typeof currentFizz == 'number' || input == 'None'){
                    return null
                  } else if (currentFizz == input) {
                    return true
                  } else if (currentFizz != input) {
                    return false
                  }
                })
            ))
        )

    const points:Observable<number> = this.result$.pipe(
        filter(result => result === true),
        mapTo(1)
    )

    const fails:Observable<number> = this.result$.pipe(
        filter(result => result === false),
        mapTo(1)
    )

    this.points$ = points.pipe(scan((acc, one) => acc + one, 0));
    this.fails$ = fails.pipe(scan((acc, one) => acc + one, 0));


  }

  isNumber(val): boolean { return typeof val === 'number'; }

}
