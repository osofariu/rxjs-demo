import {tap} from "rxjs";

export function logElements(source$) {
  console.log("************************************ foo")
  return source$.pipe(tap((o) => console.log(o)));
}
