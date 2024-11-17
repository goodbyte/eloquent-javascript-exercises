import { roadGraph } from './adjacent-list.js';

export class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) return this;
    
    const parcels = this.parcels
      .map((parcel) => {
        return parcel.place === this.place ? 
          { place: destination, address: parcel.address } :
          parcel;
      })
      .filter((parcel) => parcel.place !== parcel.address);

    return new VillageState(destination, parcels);
  }
}

VillageState.random = function(parcelCount = 5) {
  const parcels = [];

  const randomPlace = (placeToExclude) => {
    const places = new Set(Object.keys(roadGraph));
    if (placeToExclude) places.delete(placeToExclude);
    const rndIndex = Math.floor(Math.random() * places.size);

    return Array.from(places)[rndIndex];
  }

  for (let i = 0; i < parcelCount; i++) {
    const address = randomPlace();
    const place = randomPlace(address);
    parcels.push({ place, address });
  }

  return new VillageState('Post Office', parcels);
}