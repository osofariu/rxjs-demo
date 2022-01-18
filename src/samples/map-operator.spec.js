import { Subject } from 'rxjs';
import { multipleMaps, mapOperator } from './map-operator';

describe('Map Operator', () => {
  let subject;

  beforeEach(() => {
    subject = new Subject();
  });

  it('should get the largest value from array', done => {
    mapOperator(subject.asObservable()).subscribe(result => {
      expect(result).toEqual(5);
      done();
    });

    subject.next([1,2,3,4,5]);
  });

  it('should get names of each farm', done => {
    multipleMaps(subject.asObservable()).subscribe(result => {
      expect(result).toEqual(['Bob', 'Bill', 'Bryson']);
      done();
    });

    const pagedFarms = {
      pageNumber: 4,
      pageSize: 5,
      items: [
        {name: 'Bob'},
        {name: 'Bill'},
        {name: 'Bryson'},
      ]
    };
    subject.next(pagedFarms);
  });
});
