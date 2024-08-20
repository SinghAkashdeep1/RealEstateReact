import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { propertiesList } from "../../userStore/buyPropertyApi/buyPropertySlices";
import styles from "./Buy.module.css";
import { HiSearch } from "react-icons/hi";
import Accordion from "react-bootstrap/Accordion";
import { FaRegHeart, FaTape } from "react-icons/fa";
import { MdKingBed } from "react-icons/md";
import { GiKitchenTap } from "react-icons/gi";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Buy = () => {
  const dispatch = useDispatch();
  const { propertyList, loading, error } = useSelector(
    (state) => state.propertyBuy
  );
  const [selectedListingTypes, setSelectedListingTypes] = useState([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [selectedPropertySubTypes, setSelectedPropertySubTypes] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    dispatch(propertiesList());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProperties(propertyList?.property_list || []);
  }, [propertyList]);

  useEffect(() => {
    const filterProperties = () => {
      if (!propertyList?.property_list) return;

      const filtered = propertyList.property_list.filter((property) => {
        const isListingTypeMatched =
          selectedListingTypes.length === 0 ||
          selectedListingTypes.includes(Number(property.listing_type));
        const isTypeMatched =
          selectedPropertyTypes.length === 0 ||
          selectedPropertyTypes.includes(Number(property.property_type));
        const isSubtypeMatched =
          selectedPropertySubTypes.length === 0 ||
          selectedPropertySubTypes.includes(Number(property.property_sub_type));

        return isListingTypeMatched && isTypeMatched && isSubtypeMatched;
      });

      console.log("Filtered Properties:", filtered);
      setFilteredProperties(filtered);
    };

    filterProperties();
  }, [
    selectedListingTypes,
    selectedPropertyTypes,
    selectedPropertySubTypes,
    propertyList,
  ]);

  const handleListingTypeChange = (listingTypeId) => {
    setSelectedListingTypes((prev) => {
      const newState = prev.includes(listingTypeId)
        ? prev.filter((id) => id !== listingTypeId)
        : [...prev, listingTypeId];
      console.log("Updated Listing Types:", newState);
      return newState;
    });
  };

  const handlePropertyTypeChange = (typeId) => {
    setSelectedPropertyTypes((prev) => {
      const newState = prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId];
      console.log("Updated Property Types:", newState);
      return newState;
    });
  };

  const handlePropertySubTypeChange = (subTypeId) => {
    setSelectedPropertySubTypes((prev) => {
      const newState = prev.includes(subTypeId)
        ? prev.filter((id) => id !== subTypeId)
        : [...prev, subTypeId];
      console.log("Updated Property Subtypes:", newState);
      return newState;
    });
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
            className="search-input rounded-start-pill p-3"
          />
          <select className="select-dropdown rounded-end-pill p-3">
            <option value="" disabled>
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
                        <div className={styles.subTypeContainer}>
                          {propertyList?.property_sub_type
                            ?.filter((subType) => subType.id === type.id)
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
            <h3> Search Properties</h3>
            <Form noValidate onSubmit="">
              <Form.Group controlId="validationCustom01" className="mt-4">
                <Form.Label>Bedrooms</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="bg-transparent rounded-pill"
                >
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="validationCustom01" className="mt-2">
                <Form.Label>Bathrooms</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="bg-transparent rounded-pill"
                >
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="validationCustomUsername" className="mt-2">
                <Form.Label>Min Price</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="enter max price"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="validationCustomUsername" className="mt-2"> 
                <Form.Label>Max Price</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter max limit"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                </InputGroup>
              </Form.Group>
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
                        {property.area} m²
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
