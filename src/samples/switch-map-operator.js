import {ajax} from "rxjs/ajax";
import {catchError, switchMap} from "rxjs/operators";
import {of} from "rxjs";

export function ajaxSwitchMap(source$) {
  return source$.pipe(
      switchMap((v) => ajax.getJSON('https://fake-numberizer.io/' + v)
          .pipe(catchError(_ => of('this is bad'))))
  );
}
