import React from 'react';

import { SimpleRxJs } from './SimpleRxJs';
import { Coordinates } from './Coordinates';
import { Sockets } from './Sockets';
import { SocketsWithCoordinates } from './SocketsWithCoordinates';
import { CoordinatesWithSockets } from './CoordinatesWithSockets';
import { Actions } from './Actions';
import { Quadrant } from './Quadrant';
import { Keys } from './Keys';
import { Crazy } from './Crazy';
import { Raven } from './Raven';

export const App = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '20% 80%',
      gridTemplateRows: '100%',
      gridTemplateAreas: 'one two',
      gridColumnGap: '10px'
    }}
  >
    <div className="one" style={{ display: 'grid', gridAutoRows: '44px' }}>
      <SimpleRxJs />

      <Coordinates />
      <CoordinatesWithSockets />

      <Sockets />
      <SocketsWithCoordinates />

      <Keys />
      <Quadrant />

      <Crazy />
      <Actions />
    </div>

    <div className="two">
      <Raven />
    </div>
  </div>
);
