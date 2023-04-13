export default async function deleteImage(id) {
  const response = await fetch(`http://localhost:7070/uploads/${id}`, {
    method: 'DELETE',
  });
  if (response.status >= 200 && response.status < 300) {
    try {
      const jsonData = await response.json();
      /* eslint-disable */
      console.log(jsonData);
    } catch (e) {
      /* eslint-disable */
      console.error(e);
    }
  }
}