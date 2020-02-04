import { Subject, tap } from 'rxjs';
import { selectedEntity } from './combine-latest-function';


describe('Combine Latest Operator', () => {
  let entities;
  let selectedId;

  beforeEach(() => {
    entities = new Subject();
    selectedId = new Subject();
  });

  it('should return selected entity', done => {
    selectedEntity(selectedId.asObservable(), entities.asObservable())
      .subscribe((entity) => {
        expect(entity).toEqual({ id: 65, name: 'Jack' });
        done();
      });

    selectedId.next(65);
    entities.next([{ id: 44, name: 'Sue' }, { id: 65, name: 'Jack' }, { id: 55, name: 'Jim' }]);
  });
});
