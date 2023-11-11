import React, { useState, useEffect } from "react";
//import the components
import ListingCard from "./ListingCard";
import Search from "./Search";
//function o handle the filtered listings after delete
function ListingsContainer() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    // Fetch all listings from the provided endpoint
    fetch("http://localhost:3000/listings")
      .then((response) => {
        //haandle the error incase of error
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // set the listings in state
        setListings(data);
        setFilteredListings(data); 
        // Initialize filtered listings with all listings
      })
      //handle error
      .catch((error) => {
        // handle errors here
        console.error("Error fetching listings:", error);
      });
  }, []); 
  // empty dependency array ensures this effect runs once when the component mounts

  const handleDeleteListing = (listingId) => {
    // Update the state to remove the deleted listing
    setListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== listingId)
    );
    setFilteredListings((prevListings) =>
      prevListings.filter((listing) => listing.id !== listingId)
    );
  };

  const handleSearch = (searchTerm) => {
    // Filter the listings based on the search term
    const filtered = listings.filter((listing) =>
      listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  return (
    <main>
      <Search onSearch={handleSearch} />
      <ul className="cards">
        {/* map over the filtered listings and use the ListingCard component to display each listing */}
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} onDelete={handleDeleteListing} />
        ))}
      </ul>
    </main>
  );
}
//export the listings container
export default ListingsContainer;
