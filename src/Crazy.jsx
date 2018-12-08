import React, { Component } from 'react';
import { combineLatest } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';

import { dataService } from './data-service';

const COLORS = {
  a: '#000000',
  e: '#333333',
  i: '#666666',
  o: '#999999',
  u: '#cccccc'
};

export class Crazy extends Component {
  state = {};

  componentDidMount() {
    combineLatest(
      dataService.coordinates$,
      dataService.keys$,
      dataService.socket$
    )
      .pipe(
        filter(([coordinates, key, socket]) => 'aeiou'.includes(key)), // Only push values to the map if the key is 'aeiou'
        map(([coordinates, key, socket]) => ({
          ...coordinates, // Map coordinates, key, id to one object
          ...socket,
          key
        })),
        takeUntil(dataService.keys$.pipe(filter(key => key === 'q'))) // This will prevent this observable from receiving values once the 'q' key is pressed
      )
      .subscribe(this._onMatch);
  }

  render() {
    const { height, width, key, id } = this.state;
    console.log(`KEY: ${key}`);
    console.log(`COLOR: ${COLORS[key]}`);
    return (
      <div style={{ height, width, backgroundColor: COLORS[key] }}>
        <span>{id}</span>
      </div>
    );
  }

  _onMatch = ({ x, y, key, id }) => {
    this.setState({
      height: x,
      width: y,
      key,
      id
    });
  };
}
