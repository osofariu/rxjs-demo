import {combineLatest, of} from "rxjs";
import {map} from "rxjs/operators";

export function selectedEntity(selectedId$, entities$) {
    combineLatest(selectedId$, entities$).subscribe((id => {console.log(id)}))
}
