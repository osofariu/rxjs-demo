import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import io from 'socket.io-client';

export const STATES = {
  STARTED: 'STARTED',
  STOPPED: 'STOPPED'
};

class DataService {
  get mouse$() {
    return this._mouse$.asObservable();
  }

  get keys$() {
    return this._keys$.asObservable();
  }

  get coordinates$() {
    return this.mouse$.pipe(map(evt => ({ x: evt.x, y: evt.y })));
  }

  get quadrant$() {
    return this.coordinates$.pipe(
      map(({ x, y }) => {
        const { innerHeight, innerWidth } = window;
        const vertical = y < innerHeight / 2 ? 'TOP' : 'BOTTOM';
        const horizontal = x < innerWidth / 2 ? 'LEFT' : 'RIGHT';
        return `${vertical}_${horizontal}`;
      })
    );
  }

  get socket$() {
    return this._socket$.asObservable();
  }

  get status$() {
    return this._status$.asObservable();
  }

  constructor() {
    this._mouse$ = new Subject();
    this._socket$ = new Subject();
    this._keys$ = new Subject();
    this._status$ = new BehaviorSubject(null);
  }

  start() {
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('keypress', this._onKeyPress);
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('data', this._onSocketData);
    this._coordinatesSubscription = this.coordinates$.subscribe(
      this._sendToServer
    );
    this._status$.next(STATES.STARTED);
  }

  stop() {
    this._coordinatesSubscription.unsubscribe();
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('keypress', this._onKeyPress);
    this.socket.disconnect();
    this._status$.next(STATES.STOPPED);
  }

  _onMouseMove = evt => {
    this._mouse$.next(evt);
  };

  _onKeyPress = evt => {
    this._keys$.next(evt.key);
  };

  _onSocketData = data => {
    this._socket$.next(data);
  };

  _sendToServer = coordinates => {
    this.socket.emit('coordinates', coordinates);
  };
}

export const dataService = new DataService();
dataService.start();
