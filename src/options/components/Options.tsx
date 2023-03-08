import React from 'react';

import { useSetOpenMark } from '../hooks/set-open-mark';

import './Options.css';

const Options = (): JSX.Element => {
  useSetOpenMark();

  return (
    <div className="container">
      <h2>Firefox Extension - Options page</h2>
    </div>
  );
};

export default Options;
