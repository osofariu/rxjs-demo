import React, { Component } from 'react';

import { dataService } from './data-service';

export class Raven extends Component {
  state = { people: [] };

  componentDidMount() {
    dataService.raven$.subscribe(this._onRavenData);
  }

  render() {
    const { people } = this.state;

    return (
      <div>
        <div style={tableStyle}>
          <span style={headerStyle} className="one">
            Id
          </span>
          <span style={headerStyle} className="two">
            First Name
          </span>
          <span style={headerStyle} className="three">
            Last Name
          </span>
        </div>
        {people.map(person => (
          <div key={person.id} style={tableStyle}>
            <span className="one">{person.id}</span>
            <span className="two">{person.firstName}</span>
            <span className="three">{person.lastName}</span>
          </div>
        ))}
      </div>
    );
  }

  _onRavenData = person => {
    const { people } = this.state;
    this.setState({ people: [...people, person] });
  };
}

const headerStyle = {
  fontWeight: 'bold',
  fontSize: 16
};

const tableStyle = {
  display: 'grid',
  gridTemplateAreas: 'one two three',
  gridTemplateColumns: '33% 33% 33%',
  gridTemplateRows: '32px',
  whiteSpace: 'nowrap'
};
