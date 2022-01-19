import {Observable} from "rxjs";

export class MemoryLeak {

  get id() {
    return this._id;
  }

  constructor(source$) {
    this._id = null;
    this._subscription = source$.subscribe(id => this._id = id);
  }

  unsubscribe() {
    this._subscription.unsubscribe();
  }
}
