/**
 * API call to fetch photographers and media
 * @returns {Promise<Object>} Object with photographers and media arrays
 */
async function getPhotographers() {
  const response = await fetch("./data/photographers.json");
  if (!response.ok) {
    throw new Error(`Erreur ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export { getPhotographers };
