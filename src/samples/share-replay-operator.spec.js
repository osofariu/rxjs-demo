import { Subject } from 'rxjs';
import { pluck, share, shareReplay, tap } from 'rxjs/operators';
import {publishLastUrl} from "./share-replay-operator";

describe('shareReplay operator', function () {

    it('publishes last url to late subscriber', done => {
        const routeEnd = new Subject();

        const lastUrl = publishLastUrl(routeEnd)

        lastUrl.subscribe(url => { });

        routeEnd.next({data: {}, url: 'my-path'});

        lastUrl.subscribe(url => {
            expect(url).toEqual('my-path')
            done()
        });
    })
});
