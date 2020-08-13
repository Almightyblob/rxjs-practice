import {interval, Observable, Subscription, zip} from "rxjs";
import {map, share} from "rxjs/operators";


export class FizzbuzzService {



    numbers$: Observable<number> = interval(2000).pipe(
        map(n => n += 1),
    );

    fizz$: Observable<'Fizz'> = this.numbers$.pipe(
        map(n => (n % 3 === 0) ? "Fizz" : null)
    )

    buzz$: Observable<'Buzz'> = this.numbers$.pipe(
        map(n => (n % 5 === 0) ? "Buzz" : null)
    )
    fizzBuzz$ = zip<[string, string, number]>(
                this.fizz$, this.buzz$, this.numbers$
                )
                .pipe(
                    map(arr => (arr.slice(0, 2).some(Boolean)) ?
                        arr.slice(0, -1).join('') : +arr.join((''))
                ),
                    share()
                )



}

