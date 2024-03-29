const deleteImage = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return 'deleted successful';
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default deleteImage;
