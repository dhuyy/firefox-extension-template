/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect } from 'react';

export const useAsyncEffect = <V>(
  effect: (isMounted: () => boolean) => V | Promise<V>,
  destroy?: (result?: V) => void,
  inputs?: any[]
): void => {
  const hasDestroy = typeof destroy === 'function';

  useEffect(
    () => {
      let result: V;
      let mounted = true;
      const maybePromise = effect(function () {
        return mounted;
      });

      Promise.resolve(maybePromise).then(function (value) {
        result = value;
      });

      return function () {
        mounted = false;

        if (hasDestroy) {
          destroy(result);
        }
      };
    },
    hasDestroy ? inputs : destroy
  );
};
