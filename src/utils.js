import amyrobson from './images/avatars/image-amyrobson.png';
import juliusomo from './images/avatars/image-juliusomo.png';
import maxblagun from './images/avatars/image-maxblagun.png';
import ramsesmiron from './images/avatars/image-ramsesmiron.png';

export const getAvatar = name => {
  switch (name) {
    case 'amyrobson':
      return amyrobson;
    case 'juliusomo':
      return juliusomo;
    case 'maxblagun':
      return maxblagun;
    case 'ramsesmiron':
      return ramsesmiron;
    default:
      return '';
  }
};