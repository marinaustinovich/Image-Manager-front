import Picture from '../Picture';
import createImageBlock from '../createImageBlock';

const fetchDnDImage = async (form, el) => {
  try {
    const response = await fetch('http://localhost:7070', {
      method: 'POST',
      body: form,
    });

    const result = await response.json();
    const image = new Picture(result.name, result.url, result.id);
    createImageBlock(image, el);
  } catch (error) {
    /* eslint-disable */
    console.error(error);
  }
};
export default fetchDnDImage;
