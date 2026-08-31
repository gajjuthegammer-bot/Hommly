import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const properties = [
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
    price: "$4,600/Mo",
    title: "Riverfront Landing Townhomes",
    location: "9012 Riverfront Way",
    beds: 6,
    baths: 2,
    sqft: 200,
    type: "For Rent",
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    price: "$90,000",
    title: "Mountain View Manor Homes",
    location: "8901 Pinecrest Drive",
    beds: 6,
    baths: 2,
    sqft: 200,
    type: "For Sale",
  },
  {
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
    price: "$4,600/Mo",
    title: "Riverfront Landing Townhomes",
    location: "9012 Riverfront Way",
    beds: 6,
    baths: 2,
    sqft: 200,
    type: "For Rent",
  },
  {
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
    price: "$5,200/Mo",
    title: "Lakeside Villa Residences",
    location: "1123 Lakeside Blvd",
    beds: 4,
    baths: 3,
    sqft: 250,
    type: "For Rent",
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    price: "$120,000",
    title: "Sunset Ridge Estate",
    location: "4455 Sunset Ridge",
    beds: 5,
    baths: 3,
    sqft: 300,
    type: "For Sale",
  },
];

const VISIBLE_COUNT = 3;
const totalSlides = properties.length;

const Progres = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [withTransition, setWithTransition] = useState(true);

  const extendedProperties = [
    ...properties.slice(-VISIBLE_COUNT),
    ...properties,
    ...properties.slice(0, VISIBLE_COUNT),
  ];

  const [slidePosition, setSlidePosition] = useState(VISIBLE_COUNT);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlidePosition((prev) => prev + 1);
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slidePosition >= totalSlides + VISIBLE_COUNT) {
      const timeout = setTimeout(() => {
        setWithTransition(false);
        setSlidePosition(VISIBLE_COUNT);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [slidePosition]);

  useEffect(() => {
    if (!withTransition) {
      const raf = requestAnimationFrame(() => {
        setWithTransition(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [withTransition]);

  const slideWidthPercent = 100 / VISIBLE_COUNT; // har card ka % width, gap ke bina

  return (
    <section className="featured">
      <div className="featured-title">
        <h1>CHECK OUT OUR FEATURED PROPERTIES</h1>
        <p>
          Explore our exclusive collection of top-rated properties,
          carefully <br />
          handpicked to offer something for every lifestyle and budget.
        </p>
      </div>

      <div className="property-wrapper-outer" style={{ overflow: "hidden", width: "100%" }}>
        <div
          className="property-wrapper"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            transform: `translateX(-${slidePosition * slideWidthPercent}%)`,
            transition: withTransition ? "transform 0.8s ease-in-out" : "none",
          }}
        >
          {extendedProperties.map((property, index) => (
            <div
              key={index}
              style={{
                flex: `0 0 ${slideWidthPercent}%`,
                maxWidth: `${slideWidthPercent}%`,
                boxSizing: "border-box",
                padding: "0 10px", // yahan se spacing mil rahi hai, gap se nahi
              }}
            >
              <div className="property-card">
                <div className="property-image">
                  <img src={property.image} alt="house" />
                  <div className="price-tag">{property.price}</div>
                </div>

                <div className="property-content">
                  <h2>{property.title}</h2>
                  <div className="location">{property.location}</div>

                  <div className="property-info">
                    <span><i className="fa-solid fa-bed"></i> {property.beds} Beds</span>
                    <span><i className="fa-solid fa-bath"></i> {property.baths} Baths</span>
                    <span><i className="fa-solid fa-expand"></i> {property.sqft} sqft</span>
                  </div>

                  <a href="#" className="property-btn">{property.type}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dots">
        {properties.map((_, index) => (
          <span
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => {
              setActiveIndex(index);
              setSlidePosition(index + VISIBLE_COUNT);
            }}
            style={{ cursor: "pointer" }}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Progres;