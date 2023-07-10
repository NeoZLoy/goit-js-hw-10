export default function createSelectElement({ id, name }) {
    return `<option data-placeholder="true"></option>;
    <option value="${id}">${name || 'Unknown'}</option>`;
  }