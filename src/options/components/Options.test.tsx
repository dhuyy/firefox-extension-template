import React from 'react';
import { chrome } from 'jest-chrome';
import { render } from '@testing-library/react';

import Options from './Options';

describe('Options component', () => {
  const renderComponent = () => render(<Options />);

  it('sets hasOptionsPageBeenOpened property into local storage when component is mounted', async () => {
    chrome.storage.local.set.mockImplementation(() => Promise.resolve());

    expect(chrome.storage.local.set).toHaveBeenCalledTimes(0);

    renderComponent();

    expect(chrome.storage.local.set).toHaveBeenCalledWith({
      hasOptionsPageBeenOpened: true,
    });
  });
});
