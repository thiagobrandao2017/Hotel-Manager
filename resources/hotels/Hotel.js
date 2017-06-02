module.exports = class Hotel {
  constructor(hotel) {
    /* eslint no-multi-spaces: "off" */
    this.id                = hotel.id;
    this.hotel_name        = hotel.hotel_name;
    this.hotel_description = hotel.hotel_description;
    this.hotel_address     = hotel.hotel_address;
    this.star_rating       = hotel.star_rating;
    this.pet_friendly      = hotel.pet_friendly;
    this.hotel_image_url   = hotel.hotel_image_url;
  }
};
