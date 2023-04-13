import deleteImage from './fetch/deleteImage';

function showError() {
  const container = document.querySelector('.gallery-container');
  const errorEl = container.querySelector('.error-url');
  errorEl.addEventListener('click', () => errorEl.classList.add('hidden'));
  errorEl.classList.remove('hidden');
}

export default function createImageBlock(data, containerEl) {
  const imageBLock = document.createElement('div');
  imageBLock.classList.add('image-block');
  imageBLock.innerHTML = `
    <image class="image" src=${data.url} alt=${data.name} data-id=${data.id}>
    <button type="button" class="btn-close">
      <span class="sr-only">Close</span>
      <span class="span-close" aria-hidden="true">×</span>
    </button>
  `;

  const btnClose = imageBLock.querySelector('.btn-close');
  btnClose.addEventListener('click', (e) => {
    const { id } = e.target.closest('.image-block').querySelector('.image').dataset;
    deleteImage(id);
    imageBLock.parentNode.removeChild(imageBLock);
  });

  const previewEl = imageBLock.querySelector('.image');
  previewEl.addEventListener('error', () => showError());
  previewEl.addEventListener('load', () => {
    containerEl.appendChild(imageBLock);
    document.querySelector('[data-id="file"]').value = '';
  });
}
