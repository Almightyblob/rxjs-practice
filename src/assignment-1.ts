import { zip, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* 
    Using the operators imported above build a script that will
    play FizzBuzz https://rosettacode.org/wiki/FizzBuzz
    Use interval to create a stream of numbers, if the number is 
    a multiple of 3, print 'Fizz' instead, if it is a multiple of 
    5, print 'Buzz' and if it is a multiple of both, print 'FizzBuzz'.
    Otherwise just print the number

    Example Output:
    1
    2
    Fizz
    4
    Buzz
    Fizz
    7
    8
    Fizz
    Buzz
    11
    Fizz
    13
    14
    FizzBuzz
*/

const numbers$: Observable<number> = interval(1000).pipe(
    map(n => n += 1),
);

const fizz$: Observable<string> = numbers$.pipe(
    map(n => (n % 3 === 0) ? "Fizz" : null)
)

const buzz$: Observable<string> = numbers$.pipe(
    map(n => (n % 5 === 0) ? "Buzz" : null)
)

const fizzBuzz$ = zip<[string, string, number]>(
     fizz$, buzz$, numbers$
).pipe(
    map( arr => {
        if ( typeof arr[0] == 'string'  || typeof arr[1] == 'string' ) {
            return arr.slice(0, -1).join('')
        }
        else {
            return arr.join('')
        }
    })
)

export default fizzBuzz$;
