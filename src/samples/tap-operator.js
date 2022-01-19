import {tap} from "rxjs/operators";

export function logElements(source$) {
  return source$.pipe(
      tap(o => console.log('Element: ' + JSON.stringify(o)))
  );
}
