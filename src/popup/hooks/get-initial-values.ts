import type { DispatchState } from '../../common/types/react';
import type { Nullable } from '../../common/types/utils';
import { useAsyncEffect } from '../../common/hooks/async-effect';

interface UseGetInitialValuesParams {
  setOS: DispatchState<Nullable<string>>;
  setHasOptionsPageBeenOpened: DispatchState<boolean>;
}

export const useGetInitialValues = ({
  setOS,
  setHasOptionsPageBeenOpened,
}: UseGetInitialValuesParams): void => {
  useAsyncEffect(
    async () => {
      try {
        const { currentOS } = await browser?.storage?.local.get('currentOS');
        const { hasOptionsPageBeenOpened } = await browser?.storage?.local.get(
          'hasOptionsPageBeenOpened'
        );

        setOS((currentOS as string) ?? null);
        setHasOptionsPageBeenOpened(
          (hasOptionsPageBeenOpened as boolean) ?? false
        );
      } catch (error) {
        console.error(error);
      }
    },
    () => {},
    []
  );
};
