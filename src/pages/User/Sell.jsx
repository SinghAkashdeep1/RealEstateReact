import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { addProperty, typeList } from "../../userStore/sellPopertyApi/addPropertySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Sell.module.css";
import { useDispatch, useSelector } from "react-redux";

const countriesData = {
  USA: ["California", "Florida", "New York", "Texas"],
  India: ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  Australia: ["New South Wales", "Victoria", "Queensland"],
};

const Sell = () => {
  const dispatch = useDispatch();

  const { typeLists, loading, error } = useSelector((state) => state.propertyAdd);
  console.log(typeLists, "fgdg");

  useEffect(() => {
    dispatch(typeList());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    description: "",
    price: "",
    area: "",
    mainImage: null,
    images: [],
    country: "",
    state: "",
    city: "",
    pincode: "",
    bedrooms: "",
    bathrooms: "",
    location: "",
    property_type: "",
    property_sub_type: "",
    listing_type: "",
  });

  const [filteredSubTypes, setFilteredSubTypes] = useState([]);

  const handleCountryChange = (event) => {
    const country = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      country: country,
      state: "",
    }));
  };

  const handleStateChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      state: event.target.value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name } = event.target;
    if (name === "mainImage") {
      setFormData((prevData) => ({
        ...prevData,
        mainImage: event.target.files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        images: Array.from(event.target.files),
      }));
    }
  };

  const handlePropertyTypeChange = (event) => {
    const selectedType = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      property_type: selectedType,
      property_sub_type: "",
    }));

    const filtered = typeLists?.property_sub_type?.filter(
      (subType) => subType.property_type_id === selectedType
    );
    setFilteredSubTypes(filtered);
  };

  const validateForm = () => {
    const {
      price,
      description,
      area,
      state,
      country,
      city,
      pincode,
      location,
      bedrooms,
      bathrooms,
      property_type,
      property_sub_type,
      listing_type,
      mainImage,
      images,
    } = formData;

    // Check if the required fields are filled out
    if (!property_sub_type && !price && !description && !area && !state && !country && !city && !pincode && !location
        && !bedrooms && !bathrooms && !property_type && !property_sub_type && !listing_type && !mainImage){
        toast.error("Please fill required fields!");
        return false;
      }
    if (!property_sub_type) {
      toast.error("Property subtype is required!");
      return false;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Valid price is required!");
      return false;
    }
    if (!description) {
      toast.error("Property summary is required!");
      return false;
    }
    if (!area) {
      toast.error("Area is required!");
      return false;
    }
  
    if (!state) {
      toast.error("State is required!");
      return false;
    }
    if (!country) {
      toast.error("Country is required!");
      return false;
    }
    if (!city) {
      toast.error("City is required!");
      return false;
    }
    if (!pincode) {
      toast.error("Pincode is required!");
      return false;
    }
    if (!location) {
      toast.error("Location is required!");
      return false;
    }
    if (!bedrooms || isNaN(bedrooms) || Number(bedrooms) < 0) {
      toast.error("Valid number of bedrooms is required!");
      return false;
    }
    if (!bathrooms || isNaN(bathrooms) || Number(bathrooms) < 0) {
      toast.error("Valid number of bathrooms is required!");
      return false;
    }
    if (!listing_type) {
      toast.error("Listing type is required!");
      return false;
    }
    if (!mainImage) {
      toast.error("Main image is required!");
      return false;
    }

    return true; // If all validations pass
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    const { area, mainImage, images } = formData;
    const [value, unit] = area.split(" ");
    const areaValue = parseFloat(value);
    let areaInSqft = areaValue;

    if (unit === "sqm") {
      areaInSqft *= 10.7639;
    } else if (unit === "hectare") {
      areaInSqft *= 107639;
    }

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images" && key !== "mainImage") {
        formDataToSubmit.append(key, value);
      }
    });
    formDataToSubmit.append("area", areaInSqft.toFixed(2));
    formDataToSubmit.append("image", mainImage);
    images.forEach((image) => {
      formDataToSubmit.append("sub_images[]", image);
    });

    try {
      const resultAction = await dispatch(addProperty(formDataToSubmit));
      if (addProperty.fulfilled.match(resultAction)) {
        toast.success("Property added successfully!");
      } else {
        toast.error(resultAction.payload.message || "Error adding property.");
      }
    } catch (error) {
      toast.error(
        "Error adding property: " + (error.message || "Unknown error")
      );
    }
  };

  // Check if token exists in localStorage
  const token = localStorage.getItem("token");

  return (
    <div className={styles.addPopertyBlock}>
      <ToastContainer />
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <h1 className={styles.titleText}>Property Detail</h1>
          <p className="bg-transparent text-white">
            Home {`>`} Property Details{" "}
          </p>
        </div>
      </div>

      <div className={styles.inputContainer}>
        {!token ? (
          <p className="text-danger">Login to access!</p>
        ) : (
          <Card className="p-4">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formLabel" className={styles.formLabel}>
                  <Form.Label className={styles.formLabelText}>
                    Property Detail
                  </Form.Label>
                </Form.Group>

                <Form.Group controlId="formPrice" className="py-4 px-4">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formdescription" className="py-2 px-4">
                  <Form.Label>Property Summary</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="formBedrooms" className="py-2 px-4">
                      <Form.Label>No. of Bedrooms</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter number of bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBathrooms" className="py-2 px-4">
                      <Form.Label>No. of Bathrooms</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter number of bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formArea" className="py-2 px-4">
                      <Form.Label>Area</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Area (e.g., 1500 sqft, 200 sqm, 0.5 hectare)"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formMainImage" className="py-2 px-4">
                  <Form.Label>Main Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="mainImage"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Form.Group>

                <Form.Group controlId="formSubImages" className="py-2 px-4 mb-4">
                  <Form.Label>Sub Images</Form.Label>
                  <Form.Control
                    type="file"
                    name="sub_images"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                  />
                </Form.Group>

                <Form.Group
                  controlId="formLabel"
                  className={`${styles.formLabel} `}
                >
                  <Form.Label className={styles.formLabelText}>
                    Property Address
                  </Form.Label>
                </Form.Group>

                <Form.Group controlId="formLocation" className="py-4 px-4">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="formCity" className="py-2 px-4">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPincode" className="py-2 px-4">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formCountry" className="py-3 px-4 mb-4">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        as="select"
                        name="country"
                        value={formData.country}
                        onChange={handleCountryChange}
                      >
                        <option value="">Select Country</option>
                        {Object.keys(countriesData).map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formState" className="py-3 px-4">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        as="select"
                        name="state"
                        value={formData.state}
                        onChange={handleStateChange}
                        disabled={!formData.country}
                      >
                        <option value="">Select State</option>
                        {formData.country &&
                          countriesData[formData.country].map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group
                  controlId="formLabel"
                  className={`${styles.formLabel} `}
                >
                  <Form.Label className={styles.formLabelText}>
                    Property Types
                  </Form.Label>
                </Form.Group>

                <Form.Group controlId="formPropertyType" className="py-3 px-4">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="property_type"
                    value={formData.property_type}
                    onChange={handlePropertyTypeChange}
                  >
                    <option value="">Select property type</option>
                    {typeLists?.property_type?.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {filteredSubTypes.length > 0 && (
                  <Form.Group controlId="formPropertySubtype" className="py-3 px-4">
                    <Form.Label>Property Subtype</Form.Label>
                    <Form.Control
                      as="select"
                      name="property_sub_type"
                      value={formData.property_sub_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select property subtype</option>
                      {filteredSubTypes.map((subType) => (
                        <option key={subType.id} value={subType.id}>
                          {subType.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                )}

                <Form.Group controlId="formListingType" className="py-2 px-4">
                  <Form.Label>Listing Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="listing_type"
                    value={formData.listing_type}
                    onChange={handleInputChange}
                  >
                    <option value="">Select listing type</option>
                    {typeLists?.listing_type?.map((listing) => (
                      <option key={listing.id} value={listing.id}>
                        {listing.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <div className="py-2 px-4">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Sell;
