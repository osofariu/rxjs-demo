import { Subject } from 'rxjs';
import { MemoryLeak } from './memory-leak';

describe('Unsubscribe is important', () => {
  let source, memoryLeak;

  beforeEach(() => {
    source = new Subject();
    memoryLeak = new MemoryLeak(source.asObservable());
  });

  it('should always unsubscribe', done => {
    source.subscribe(() => {
      expect(memoryLeak.id).toEqual(54);
      done();
    });

    source.next(54);
    memoryLeak.unsubscribe();
    source.next(65);
  });
});
