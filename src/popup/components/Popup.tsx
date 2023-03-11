import React, { useState } from 'react';

import type { Nullable } from '../../common/types/utils';
import { Action } from '../../common/enums';
import logo from '../../common/images/logo.png';
import { useGetInitialValues } from '../hooks/get-initial-values';

import './Popup.css';

const Popup = (): JSX.Element => {
  const [os, setOS] = useState<Nullable<string>>(null);
  const [hasOptionsPageBeenOpened, setHasOptionsPageBeenOpened] =
    useState(false);

  useGetInitialValues({ setOS, setHasOptionsPageBeenOpened });

  const handleToggleBarClick = async (): Promise<void> => {
    try {
      const tabs = await browser?.tabs?.query({
        active: true,
        currentWindow: true,
      });

      const tabId = tabs[0].id ?? 0;

      await browser?.tabs?.sendMessage(tabId, {
        action: Action.ToggleBarVisibility,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <img src={logo} alt="Logo" />
      <button onClick={handleToggleBarClick}>Toggle Bar</button>
      {os !== null && (
        <>
          <p className="small">
            <b>Current OS: </b>
            {os}
          </p>
        </>
      )}
      {hasOptionsPageBeenOpened ? (
        <p className="small">
          <b>Options page:</b> HAS ALREADY BEEN OPENED
        </p>
      ) : (
        <p className="small">
          <b>Options page:</b> HAS NOT BEEN OPENED
        </p>
      )}
    </div>
  );
};

export default Popup;
