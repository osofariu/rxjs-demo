import React, { Component } from 'react';

import { dataService } from './data-service';

export class Coordinates extends Component {
  state = {};

  componentDidMount() {
    dataService.coordinates$.subscribe(this._onCoordinates);
  }

  render() {
    const { x, y } = this.state;
    return (
      <div>
        <span>X: {x}</span>
        <span>Y: {y}</span>
      </div>
    );
  }

  _onCoordinates = ({ x, y }) => {
    this.setState({ x, y });
  };
}
