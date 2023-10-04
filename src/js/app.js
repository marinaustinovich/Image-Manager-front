import Gallery from './Modern-Image-Manager/Gallery';

const url = 'http://localhost:3000/';
const gallery = new Gallery(url);
gallery.bindToDOM(document.querySelector('.gallery-container'));
