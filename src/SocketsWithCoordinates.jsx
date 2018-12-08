import React, { Component } from 'react';
import { withLatestFrom } from 'rxjs/operators';

import { dataService } from './data-service';

export class SocketsWithCoordinates extends Component {
  state = {};

  componentDidMount() {
    dataService.socket$
      .pipe(withLatestFrom(dataService.coordinates$))
      .subscribe(this._onSocketsAndCoordinates);
  }

  render() {
    const { x, y, id } = this.state;
    return (
      <div>
        <span>
          Sockets First: {x} {y} {id}
        </span>
      </div>
    );
  }

  _onSocketsAndCoordinates = ([socket, coordinates]) => {
    this.setState({
      x: coordinates.x,
      y: coordinates.y,
      id: socket.id
    });
  };
}
