import { map } from 'rxjs/operators';

export function mapOperator(externalData$) {
  return externalData$.pipe(map(array => (Math.max(...array))))
}

export function multipleMaps(externalData$) {
  return externalData$.pipe(
      map(farms => farms.items),
      map(items => { return items.map(item => item.name) })
  )
}
