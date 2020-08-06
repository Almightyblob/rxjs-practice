import {BehaviorSubject, combineLatest, interval, Observable, of, Subject, zip} from "rxjs";
import {concatMap, map, take, tap} from "rxjs/operators";

export class FizzbuzzService {

    fizzStream$ = new BehaviorSubject<string | number>('');
    fizzBuzz$ = this.fizzStream$.asObservable();
    result$ = new BehaviorSubject<boolean>(null);
    points$ = new BehaviorSubject<number>(0)
    points = 0;
    fails$ = 0;

    numbers$: Observable<number> = interval(2000).pipe(
        map(n => n += 1),
        tap(n => this.result$.next(false))
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

     checkTrue(arr) {
        if (arr[0] == arr[1]) {
            this.points++
            console.log("CHECK")
            this.points$.next(this.points)
            return true
        } else {
            return false
        }
     }

     checkFizz(fizzOrBuzz) {
        const bet = of(fizzOrBuzz)
        combineLatest([this.fizzBuzz$, bet]).pipe(
            take(1)
        ).subscribe( result => this.result$.next(this.checkTrue(result)))


     }
}
