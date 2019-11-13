-- createdb calendar

DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar;

DROP TABLE IF EXISTS Listings CASCADE;
DROP TABLE IF EXISTS Reservations;

CREATE TABLE Listings (
 listing_id SERIAL,
 descriptions VARCHAR,
 city VARCHAR,
 discount_rate INTEGER,
 discount_measure INTEGER,
 numBeds INTEGER,
 bedType VARCHAR,
 min_sunday INTEGER,
 min_monday INTEGER,
 min_tuesday INTEGER,
 min_wednesday INTEGER,
 min_thursday INTEGER,
 min_friday INTEGER,
 min_saturday INTEGER,
 max_days INTEGER
);


CREATE TABLE Reservations (
 listing_id INTEGER,
 reservation_id INTEGER,
 startDate VARCHAR,
 endDate VARCHAR
);


COPY Listings FROM '/Users/jimmy/Desktop/Calendar/calendar/db/db-Jimmy/jimmy-post.csv' DELIMITER ',' CSV HEADER;
COPY Reservations FROM '/Users/jimmy/Desktop/Calendar/calendar/db/db-Jimmy/jimmy-post2.csv' DELIMITER ',' CSV HEADER;

-- Copy of inserts for deliverable
-- INSERT INTO Listings (descriptions, city, discount_rate, discount_measure, numBeds, bedType, min_sunday, min_monday, min_tuesday, min_wednesday, min_thursday, min_friday, min_saturday, max_days)
-- VALUES ('MEOW', 'Catington', 50, 7, 1, 'Cardboard Box', 2, 2, 2, 2, 2, 2, 2, 7);
