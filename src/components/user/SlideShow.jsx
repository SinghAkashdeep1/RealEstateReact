import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import { HiSearch } from "react-icons/hi";
import { propertiesList, propertiesTypesList } from "../../userStore/buyPropertyApi/buyPropertySlices"; // Adjust the import path
import "./slideshow.css";
import { useNavigate } from "react-router-dom";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { propertytypesSearch, loading } = useSelector((state) => state.propertyBuy); // Adjust based on your actual state
  console.log(propertytypesSearch);

  useEffect(() => {
    dispatch(propertiesTypesList());
  }, [dispatch]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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

  const handleSearch = () => {
    // Handle "All" option by sending an empty string
    const typeQuery = selectedOption === "all" ? "" : selectedOption;
    navigate(`/buy-property?search=${encodeURIComponent(searchQuery)}&type=${encodeURIComponent(typeQuery)}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="tagline-container">
        <h1 className="text-white bg-transparent">Get</h1>
        <h1 className="text-primary bg-transparent">Best Deals</h1>
        <h1 className="text-white bg-transparent">In Your Area!</h1>
      </div>

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
            className="select-dropdown rounded-end-pill p-3"
          >
            <option value="all">All Property Types</option>
            {loading ? (
              <option>Loading...</option>
            ) : (
              propertytypesSearch?.property_types?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))
            )}
          </select>
          <button
            className="search-button btn btn-primary rounded-circle mx-2 px-2 py-2"
            onClick={handleSearch}
          >
            <HiSearch size={25} className="search-icon bg-primary" />
          </button>
        </div>
      </div>

      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={true}
        interval={3000}
        pause="hover"
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
