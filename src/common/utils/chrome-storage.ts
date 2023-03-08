export const useStorageLocalGet = async <T>(
  key: string
): Promise<Record<string, T | undefined>> =>
  await chrome?.storage?.local.get(key);
