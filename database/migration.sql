DROP TABLE IF EXISTS hotels;

CREATE TABLE hotels (
  id SERIAL PRIMARY KEY,
  hotel_name VARCHAR(64) NOT NULL,
  hotel_description TEXT,
  hotel_address VARCHAR(128) NOT NULL,
  star_rating INTEGER NOT NULL DEFAULT 1,
  pet_friendly BOOLEAN NOT NULL DEFAULT FALSE,
  hotel_image_url VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX on hotels (pet_friendly);
CREATE INDEX on hotels (hotel_name);
CREATE INDEX on hotels (date_created);
