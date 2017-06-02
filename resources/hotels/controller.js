const db      = require('../../config/database');
const Hotel   = require('./Hotel');
const hotelDB = require('../../models/hotel')({ db }); // inject the connection settings into the hotel

// note: this controller is also a Hotel factory (it creates Hotels)
// @see https://www.tutorialspoint.com/design_pattern/factory_pattern.htm

module.exports = {
  index(req, res, next) {
    hotelDB.findAll()
      .then((hotels) => {
        // let's be sure to have some consistency by promoting our hotel data to a Hotel object
        res.locals.hotels = hotels.map(hotelData => new Hotel(hotelData));
        next();
      })
      /* this is really .catch(err => next(err)) */
      .catch(next);
  },

  getOne(req, res, next) {
    hotelDB.findById(req.params.id)
      .then((hotelData) => {
        res.locals.hotel = new Hotel(hotelData);
        next();
      })
      .catch(() => res.sendStatus(404));
  },

  create(req, res, next) {
    const newHotel = new Hotel(req.body.hotel);
    hotelDB.save(newHotel)
      .then((hotelData) => {
        res.locals.hotel = new Hotel(hotelData);
        next();
      })
      .catch(next);
  },

  // update is a special case
  // we first have to get the hotel from the db
  // then we merge in whatever the user gave us
  // save that object
  update(req, res, next) {
    hotelDB.findById(req.params.id)

      /* If we don't find a hotel to update --> 404 */
      .catch(() => res.sendStatus(404))

      /* we've found a hotel to update! */
      .then((oldHotel) => {
        const newHotel = {};
        // req.body.hotel + oldhotel = newHotel
        Object.assign(newHotel, oldHotel, req.body.hotel);

        // return a new promise to the chain (NEVER NEST PROMISES)
        return hotelDB.update(newHotel);
      })

      /* the return from the SQL update will be handled here */
      .then((updatedHotel) => {
        res.locals.hotel = updatedHotel;
        next();
      })

      /* Any errors produced during the update should be caught here */
      .catch(next);
  },

  destroy(req, res, next) {
    hotelDB.destroy(req.params.id)
      .then(() => next())
      .catch(next);
  },
};
