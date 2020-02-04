import { Subject } from 'rxjs';
import { logElements } from './tap-operator';

describe('Tap Operator', () => {
  let source;

  beforeEach(() => {
    source = new Subject();
  });

  it('should perform side effect without effecting stream', done => {
    spyOn(console, 'log');

    logElements(source.asObservable()).subscribe(result => {
      expect(result).toEqual({ id: 54 });
      expect(console.log).toHaveBeenCalledWith(`Element: ${JSON.stringify({id: 54})}`);
      done();
    });

    source.next({id: 54});
  });
});
