import React, { Component } from 'react';

import { dataService, STATES } from './data-service';

export class Actions extends Component {
  state = {};

  componentDidMount() {
    dataService.status$.subscribe(this._onStatusChange);
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <span>Status: {status}</span>
        <button disabled={status === STATES.STOPPED} onClick={this._onStop}>
          Stop
        </button>
        <button disabled={status === STATES.STARTED} onClick={this._onStart}>
          Start
        </button>
      </div>
    );
  }

  _onStop = () => {
    dataService.stop();
  };

  _onStart = () => {
    dataService.start();
  };

  _onStatusChange = status => {
    this.setState({ status });
  };
}
