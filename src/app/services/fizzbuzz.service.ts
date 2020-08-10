import {BehaviorSubject, combineLatest, interval, Observable, zip} from "rxjs";
import {map, tap} from "rxjs/operators";

export class FizzbuzzService {

    fizzStream$ = new BehaviorSubject<string | number>('');
    fizzBuzz$ = this.fizzStream$.asObservable();
    bet$ = new BehaviorSubject<string>('')
    comparedValues$ = new BehaviorSubject<[string | number, string]>([null, null])
    result$ = new BehaviorSubject<boolean>(null);
    points$ = new BehaviorSubject<number>(0)
    points = 0;
    fails$ = new BehaviorSubject<number>(0)
    fails = 0;

    numbers$: Observable<number> = interval(2000).pipe(
        map(n => n += 1),
        tap(n => this.result$.next(null))
    );

    fizz$: Observable<string> = this.numbers$.pipe(
        map(n => (n % 3 === 0) ? "Fizz" : null)
    )

    buzz$: Observable<string> = this.numbers$.pipe(
        map(n => (n % 5 === 0) ? "Buzz" : null)
    )

     fizzBuzz() { zip<[string, string, number]>(
        this.fizz$, this.buzz$, this.numbers$
    ).pipe(
        map( arr => (arr.slice(0,2).some(Boolean)) ?
            arr.slice(0, -1).join('') : +arr.join((''))
        )
    ).subscribe( fb => this.fizzStream$.next(fb))
     }

    betVScurrent$ = combineLatest([this.fizzBuzz$, this.bet$])
        .subscribe( result => this.comparedValues$.next(result))

     checkTrue(arr) {
        if ((arr[0] === arr[1] && typeof arr[0] == 'string')) {
            this.points++;
            this.points$.next(this.points);
            return true;
        } else if ((arr[0] !== arr[1] && typeof arr[0] == 'string')){
            this.fails++;
            this.fails$.next(this.fails);
            return false;
        } else {
            return
        }
     }

     checkFizz(fizzOrBuzz) {
        this.bet$.next(fizzOrBuzz)
         console.log(this.comparedValues$)
         this.checkTrue(this.comparedValues$.getValue())
     }
}
