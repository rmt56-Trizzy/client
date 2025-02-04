export const convertArrayToObject = (inputArray) => {
  return inputArray.reduce((result, dayData) => {
    const dayKey = dayData.day.toLowerCase().replace(" ", "");
    result[dayKey] = dayData.locations.map((location) => ({
      slug: location.slug,
      name: location.name,
      image: location.image,
      category: location.category,
      coordinate: location.coordinates,
    }));
    return result;
  }, {});
};

export const convertObjectToArray = (inputObject) => {
  return Object.entries(inputObject).map(([key, value], index) => ({
    day: `Day ${index + 1}`,
    locations: value.map((location) => {
      return {
        slug: location.slug,
        name: location.name,
        image: location.image,
        category: location.category,
        coordinates: location.coordinate,
      };
    }),
  }));
};
