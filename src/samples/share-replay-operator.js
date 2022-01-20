import {pluck, shareReplay} from "rxjs/operators";

export function publishLastUrl(source$) {
   return source$.pipe(
       pluck('url'),
       shareReplay(1)
   )
}
