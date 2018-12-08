import React, { Component } from 'react';

import { dataService } from './data-service';

export class Keys extends Component {
  state = {};

  componentDidMount() {
    dataService.keys$.subscribe(this._onKey);
  }

  render() {
    const { key } = this.state;
    return (
      <div>
        <span>Key: {key}</span>
      </div>
    );
  }
  _onKey = key => {
    this.setState({ key });
  };
}
