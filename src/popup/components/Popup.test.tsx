import React from 'react';
import { chrome } from 'jest-chrome';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { fnWithCallbackMock } from '../../../__tests__/utils';
import { Action } from '../../common/enums';

import Popup from './Popup';

describe('Popup component', () => {
  const tabs = [
    { id: 238213812, title: 'Google' },
    { id: 410310015, title: 'Microsoft Store' },
  ] as chrome.tabs.Tab[];

  const renderComponent = () => render(<Popup />);

  beforeEach(() => {
    chrome.tabs.query.mockImplementation(fnWithCallbackMock(tabs));
    chrome.tabs.sendMessage.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('retrieves currentOS from storage and renders it when component is mounted', async () => {
    const currentOS = 'mac';
    chrome.storage.local.get.mockImplementation(() =>
      Promise.resolve({ currentOS })
    );

    expect(screen.queryByText(currentOS)).toBeNull();

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(currentOS)).toBeInTheDocument();
    });
  });

  it.each`
    hasOptionsPageBeenOpened | text
    ${true}                  | ${'HAS ALREADY BEEN OPENED'}
    ${false}                 | ${'HAS NOT BEEN OPENED'}
  `(
    'renders $text when hasOptionsPageBeenOpened is $hasOptionsPageBeenOpened',
    async ({ hasOptionsPageBeenOpened, text }) => {
      chrome.storage.local.get.mockImplementation(() =>
        Promise.resolve({ hasOptionsPageBeenOpened })
      );

      renderComponent();

      await waitFor(() => {
        expect(screen.getByText(text)).toHaveTextContent(text);
      });
    }
  );

  it('renders bar when button to toggle the bar visibility is clicked', async () => {
    renderComponent();

    const button = screen.getByRole('button', {
      name: 'Toggle Bar',
    });
    await userEvent.click(button);

    expect(chrome.tabs.query).toHaveBeenCalledWith(
      {
        active: true,
        currentWindow: true,
      },
      expect.any(Function)
    );
    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(238213812, {
      action: Action.ToggleBarVisibility,
    });
  });
});
