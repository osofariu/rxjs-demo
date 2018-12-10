export class SimpleObservable {
  constructor() {
    this._observers = [];
  }

  subscribe = observer => {
    this._observers.push(observer);
  };

  onNext = data => {
    this._observers.forEach(o => o(data));
  };
}

export class SimpleSubject {
  constructor() {
    this._observable = new SimpleObservable();
  }

  next = data => {
    this._observable.onNext(data);
  };

  asObservable = () => this._observable;
}
