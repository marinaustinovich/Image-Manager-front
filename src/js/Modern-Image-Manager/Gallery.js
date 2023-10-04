import ImageBlock from './ImageBlock/ImageBlock';
import getImageList from './fetch/getImageList';
import addImage from './fetch/addImage';
import deleteImage from './fetch/deleteImage';
import './gallery.css';

export default class Gallery {
  constructor(url) {
    this.container = null;
    this.images = [];
    this.list = null;
    this.previewImage = null;
    this.url = url;
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;

    this.drawUi();
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('Gallery not bind to DOM');
    }
  }

  async drawUi() {
    this.checkBinding();
    this.container.innerHTML = `
      <div class="gallery-field">
        <input data-id="file" class="overlapped" type="file" accept="image/*">
        <div data-id="overlap" class="title overlap">Drag and Drop files here or Click to select</div>
      </div>
      <div class="gallery-list"></div>
      <div class='error hidden'>It's no Picture!</div>
      `;
    this.list = this.container.querySelector('.gallery-list');
    this.fileInput = this.container.querySelector('[data-id=file]');
    this.galleryFieldEl = this.container.querySelector('.gallery-field');

    this.events();
    await this.reloadData();
  }

  events() {
    this.galleryFieldEl.addEventListener('click', (e) => {
      if (e.target !== this.fileInput) {
        this.fileInput.dispatchEvent(new MouseEvent('click'));
      }
    });
    this.fileInput.addEventListener('change', () => this.onChange());
  }

  async reloadData() {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }
    const response = await getImageList(`${this.url}files`);

    if (response && response.files) {
      response.files.forEach((file) => {
        this.addImage(file);
      });
    } else {
      console.log('No files found');
    }
  }

  async onChange() {
    const file = this.fileInput.files && this.fileInput.files[0];

    if (!file) return;
    if (file.type.startsWith('image/')) {
      const formData = new FormData();

      formData.append('file', file);
      const response = await addImage(`${this.url}files`, formData);

      if (response) {
        this.reloadData();
      }
    } else {
      console.log('no picture');
    }
    this.fileInput.value = null;
  }

  async onDeleteImage(id) {
    const response = await deleteImage(`${this.url}files/${id}`);
    console.log('galere', response);
    if (response) {
      this.reloadData();
    }
  }

  addImage(data) {
    const imageBlock = new ImageBlock(
      data,
      Gallery.showError.bind(this),
      this.onDeleteImage.bind(this),
    );
    this.list.appendChild(imageBlock.element);
  }

  static showError() {
    const container = document.querySelector('.gallery-container');
    const errorEl = container.querySelector('.error');
    errorEl.classList.remove('hidden');
  }
}
