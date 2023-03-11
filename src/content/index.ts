import { prependBarElement, toggleBarVisibility } from './scripts/bar';
import { Action } from '../common/enums';

interface OnMessageParams {
  action: Action;
}

prependBarElement();

browser.runtime.onMessage.addListener(({ action }: OnMessageParams) => {
  switch (action) {
    case Action.ToggleBarVisibility:
      toggleBarVisibility();
      break;
  }
});
