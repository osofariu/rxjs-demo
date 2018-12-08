import React, { Component } from 'react';

import { dataService } from './data-service';

export class Quadrant extends Component {
  state = {};

  componentDidMount() {
    dataService.quadrant$.subscribe(this._onQuadrantChange);
  }

  render() {
    const { quadrant } = this.state;
    return (
      <div>
        <span>Quadrant: {quadrant}</span>
      </div>
    );
  }

  _onQuadrantChange = quadrant => {
    this.setState({ quadrant });
  };
}
