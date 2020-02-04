export class MemoryLeak {
  get id() {
    return this._id;
  }

  constructor(source$) {
    this._id = null;

    source$.subscribe(id => this._id = id);
  }

  unsubscribe() {

  }
}
