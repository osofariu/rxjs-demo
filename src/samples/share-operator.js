import {map, share} from "rxjs/operators";
import {timer} from "rxjs";
import {ajax} from "rxjs/ajax";

export function shareOperator() {
    return timer(1).pipe(
        map(() => ajax.getJSON('literally-anything')),
        share());
}
