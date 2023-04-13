import createImageBlock from './createImageBlock';
import fetchDnDImage from './fetch/fetchDnDImage';
import fetchImage from './fetch/fetchImage';
import uploadImage from './fetch/uploadImage';
import isValidUrl from './isValidUrl';
import Picture from './Picture';

export default class Gallery {
  constructor() {
    this.container = null;
    this.list = null;
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

  drawUi() {
    this.checkBinding();
    this.container.innerHTML = `
    <div class="gallery-field-wrapper">
      <div class="gallery-field gallery-field_form">
            <form id="image-form" name="imageForm" enctype="multipart/form-data">
              <div class="title-wrapper">
                <label class="title title_label" for="name-image">Название</label>
                <input class="gallery-field__input" data-id="image" type="text" name="name" placeholder="Enter title of your picture" autocomplete="off" required>
              </div>
                
              <div class="title-wrapper">
                <label class="title title_label" for="file">Ссылка на изображение</label>
                <input class="gallery-field__input" data-id="url" type="url" name="file" placeholder="//example.png|webp|gif|svg" autocomplete="off"  pattern="(https?://.*.(png|webp|jpg|gif|svg)$)" required>
              </div>
              <div class="error-url hidden">Неверный URL изображения</div>
              <button class="btn-add" type="submit">Добавить</button>
            </form>
            
          </div>
          <div class="gallery-field">
            <input data-id="file" class="overlapped" type="file" accept="image/*">
            <span data-id="overlap" class="title overlap">Drag and Drop files here <br> or Click to select</span>
          </div>
    </div>
    <div class="gallery-list"></div>
      `;
    this.list = document.querySelector('.gallery-list');
    this.events();
  }

  events() {
    const fileEl = document.querySelector('[data-id=file]');
    const overlapEl = document.querySelector('[data-id=overlap]');
    const form = document.getElementById('image-form');

    form.addEventListener('submit', (e) => this.onSubmit(e));
    overlapEl.addEventListener('click', () => fileEl.dispatchEvent(new MouseEvent('click')));
    fileEl.addEventListener('change', (e) => this.onChange(e));
  }

  async onSubmit(e) {
    const form = e.currentTarget;
    e.preventDefault();

    const imageUrl = e.target.closest('form').querySelector('[data-id="url"]').value;
    const nameImg = e.target.closest('form').querySelector('[data-id="image"]').value;

    // Получение файла по URL-адресу
    try {
      const blob = await fetchImage(imageUrl);
      const result = await uploadImage(blob, nameImg);

      if (imageUrl !== '' && isValidUrl(imageUrl)) {
        const image = new Picture(result.name, result.url, result.id);
        createImageBlock(image, this.list);
        form.reset();
      }
    } catch (error) {
      /* eslint-disable */
      console.error(error);
    }
  }

  async onChange(e) {
    const data = e.target.files[0];
    const formData = new FormData();
    formData.append('file', data);

    await fetchDnDImage(formData, this.list);
  }
}
