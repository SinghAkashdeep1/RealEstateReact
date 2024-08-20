import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./slideshow.css"; // Ensure to import your CSS file
import { HiSearch } from "react-icons/hi";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // URLs for random images from Lorem Picsum
  const images = [
    "https://picsum.photos/800/400?random=1",
    "https://picsum.photos/800/400?random=2",
    "https://picsum.photos/800/400?random=3",
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Tagline Container */}
      <div className="tagline-container">
        <h1 className="text-white bg-transparent">Get</h1>
        <h1 className="text-primary bg-transparent">Best Deals</h1>
        <h1 className="text-white bg-transparent">In Your Area!</h1>
      </div>

      {/* Search Filter Container */}
      <div className="search-filter-container">
    <p className="search-container-title">Any specific deals you are looking for?</p>
    <div className="d-flex align-items-center bg-transparent">
        <input
            type="text"
            placeholder="Search by City / MLS No. / Postal Code"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input rounded-start-pill p-3"
        />
        <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="select-dropdown rounded-end-pill p-3 "
        >
            <option value="" className="" disabled>
                Property Type
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
        <button className="search-button btn btn-primary rounded-circle mx-2 px-2 py-2">
        <HiSearch size={25} className="search-icon bg-primary" />
        </button>
    </div>
</div>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false} // Disable left/right arrows
        indicators={true} // Enable indicators (dots)
        interval={3000} // Automatic change interval (3 seconds)
        pause="hover" // Pause on hover
      >
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100 carousel-image"
              src={image}
              alt={`Slide ${idx + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
