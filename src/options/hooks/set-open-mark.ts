import { useAsyncEffect } from '../../common/hooks/async-effect';

export const useSetOpenMark = (): void => {
  useAsyncEffect(
    async () => {
      await chrome?.storage?.local
        .set({ hasOptionsPageBeenOpened: true })
        .catch(error => {
          console.error(error);
        });
    },
    () => {},
    []
  );
};
