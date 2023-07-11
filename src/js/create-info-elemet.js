export default function createInfoElement({ url, name, description, temperament }) {
    return ` <img
        class="cat_image"
        src="${url}"
        alt="${name || 'Unknown'}"
      />
      <h2 class="title">${name || 'Unknown'}</h2>
      <p class="descr">${description || 'Unknown'}</p>
      <h3 class="sub-title">Temperament</h3>
      <p class="descr">${temperament || 'Unknown'}</p>
      `;
  }