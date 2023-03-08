import { prependBarElement, toggleBarVisibility } from './scripts/bar';
import { Action } from '../common/enums';

interface OnMessageParams {
  action: Action;
}

prependBarElement();

chrome.runtime.onMessage.addListener(({ action }: OnMessageParams) => {
  switch (action) {
    case Action.ToggleBarVisibility:
      toggleBarVisibility();
      break;
  }

  // https://stackoverflow.com/a/56483156
  return true;
});
