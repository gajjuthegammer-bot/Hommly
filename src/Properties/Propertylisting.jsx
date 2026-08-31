import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter_sidebar from "./Filter_sidebar";


function PropertyListing() {

  const [propertie, setpropertie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  // ---- Pagination state ----
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // ek page par kitne cards dikhane hain, apni marzi se change kar sakte ho

  // ---- Fetch data only once on mount ----
  useEffect(() => {
    axios.get("http://localhost:3030/Properties")
      .then((res) => {
        console.log(res.data);
        setpropertie(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        alert("some thig wrong");
      })
      .finally(() => setLoading(false));
  }, []);

  // ---- Apply filters ----
  const filteredProperties = propertie.filter((p) => {
    if (filters.city && p.city?.toLowerCase() !== filters.city) return false;
    if (filters.category && p.type?.toLowerCase() !== filters.category) return false;
    if (filters.bedrooms?.length && !filters.bedrooms.includes(p.beds)) return false;
    if (filters.bathrooms?.length && !filters.bathrooms.includes(p.baths)) return false;
    if (filters.minSqft && p.sqft < Number(filters.minSqft)) return false;
    if (filters.maxSqft && p.sqft > Number(filters.maxSqft)) return false;
    if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
    return true;
  });

  // ---- Reset to page 1 whenever filters change ----
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // ---- Pagination calculations ----
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: page change par top pe scroll
  };


  return (
    <section className="property-listing">
      <div className="property-wrapper">

        {/* ================= PROPERTY CARDS ================= */}
        <div className="property-content">
          <div className="property-grid">

            {loading && <p>Loading...</p>}

            {!loading && currentItems.length === 0 && (
              <p>No properties found.</p>
            )}

            {currentItems.map((property) => {
              return (
              <div className="property-card" key={property.id}>

                {/* Image */}
                <div className="property-image-box">
                  <img
                    src={property.image}
                    alt={property.title}
                  />

                  <span className="property-price">
                    ₹{property.price}
                  </span>
                </div>

                {/* Content */}
                <div className="property-info">

                  <h3>{property.title}</h3>

                  <p className="property-address">
                    {property.address}
                  </p>

                  <div className="property-details">

                    <span>
                      <span className="detail-icon">▣</span>
                      {property.beds} Beds
                    </span>

                    <span>
                      <span className="detail-icon">▣</span>
                      {property.baths} Baths
                    </span>

                    <span>
                      <span className="detail-icon">▣</span>
                      {property.sqft} sqft
                    </span>

                  </div>

                  <button className="property-type">
                    {property.type}
                  </button>

                </div>
              </div>
        )})}

          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="pagination">

              <button
                className="page-arrow"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`page ${currentPage === page ? "active" : ""}`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                className="page-arrow"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                ›
              </button>

            </div>
          )}
        </div>

        {/* ================= FILTER SIDEBAR ================= */}
       <Filter_sidebar onFilterChange={setFilters} />

      </div>
    </section>
  );
}

export default PropertyListing;