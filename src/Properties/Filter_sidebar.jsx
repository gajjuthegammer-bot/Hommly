import React, { useState, useEffect } from "react";

const Filter_sidebar = ({ onFilterChange }) => {

    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");
    const [bedrooms, setBedrooms] = useState([]);
    const [bathrooms, setBathrooms] = useState([]);
    const [minSqft, setMinSqft] = useState("");
    const [maxSqft, setMaxSqft] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleCheckbox = (value, setValue) => {
        setValue((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };

    // Jab bhi koi filter change ho, parent ko latest filters bhej do
    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({
                city,
                category,
                bedrooms,
                bathrooms,
                minSqft,
                maxSqft,
                minPrice,
                maxPrice,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city, category, bedrooms, bathrooms, minSqft, maxSqft, minPrice, maxPrice]);

    const handleClearFilters = () => {
        setCity("");
        setCategory("");
        setBedrooms([]);
        setBathrooms([]);
        setMinSqft("");
        setMaxSqft("");
        setMinPrice("");
        setMaxPrice("");
    };

    return (
        <>
            <aside className="property-filter">

                {/* City */}
                <div className="filter-group">
                    <label>City</label>

                    <div className="select-wrapper">
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">Select Deal</option>
                            <option value="surat">Surat</option>
                            <option value="ahmedabad">Ahmedabad</option>
                            <option value="mumbai">Mumbai</option>
                            <option value="delhi">Delhi</option>
                        </select>
                    </div>
                </div>

                {/* Property Category */}
                <div className="filter-group">
                    <label>Property Category</label>

                    <div className="select-wrapper">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Deal</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                        </select>
                    </div>
                </div>

                {/* Bedrooms */}
                <div className="filter-group">
                    <label>Number Of Bedroom's</label>

                    <div className="checkbox-box">

                        {[1, 2, 3, 4, 5, 6].map((room) => (
                            <label className="checkbox-item" key={room}>
                                <input
                                    type="checkbox"
                                    checked={bedrooms.includes(room)}
                                    onChange={() =>
                                        handleCheckbox(room, setBedrooms)
                                    }
                                />
                                <span>Room {room}</span>
                            </label>
                        ))}

                    </div>
                </div>

                {/* Bathrooms */}
                <div className="filter-group">
                    <label>Number Of Bathrooms</label>

                    <div className="checkbox-box">

                        {[1, 2, 3, 4, 5, 6].map((bath) => (
                            <label className="checkbox-item" key={bath}>
                                <input
                                    type="checkbox"
                                    checked={bathrooms.includes(bath)}
                                    onChange={() =>
                                        handleCheckbox(bath, setBathrooms)
                                    }
                                />

                                <span>Bathroom {bath}</span>
                            </label>
                        ))}

                    </div>
                </div>

                {/* Square Feet */}
                <div className="filter-group">

                    <label>Square Feet</label>

                    <div className="range-input">

                        <input
                            type="number"
                            placeholder="Min"
                            value={minSqft}
                            onChange={(e) => setMinSqft(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Max"
                            value={maxSqft}
                            onChange={(e) => setMaxSqft(e.target.value)}
                        />

                    </div>

                </div>

                {/* Price */}
                <div className="filter-group">

                    <label>Price</label>

                    <div className="range-input">

                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />

                    </div>

                </div>

                {/* Clear Filters */}
                <div className="filter-group">
                    <button
                        type="button"
                        className="clear-filters-btn"
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </button>
                </div>

            </aside>
        </>
    )
}
export default Filter_sidebar;