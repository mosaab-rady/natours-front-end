export function createTour(e) {
  // console.log(e.target);
  const name = e.target.name.value;
  const duration = e.target.duration.value;
  const maxGroupSize = e.target.maxGroupSize.value;
  const difficulty = e.target.difficulty.value;
  const price = e.target.price.value;
  const summary = e.target.summary.value;
  const description = e.target.description.value;

  const startDates_1 = e.target.startDates_1.value;
  const startDates_2 = e.target.startDates_3.value;
  const startDates_3 = e.target.startDates_3.value;
  const startDates = [startDates_1, startDates_2, startDates_3];

  const imageCover = e.target.imageCover.files[0];
  const img_1 = e.target.img_1.files[0];
  const img_2 = e.target.img_2.files[0];
  const img_3 = e.target.img_3.files[0];
  const images = [img_1, img_2, img_3];

  const description_startLocation = e.target.description_startLocation.value;
  const address_startLocation = e.target.address_startLocation.value;
  const lag_startLocation = e.target.lag_startLocation.value;
  const lat_startLocation = e.target.lat_startLocation.value;
  const coordinatesStartLocation = [lag_startLocation, lat_startLocation];

  const startLocation = {};
  startLocation.description = description_startLocation;
  startLocation.address = address_startLocation;
  startLocation.coordinates = coordinatesStartLocation;

  const locations = [];
  for (let i = 0; i < e.target.num.value; i++) {
    const location = {};
    location.description = e.target.description_location1.value;
    const lag_location = e.target.lag_location1.value;
    const lat_location = e.target.lat_location1.value;
    location.coordinates = [lag_location, lat_location];
    console.log(e.target.description_location3.value);
    locations.push(location);
  }

  console.log(locations);

  // const form = new FormData();
  // form.append('name');
  // form.append('duration');
  // form.append('maxGroupSize');
  // form.append('difficulty');
  // form.append('summary');
  // form.append('description');
  // form.append('imageCover');
  // form.append('locations');
  // form.append('startLocation');
  // form.append('images');
  // form.append('startDates');
}
