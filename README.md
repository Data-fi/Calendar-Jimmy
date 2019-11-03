## Create / POST - Create a New Reservation
/api/:Listing_id
  Start Date        date            (bookedDates?)
  End Date          date

## Read / GET - Get Calendar Reservations
/api/:listing_id
  Description       string        (For title component)
  City              string        (For title component)
  Discount Rate     int
  Discount Measure  int
  Restrictions      int
  Bedrooms          string        (For the bedrooms component)
  unavailable_dates date
  MinMaxDays        int

## Update / PUT - Update Calendar Reservation
/api/:listing_id
  Reservation Id    int
  Start Date        date
  End Date          date

## Delete / DELETE - Delete Reservation
/api/:listing_id
  Reservation Id    int

Extend the existing API to support all CRUD operations. This should be done with the inherited DBMS:
Be sure to select the appropriate routes for each of these actions so they conform to the REST standard.
