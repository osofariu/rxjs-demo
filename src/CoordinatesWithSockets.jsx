import React, { Component } from 'react';
import { withLatestFrom } from 'rxjs/operators';

import { dataService } from './data-service';

export class CoordinatesWithSockets extends Component {
  state = {};

  componentDidMount() {
    dataService.coordinates$
      .pipe(withLatestFrom(dataService.socket$))
      .subscribe(this._onSocketsAndCoordinates);
  }

  render() {
    const { x, y, id } = this.state;
    return (
      <div>
        <span>
          Coordinates First: {x} {y} {id}
        </span>
      </div>
    );
  }

  _onSocketsAndCoordinates = ([coordinates, socket]) => {
    this.setState({
      x: coordinates.x,
      y: coordinates.y,
      id: socket.id
    });
  };
}
