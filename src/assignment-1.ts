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

const fizzBuzz$ = interval(1000).pipe(
    map(n => n += 1)
);

export default fizzBuzz$;
