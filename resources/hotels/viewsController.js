module.exports = {
  formNew(req, res) {
    res.render('hotels/new');
  },

  formEdit(req, res) {
    res.render('hotels/edit', {
      hotel: res.locals.hotel,
    });
  },

  listAll(req, res) {
    res.format({
      /* SEND OUT HTML */
      html() {
        res.render('hotels/index', {
          hotels: res.locals.hotels,
        });
      },

      /* SEND OUT JSON */
      json() {
        res.json(res.locals.hotels);
      },
    });
  },

  showOne(req, res) {
    res.format({

      /* SEND OUT JSON */
      json() {
        res.json(res.locals.hotel);
      },
    });
  },

  handleDelete(req, res) {
    res.format({
      /* REDIRECT TO THE HOME PAGE */
      html() {
        res.redirect('/hotels');
      },

      /* SEND OUT JSON */
      // we don't need a body, just a 202
      json() {
        res.sendStatus(204);
      },
    });
  },

  handleUpdate(req, res) {
    res.format({
      /* REDIRECT TO THE HOME PAGE */
      html() {
        res.redirect('/hotels');
      },

      /* SEND OUT JSON */
      // we don't need a body, just a 201
      json() {
        res.location(`/hotels/${res.locals.hotel.id}`)
        .sendStatus(200);
      },
    });
  },

  handleCreate(req, res) {
    res.format({
      /* REDIRECT TO THE HOME PAGE */
      html() {
        res.redirect('/hotels');
      },

      /* SEND OUT JSON */
      // we don't need a body, just a 201
      json() {
        res.location(`/hotels/${res.locals.hotel.id}`)
        .sendStatus(201);
      },
    });
  },

};
