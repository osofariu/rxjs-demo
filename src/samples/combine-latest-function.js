import {combineLatest, of} from "rxjs";
import {map} from "rxjs/operators";

export function selectedEntity(selectedId$, entities$) {
    return combineLatest([selectedId$, entities$]).pipe(map((([id, entities]) => {
        return entities.find(entity => entity.id === id);
    })));
}
