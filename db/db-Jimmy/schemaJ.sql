CREATE TABLE Listings (
 listing_id BIGSERIAL,
 description VARCHAR,
 city VARCHAR,
 discount_rate INTEGER,
 discount_measure INTEGER
);

ALTER TABLE Listings ADD CONSTRAINT Listings_pkey PRIMARY KEY (listing_id);

CREATE TABLE UnavailableDate (
 id BIGSERIAL,
 listing_id INTEGER,
 unavailable_dates DATE
);

ALTER TABLE UnavailableDate ADD CONSTRAINT UnavailableDate_pkey PRIMARY KEY (id);

CREATE TABLE MinMaxDays (
 id BIGSERIAL,
 listing_id INTEGER,
 sunday_min INTEGER,
 monday_min INTEGER,
 tuesday_min INTEGER,
 wednesday_min INTEGER,
 thursday_min INTEGER,
 friday_min INTEGER,
 saturday_min INTEGER,
 max_days INTEGER
);

ALTER TABLE MinMaxDays ADD CONSTRAINT MinMaxDays_pkey PRIMARY KEY (id);

CREATE TABLE Bedrooms (
 id BIGSERIAL,
 listing_id VARCHAR,
 numBeds INTEGER,
 bedType VARCHAR
);

ALTER TABLE Bedrooms ADD CONSTRAINT Bedrooms_pkey PRIMARY KEY (id);

CREATE TABLE Reservations (
 id BIGSERIAL,
 listing_id INTEGER,
 reservation_id INTEGER,
 start DATE,
 end DATE
);

ALTER TABLE Reservations ADD CONSTRAINT Reservations_pkey PRIMARY KEY (id);

ALTER TABLE UnavailableDate ADD CONSTRAINT UnavailableDate_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES Listings(listing_id);
ALTER TABLE MinMaxDays ADD CONSTRAINT MinMaxDays_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES Listings(listing_id);
ALTER TABLE Bedrooms ADD CONSTRAINT Bedrooms_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES Listings(listing_id);
ALTER TABLE Reservations ADD CONSTRAINT Reservations_listing_id_fkey FOREIGN KEY (listing_id) REFERENCES Listings(listing_id);