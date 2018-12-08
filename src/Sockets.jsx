import React, { Component } from 'react';

import { dataService } from './data-service';

export class Sockets extends Component {
  state = {};

  componentDidMount() {
    dataService.socket$.subscribe(this._onSocket);
  }

  render() {
    const { id } = this.state;
    return (
      <div>
        <span>{id}</span>
      </div>
    );
  }

  _onSocket = ({ id }) => {
    this.setState({ id });
  };
}
