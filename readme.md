## STORE API written in NODE (express js)

- a store api .. for now one can CRUD , i'll be implimenting advance features.
- basically I have extensivly worked with mongo db (mongoose)

#### All CRUD Operations can be done.

    - api endpoints follows standred like
    - http://localhost:5000/api/v1/products

#### String parameters that can be passed are :

- limit = number (limit the results for a single page)
- page = number (pagination is implimented, if page = 2 means products for second page (1st limit is skipped))
- numericFilters = price>50,rating>4.5
- sort = name,price (in both ascending and descending order (-name,-price))
- fields = name,price,rating (to get specific field)
- featured = boolean(true, false)
- company = ['ikea', 'liddy', 'caressa', 'marcos'] : choose one or many from this list

- a complete example replace port with your port .
  GET [http://localhost:PORT/api/v1/products?sort=-price&fields=name,price&limit=2&page=2&numericFilters=price>30,rating>4&company=ikea]
