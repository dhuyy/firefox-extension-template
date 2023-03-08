import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Options from './components/Options';

import './index.css';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Options />
  </StrictMode>
);
