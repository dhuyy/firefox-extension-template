export const fnWithCallbackMock =
  (p: unknown) => (_: unknown, callback: (p: unknown) => void) => {
    callback(p);
  };
