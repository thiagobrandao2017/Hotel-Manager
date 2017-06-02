/* Hotel Model */
// example of dependency injection
// @see https://blog.risingstack.com/node-js-best-practices-part-2/
module.exports = (config) => {
  if (!config.db) {
    throw new Error('config.db is required');
  }

  const db = config.db;

  return {
    findAll() {
      return db.any(`
        SELECT *
        FROM hotels
        ORDER BY id
        DESC
      `);
    },

    findById(id) {
      return db.one(`
        SELECT *
        FROM hotels
        WHERE id = $1
      `, id);
    },

    save(hotel) {
      return db.one(`
        INSERT INTO hotels (
          hotel_name,
          hotel_description,
          hotel_address,
          star_rating,
          pet_friendly,
          hotel_image_url
        ) VALUES (
          $/hotel_name/,
          $/hotel_description/,
          $/hotel_address/,
          $/star_rating/,
          $/pet_friendly/,
          $/hotel_image_url/
        )
        RETURNING *
      `, hotel);
    },
    update(hotel) {
      return db.one(`
        UPDATE hotels
        SET hotel_name = $/hotel_name/,
            hotel_description = $/hotel_description/,
            hotel_address = $/hotel_address/,
            star_rating = $/star_rating/,
            pet_friendly = $/pet_friendly/,
            hotel_image_url = $/hotel_image_url/
        WHERE id = $/id/
        RETURNING *
        `, hotel);
    },

    destroy(id) {
      return db.none(`
        DELETE
        FROM hotels
        WHERE id = $1
      `, id);
    },
  };
};
