import {combineLatest, Subject} from "rxjs";
import {ajax} from "rxjs/ajax";
import {shareOperator} from "./share-operator";

describe('Share Operator', () => {
    it('should only make the ajax call once', done => {
        const expectedValue = 45;
        spyOn(ajax, 'getJSON').and.returnValue(expectedValue);

        const observable = shareOperator()

        combineLatest([observable, observable]).subscribe(result => {
            expect(ajax.getJSON).toHaveBeenCalledTimes(1);
            expect(result).toEqual([expectedValue, expectedValue]);
            done();
        });
    });
});
