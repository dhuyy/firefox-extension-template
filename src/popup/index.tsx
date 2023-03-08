import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Popup from './components/Popup';

import './index.css';

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <Popup />
  </StrictMode>
);
