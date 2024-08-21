import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  propertiesList,
  propertiesTypesList,
} from "../../userStore/buyPropertyApi/buyPropertySlices";

import {
  typeList
} from "../../userStore/sellPopertyApi/addPropertySlice";

import styles from "./Buy.module.css";
import { HiSearch } from "react-icons/hi";
import Accordion from "react-bootstrap/Accordion";
import { FaRegHeart, FaTape } from "react-icons/fa";
import { MdKingBed } from "react-icons/md";
import { GiKitchenTap } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Buy = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { propertyList, propertytypesSearch, loading, error } = useSelector(
    (state) => state.propertyBuy
  );
   
 // const { typeLists } = useSelector((state) => state.property);

 useEffect(() => {
  dispatch(typeList());
}, [dispatch]);

  let [searchQuery, setSearchQuery] = useState("");
  let [selectedOption, setSelectedOption] = useState("");
  const [selectedListingTypes, setSelectedListingTypes] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedPropertySubTypes, setSelectedPropertySubTypes] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedBathrooms, setSelectedBathrooms] = useState("");
  const [minPrice, setMinPrice] = useState(0); // Initialized as number
  const [maxPrice, setMaxPrice] = useState(0); // Initialized as number
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [fetchedProperties, setFetchedProperties] = useState([]);

  // Fetch property types on component mount
  useEffect(() => {
    dispatch(propertiesTypesList());
  }, [dispatch]);

  // Fetch properties based on initial search criteria
  useEffect(() => {
    dispatch(
      propertiesList({
        search: searchQuery,
        type: selectedOption,
        bedrooms: selectedBedrooms,
        bathrooms: selectedBathrooms,
      })
    ).then((response) => {
      setFetchedProperties(response.payload.property_list || []);
    });
  }, [
    dispatch,
    searchQuery,
    selectedOption,
    selectedBedrooms,
    selectedBathrooms,
  ]);

  // Handle filtering logic
  const filterProperties = () => {
    if (!fetchedProperties) return;

    //params get 
    const queryParams =  new URLSearchParams(location.search); 
    searchQuery = queryParams.get("search")
    selectedOption =  queryParams.get("type")

    const filtered = fetchedProperties.filter((property) => {
      const isListingTypeMatched =
        selectedListingTypes.length === 0 ||
        selectedListingTypes.includes(Number(property.listing_type));
      const isTypeMatched =
        selectedPropertyTypes.length === 0 ||
        selectedPropertyTypes.includes(Number(property.property_type));
      const isSubtypeMatched =
        selectedPropertySubTypes.length === 0 ||
        selectedPropertySubTypes.includes(Number(property.property_sub_type));
      const isBedroomsMatched =
        !selectedBedrooms || property.bedrooms === selectedBedrooms;
      const isBathroomsMatched =
        !selectedBathrooms || property.bathrooms === selectedBathrooms;
      const isPriceInRange =
        (minPrice === 0 || property.price >= minPrice) &&
        (maxPrice === 0 || property.price <= maxPrice);

      return (
        isListingTypeMatched &&
        isTypeMatched &&
        isSubtypeMatched &&
        isBedroomsMatched &&
        isBathroomsMatched &&
        isPriceInRange
      );
    });

    setFilteredProperties(filtered);
  };

  // Update filtered properties whenever filters change
  useEffect(() => {
    filterProperties();
  }, [
    selectedListingTypes,
    selectedPropertyTypes,
    selectedPropertySubTypes,
    selectedBedrooms,
    selectedBathrooms,
    minPrice,
    maxPrice,
    fetchedProperties,
  ]);

  // Fetch properties with price range when search button is clicked
  const handleSearch = () => {
    dispatch(
      propertiesList({
        search: searchQuery,
        type: selectedOption,
        bedrooms: selectedBedrooms,
        bathrooms: selectedBathrooms,
        min_price: minPrice || undefined, // Include only if minPrice is not zero
        max_price: maxPrice || undefined, // Include only if maxPrice is not zero
      })
    ).then((response) => {
      setFetchedProperties(response.payload.property_list || []);
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleListingTypeChange = (listingTypeId) => {
    setSelectedListingTypes((prev) => {
      const newState = prev.includes(listingTypeId)
        ? prev.filter((id) => id !== listingTypeId)
        : [...prev, listingTypeId];
      return newState;
    });
  };

  const handlePropertyTypeChange = (typeId) => {
    setSelectedPropertyTypes((prev) => {
      const newState = prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId];
      return newState;
    });
  };

  const handlePropertySubTypeChange = (subTypeId) => {
    setSelectedPropertySubTypes((prev) => {
      const newState = prev.includes(subTypeId)
        ? prev.filter((id) => id !== subTypeId)
        : [...prev, subTypeId];
      return newState;
    });
  };

  const handleBedroomsChange = (e) => {
    setSelectedBedrooms(e.target.value);
  };

  const handleBathroomsChange = (e) => {
    setSelectedBathrooms(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(parseFloat(e.target.value) || 0);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseFloat(e.target.value) || 0);
  };

  const getListingTypeName = (listingTypeId) => {
    const listingType = propertyList?.listing_type?.find(
      (type) => type.id === Number(listingTypeId)
    );
    return listingType ? listingType.name : "Unknown Listing Type";
  };

  const getAddress = (propertyId) => {
    const address = propertyList?.address?.find(
      (addr) => addr.property_id == propertyId
    );
    return address
      ? `${address.location}, ${address.city}, ${address.pincode}, ${address.state}, ${address.country}`
      : "Unknown Address";
  };

  return (
    <div className={styles.buyPopertyBlock}>
      <div className={styles.titleContainer}>
        <div className={`${styles.searchContainer}`}>
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
            <option value="">All Property Types</option>
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
      <div className={styles.buyContainer}>
        <div className={styles.sideContainer}>
          <div className={styles.sideContainerContent}>
            <h3>Browse by</h3>
            <Accordion className={styles.accordianContainer}>
              {/* Listing Types Filter */}
              <Accordion.Item eventKey="0">
                <Accordion.Header
                  className={`${styles.accordianHeader} border-bottom`}
                >
                  Listing Types
                </Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex flex-column">
                    {propertyList?.listing_type?.map((type) => (
                      <label key={type.id} className={styles.accordianLabel}>
                        <input
                          type="checkbox"
                          value={type.id}
                          onChange={() => handleListingTypeChange(type.id)}
                        />
                        {type.name}
                      </label>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              {/* Property Types and Subtypes Filter */}
              <Accordion.Item eventKey="1" className={styles.accordianItem}>
                <Accordion.Header className={styles.accordianHeader}>
                  Property Type
                </Accordion.Header>
                <Accordion.Body>
                  {propertyList?.property_type?.map((type) => (
                    <div key={type.id}>
                      <label className={styles.accordianLabel}>
                        <input
                          type="checkbox"
                          value={type.id}
                          onChange={() => handlePropertyTypeChange(type.id)}
                        />
                        {type.name}
                      </label>
                      {selectedPropertyTypes.includes(type.id) && (
                        <div className="ms-4">
                          {propertyList?.property_sub_type
                            .filter((subType) => subType.property_type_id === type.id)
                            .map((subType) => (
                              <label
                                key={subType.id}
                                className={styles.accordianLabel}
                              >
                                <input
                                  type="checkbox"
                                  value={subType.id}
                                  onChange={() =>
                                    handlePropertySubTypeChange(subType.id)
                                  }
                                />
                                {subType.name}
                              </label>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className={styles.sideContainerContent}>
            <h3>Search Properties</h3>
            <Form noValidate onSubmit={(e) => e.preventDefault()}>
              <Form.Group controlId="bedroomsSelect" className="mt-4">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Select
                  aria-label="Select number of bedrooms"
                  className="bg-transparent rounded-pill"
                  onChange={handleBedroomsChange}
                >
                  <option value="">Any</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five +</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="bathroomsSelect" className="mt-2">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Select
                  aria-label="Select number of bathrooms"
                  className="bg-transparent rounded-pill"
                  onChange={handleBathroomsChange}
                >
                  <option value="">Any</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five +</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="minPrice" className="mt-2">
                <Form.Label>Min Price</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Enter min price"
                    aria-describedby="inputGroupPrepend"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="maxPrice" className="mt-2">
                <Form.Label>Max Price</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Enter max price"
                    aria-describedby="inputGroupPrepend"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </InputGroup>
              </Form.Group>
              {/* <button
                type="button"
                className="search-button btn btn-primary rounded-pill mx-2 px-2 py-2 mt-2"
                onClick={handleSearch}
              >
                <HiSearch size={25} className="search-icon bg-primary" />Search
              </button> */}
            </Form>
          </div>
        </div>

        <div className={styles.propertyContainer}>
          <div className={styles.propertyGrid}>
            {loading && <p>Loading properties...</p>}
            {error && <p>{error}</p>}
            {filteredProperties?.length === 0 && !loading && !error && (
              <p>No properties available.</p>
            )}
            {filteredProperties?.map((property) => (
              <Link
                to={`/property/details/${property.id}`}
                key={property.id}
                className={`${styles.propertyDataBox} text-decoration-none`}
                style={{ color: "inherit" }}
              >
                <div className={styles.propertyDataBox}>
                  <div className={styles.propertyImgContainer}>
                    <img
                      src={`http://127.0.0.1:8000/${property.image}`}
                      alt={property.title || "Property Image"}
                      className={styles.propertyImage}
                    />
                    <div className={styles.badge}>
                      {getListingTypeName(property.listing_type)}
                    </div>
                  </div>
                  <div className={styles.propertyPrimaryInfo}>
                    <div className={styles.propertyTitle}>
                      <h4 className={styles.propertyTitleText}>
                        {property.price
                          ? `C$ ${property.price}`
                          : "Price not available"}
                      </h4>
                      <FaRegHeart className={styles.propertySelectFav} />
                    </div>
                    <div className={styles.propertyTitleAddress}>
                      <CiLocationOn size={20} />
                      {getAddress(property.id)}
                    </div>
                    <div className={styles.propertyCountRooms}>
                      <p className="bg-transparent py-2">
                        <MdKingBed size={25} className="bg-transparent" />{" "}
                        {property.bedrooms} |
                      </p>
                      <p className="bg-transparent py-2">
                        <GiKitchenTap size={25} className="bg-transparent" />{" "}
                        {property.bathrooms}
                      </p>
                      <p className="bg-transparent py-2">
                        <FaTape size={25} className="bg-transparent" />{" "}
                        {property.area} sqft
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
