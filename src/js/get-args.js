export default function getArgs({ url, breeds }) {
    const { name, description, temperament } = breeds[0];
    return {
      url,
      name,
      description,
      temperament,
    };
}