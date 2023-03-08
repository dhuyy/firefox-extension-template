import type { DispatchState } from '../../common/types/react';
import type { Nullable } from '../../common/types/utils';
import { useAsyncEffect } from '../../common/hooks/async-effect';
import { useStorageLocalGet } from '../../common/utils/chrome-storage';

interface UseGetInitialValuesParams {
  setOS: DispatchState<Nullable<chrome.runtime.PlatformOs>>;
  setHasOptionsPageBeenOpened: DispatchState<boolean>;
}

export const useGetInitialValues = ({
  setOS,
  setHasOptionsPageBeenOpened,
}: UseGetInitialValuesParams): void => {
  useAsyncEffect(
    async () => {
      try {
        const { currentOS } =
          await useStorageLocalGet<chrome.runtime.PlatformOs>('currentOS');
        const { hasOptionsPageBeenOpened } = await useStorageLocalGet<boolean>(
          'hasOptionsPageBeenOpened'
        );

        setOS(currentOS ?? null);
        setHasOptionsPageBeenOpened(hasOptionsPageBeenOpened ?? false);
      } catch (error) {
        console.error(error);
      }
    },
    () => {},
    []
  );
};
