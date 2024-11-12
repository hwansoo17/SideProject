import config from '../../config';

export const getSrcFromStorage = (path: string) => {
  return `${config.STORAGE_URL}${path}`;
};
