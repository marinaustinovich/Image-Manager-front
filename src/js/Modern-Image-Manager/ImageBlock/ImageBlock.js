import './image-block.css';

export default class ImageBlock {
  constructor(data, onError, onDelete) {
    this.data = data;
    this.element = null;
    this.onError = onError;
    this.onDelete = onDelete;

    this.create();
    this.addEventListeners();
  }

  create() {
    this.element = document.createElement('div');
    this.element.classList.add('image-block');
    this.element.innerHTML = `
        <img  class="image" src=${this.data.path} alt=${this.data.filename} data-id=${this.data.id}">
        <button type="button" class="btn-close">
          <span class="sr-only">Close</span>
          <span class="span-close" aria-hidden="true">×</span>
        </button>
      `;
  }

  addEventListeners() {
    const imgElement = this.element.querySelector('.image');
    const btnClose = this.element.querySelector('.btn-close');

    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      this.onDelete(this.data.id);
    });

    if (this.onError) {
      imgElement.addEventListener('error', () => {
        this.onError();
        this.element.remove();
      });
    }
    imgElement.addEventListener('load', () => console.log('Image loaded successfully!'));
  }

  static openImageInNewWindow(url) {
    window.open(url, '_blank');
  }
}
