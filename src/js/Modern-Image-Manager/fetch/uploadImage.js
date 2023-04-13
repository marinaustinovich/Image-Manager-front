const uploadImage = async (blob, nameImg) => {
  const formData = new FormData();
  formData.append('file', blob, nameImg);
  const response = await fetch('http://localhost:7070', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();
  return result;
};

export default uploadImage;
