import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';

localStorage.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOiI2MWM2MWYwZWU5NDcyOTMzYTY3ODVlZmEiLCJsb2dpbiI6Imxlc2hhIiwiYWNsIjpbIjYxYzYxZjBlZTk0NzI5MzNhNjc4NWVmYSIsInVzZXIiXX0sImlhdCI6MTY0MDM3NDY3Mn0.51jdHqISRb19LqMYoEmlnLKWXi76r8b9nYwl2j4YLfg';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
