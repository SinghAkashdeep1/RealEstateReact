import React, { useEffect, useState } from "react";
import styles from "./BuyProperty.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaHome, FaTape, FaCalculator } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { CgDetailsMore } from "react-icons/cg";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { propertyDetail } from "../../userStore/buyPropertyApi/buyPropertySlices"; // Adjust the import path as necessary
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const BuyProperty = () => {
  const dispatch = useDispatch();
  const { propertyData, loading, error } = useSelector(
    (state) => state.propertyBuy
  );
  const { id } = useParams(); // Assume this is your propertyId

  useEffect(() => {
    if (id) {
      console.log(
        "Fetching property details for:",
        propertyData?.user?.username
      );
      dispatch(propertyDetail(id));
    }
  }, [dispatch, id]);

  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    propertyPrice: "",
    downPayment: "",
    interestRate: "",
    period: "1",
    paymentFreq: "1",
  });
  const [mortgageAmount, setMortgageAmount] = useState(null);

  useEffect(() => {
    if (propertyData) {
      setSelectedImage(
        propertyData?.property?.image ||
          "https://via.placeholder.com/800x600?text=Image+1"
      );
    }
  }, [propertyData]);

  const renderAddress = () => {
    if (propertyData?.address && propertyData.address.length > 0) {
      const address = propertyData.address[0];
      return (
        <div>
          <p className={`${styles.PropertyAddress}`}>
            <FaLocationDot size={40} className="bg-transparent" />{" "}
            {`${address.location || "Location not available"}, ${
              address.city || "City not available"
            }
         ${address.city || "City not available"},
         ${address.state || "State not available"},
         ${address.country || "Country not available"},
         ${address.pincode || "Pincode not available"}`}
          </p>
        </div>
      );
    } else {
      return <p>Address not available</p>;
    }
  };

  const PropertyDetailBox = ({ Icon, text }) => (
    <div className={`${styles.PropBasicDetBox} bg-transparent`}>
      <Icon size={30} className="bg-transparent" />
      <h3 className={`${styles.PropBasicData}`}>{text}</h3>
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateMortgage = () => {
    const { propertyPrice, downPayment, interestRate, period, paymentFreq } =
      formData;
    const principal = parseFloat(propertyPrice) - parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const numberOfPayments = parseInt(period) * (paymentFreq === "1" ? 12 : 26); // Payment frequency: 1 for Monthly, 2 for Bi-Weekly

    if (
      isNaN(principal) ||
      isNaN(rate) ||
      isNaN(numberOfPayments) ||
      numberOfPayments <= 0
    ) {
      toast.error("Please enter valid numerical inputs.");
      setMortgageAmount("$0");
      return;
    }

    if (rate === 0) {
      setMortgageAmount((principal / numberOfPayments).toFixed(2));
      return;
    }

    const monthlyPayment =
      (principal * rate) / (1 - Math.pow(1 + rate, -numberOfPayments));
    setMortgageAmount(monthlyPayment.toFixed(2));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading property details: {error}</p>;

  return (
    <div className={`${styles.container}`}>
      <ToastContainer />
      <div className={`${styles.containerTitle}`}>
        <h1 className="bg-transparent">Property Detail</h1>
      </div>
      <Container>
        <Row>
          <Col>
            <div className={`${styles.PropertyDeatilContainer}`}>
              <div className={`${styles.sliderContainer}`}>
                <img
                  src={`http://127.0.0.1:8000/${selectedImage}`}
                  alt="Property"
                  className={`${styles.mainImage}`}
                  height={500}
                  width={500}
                />
              </div>
              <div className={`${styles.thumbnailContainer}`}>
                {propertyData?.sub_images &&
                  propertyData?.sub_images?.map((image, index) => (
                    <img
                      key={index}
                      src={`http://127.0.0.1:8000/${image.sub_images}`}
                      alt={`Thumbnail ${index}`}
                      className={`${styles.thumbnail}`}
                      onClick={() => setSelectedImage(image.sub_images)}
                    />
                  ))}
              </div>
            </div>
          </Col>
          <Col>
            <div className={`${styles.PropertyDeatil}`}>
              <div className={`${styles.PropPrimaryDet}`}>
                <h1 className={`${styles.PropertyPrice}`}>
                  C${propertyData?.property?.price || "0"}
                </h1>
                {renderAddress()}
              </div>
              <div className={`${styles.PropBasicDet}`}>
                <PropertyDetailBox
                  Icon={FaHome}
                  text={`${propertyData?.property?.status === "1" ? "Unsold" : "Sold"} `}
                />
                <PropertyDetailBox
                  Icon={() => <h3 className={`${styles.PropBasicData}`}>|</h3>}
                  text=""
                />
                <PropertyDetailBox
                  Icon={FaTape}
                  text={`${propertyData?.property?.area || "0"} sqft`}
                />
                <PropertyDetailBox
                  Icon={() => <h3 className={`${styles.PropBasicData}`}>|</h3>}
                  text=""
                />
                <PropertyDetailBox
                  Icon={IoBedSharp}
                  text={`${propertyData?.property?.bedrooms || "0"} Bedrooms`}
                />
                <PropertyDetailBox
                  Icon={() => <h3 className={`${styles.PropBasicData}`}>|</h3>}
                  text=""
                />
                <PropertyDetailBox
                  Icon={LiaBathSolid}
                  text={`${propertyData?.property?.bathrooms || "0"} Baths`}
                />
              </div>
              <div className={`${styles.PropPrimaryDet}`}>
                <h1 className={`${styles.PropertySeller}`}>
                  Seller :{" "}
                  <span className={`${styles.SellerName}`}>
                    {propertyData?.user?.username || "Unknown"}
                  </span>{" "}
                </h1>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={`${styles.contentSelector}`}>
              <div
                className={`${styles.contentSelectorButton} ${
                  activeTab === "details" ? styles.activeButton : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                <CgDetailsMore size={30} className="bg-transparent " />
                <p className="bg-transparent mt-2">Property Detail</p>
              </div>
              <div
                className={`${styles.contentSelectorButton} ${
                  activeTab === "calculator" ? styles.activeButton : ""
                }`}
                onClick={() => setActiveTab("calculator")}
              >
                <FaCalculator size={25} className="bg-transparent" />
                <p className="bg-transparent mt-2">Mortgage Calculator</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {activeTab === "details" ? (
              <div className={`${styles.containerDetail}`}>
                <div className={`${styles.basicDescriptionCont}`}>
                  <h2 className={styles.descriptionTitle}>Description</h2>
                  <p className={styles.descriptionText}>{`${
                    propertyData?.property?.description || "-"
                  } `}</p>
                  <h2 className={styles.descriptionTitle}>Count</h2>

                  <div className={styles.CountRow}>
                    <h1 className={styles.descriptionText}>Bedsrooms :</h1>
                    <p className={styles.descriptionText}>{`${
                    propertyData?.property?.bedrooms || "-"
                  } `}</p>
                  </div>

                  <div className={styles.CountRow}>
                    <h1 className={styles.descriptionText}>Bathroom :</h1>
                    <p className={styles.descriptionText}>{`${
                    propertyData?.property?.bathrooms || "-"
                  } `}</p>
                  </div>

                  <div className={styles.CountRow}>
                    <h1 className={styles.descriptionText}>Size :</h1>
                    <p className={styles.descriptionText}>{`${
                    propertyData?.property?.area || "-"
                  }sqft `}</p>
                  </div>
                  <h2 className={styles.descriptionTitle}>Price</h2>
                  <div className={styles.CountRow}>
                    <h1 className={styles.descriptionText}>Price :</h1>
                    <p className={styles.descriptionText}>{`$ ${
                    propertyData?.property?.price || "-"
                  } `}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${styles.calculatorContainerBox}`}>
                <h2 className={`${styles.calculatorTitle}`}>
                  Mortgage Calculator
                </h2>
                <div className={`${styles.contentCalculator}`}>
                  <div className={`${styles.calculatorContainer}`}>
                    <div className={`${styles.ResultTitle}`}>
                      Mortgage Amount
                    </div>
                    <div className={`${styles.Result}`}>
                      {mortgageAmount !== null ? `$${mortgageAmount}` : "$0"}
                    </div>
                  </div>

                  <div className={`${styles.calculationContainer}`}>
                    <div className={`${styles.ResultTitle}`}>
                      Mortgage Calculation
                    </div>
                    <div className={`${styles.inputContainer}`}>
                      <Form
                        noValidate
                        validated=""
                        onSubmit={(e) => {
                          e.preventDefault();
                          calculateMortgage();
                        }}
                        className={`${styles.calculationFormContainer}`}
                      >
                        <div className={`${styles.formRowContaner}`}>
                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="propertyPrice"
                            className="bg-transparent me-4"
                          >
                            <Form.Label className="bg-transparent">
                              Property Price
                            </Form.Label>
                            <Form.Control
                              required
                              type="number"
                              name="propertyPrice"
                              value={formData.propertyPrice}
                              onChange={handleChange}
                              placeholder="$  0"
                              className="border border-secondary bg-transparent rounded-pill"
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="period"
                            className="bg-transparent"
                          >
                            <Form.Label className="bg-transparent">
                              Authorization
                            </Form.Label>
                            <Form.Select
                              name="period"
                              value={formData.period}
                              onChange={handleChange}
                              className="border border-secondary bg-transparent rounded-pill"
                            >
                              <option value="1">5 Years</option>
                              <option value="2">10 Years</option>
                              <option value="3">15 Years</option>
                            </Form.Select>
                          </Form.Group>
                        </div>

                        <div className={`${styles.formRowContaner}`}>
                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="downPayment"
                            className="bg-transparent me-4"
                          >
                            <Form.Label className="bg-transparent">
                              Down Payment
                            </Form.Label>
                            <Form.Control
                              required
                              type="number"
                              name="downPayment"
                              value={formData.downPayment}
                              onChange={handleChange}
                              placeholder="$  0"
                              className="border border-secondary bg-transparent rounded-pill"
                            />
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="interestRate"
                            className="bg-transparent"
                          >
                            <Form.Label className="bg-transparent">
                              Interest Rate
                            </Form.Label>
                            <Form.Control
                              required
                              type="number"
                              name="interestRate"
                              value={formData.interestRate}
                              onChange={handleChange}
                              placeholder="%"
                              className="border border-secondary bg-transparent rounded-pill"
                            />
                          </Form.Group>
                        </div>
                        <div className={`${styles.formRowContaner}`}>
                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="paymentFreq"
                            className="bg-transparent"
                          >
                            <Form.Label className="bg-transparent">
                              Payment Freq
                            </Form.Label>
                            <Form.Select
                              name="paymentFreq"
                              value={formData.paymentFreq}
                              onChange={handleChange}
                              className="border border-secondary bg-transparent rounded-pill"
                            >
                              <option value="1">Monthly</option>
                              <option value="2">Bi-Weekly</option>
                            </Form.Select>
                          </Form.Group>
                        </div>
                        <div className={`${styles.formRowContaner}`}>
                          <button
                            type="submit"
                            className={`${styles.calculateButton}`}
                          >
                            Calculate
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BuyProperty;
