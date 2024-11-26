import config from '../../config';
import { palette } from '../styles/styles';

export const getSrcFromStorage = (path: string) => {
  return `${config.STORAGE_URL}${path}`;
};

export const getRandomColor = () => {
  const colors = Object.values(palette);
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};