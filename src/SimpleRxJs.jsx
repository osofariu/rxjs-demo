import React, { Component } from 'react';

import { dataService } from './data-service';

export class SimpleRxJs extends Component {
  state = {};

  componentDidMount() {
    dataService.simple$.subscribe(this._onSimple);
  }

  render() {
    return (
      <div>
        <span>Simple RxJS: {JSON.stringify(this.state)}</span>
      </div>
    );
  }

  _onSimple = ({ x, y }) => {
    this.setState({ x, y });
  };
}
