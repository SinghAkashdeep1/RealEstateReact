import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { propDetail, propStatus } from "../../../adminStore/propertyApi/propertyApiSlices";
import { useParams } from "react-router-dom";
import styles from './Detail.module.css';
import { FaHome, FaTape } from "react-icons/fa";
import { IoBedSharp } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { ToastContainer } from "react-toastify";
import { MdHomeWork } from "react-icons/md";
import { HiStatusOffline } from "react-icons/hi";
import { HiStatusOnline } from "react-icons/hi";

const PropDetail = () => {
  const dispatch = useDispatch();
  const { propDet, loading, error } = useSelector((state) => state.property);
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(propDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (propDet?.property?.image) {
      setSelectedImage(propDet?.property?.image);
    }
  }, [propDet]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const PropertyDetailBox = ({ Icon, text }) => (
    <div className={`${styles.PropBasicDetBox} bg-transparent`}>
      <Icon size={30} className="bg-transparent" />
      <h3 className={`${styles.PropBasicData}`}>{text}</h3>
    </div>
  );

  const renderAddress = () => {
    if (propDet?.address && propDet?.address?.length > 0) {
      const address = propDet?.address[0];
      return (
        <div>
          <p className={`${styles.PropertyAddress}`}>
            {`${address.location || "-"},
            ${address.city || "-"},
            ${address.state || "-"},
            ${address.country || "-"},
            ${address.pincode || "-"}`}
          </p>
        </div>
      );
    } else {
      return <p>Address not available</p>;
    }
  };

   // Status handler
   const handleStatusUser = async (propId) => {
    await dispatch(propStatus(propId));
    dispatch(propDetail(id));
  };

  return (
    <>
      <div className={`${styles.container}`}>
        <ToastContainer />
        <div className={`${styles.containerTitle}`}>
          <h1 className="bg-transparent">Property Detail</h1>
        </div>
        <Container>
          <Row>
            <Col sm={5}>
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
                  {propDet?.sub_images &&
                    propDet.sub_images.map((image, index) => (
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
            <Col sm={5}>
              <div className={`${styles.PropertyDeatil}`}>
                <div className={`${styles.PropPrimaryDet}`}>
                  <h1 className={`${styles.PropertyPrice}`}>
                    C${propDet?.property?.price || "0"}
                  </h1>
                  {renderAddress()}
                </div>
                <div className={`${styles.PropBasicDet}`}>
                  <PropertyDetailBox
                    Icon={FaHome}
                    text={`${propDet?.property?.bedrooms || "0"} Bedrooms`}
                  />
                  <PropertyDetailBox
                    Icon={() => <h3 className={`${styles.PropBasicData}`}>|</h3>}
                    text=""
                  />
                  <PropertyDetailBox
                    Icon={FaTape}
                    text={`${propDet?.property?.area || "0"} sqft`}
                  />
                  <PropertyDetailBox
                    Icon={() => <h3 className={`${styles.PropBasicData}`}>|</h3>}
                    text=""
                  />
                  <PropertyDetailBox
                    Icon={IoBedSharp}
                    text={`${propDet?.property?.bedrooms || "0"} Beds`}
                  />
                  <PropertyDetailBox
                    Icon={() => <h3 className={`${styles.PropBasicData}`}>|</h3>}
                    text=""
                  />
                  <PropertyDetailBox
                    Icon={LiaBathSolid}
                    text={`${propDet?.property?.bathrooms || "0"} Baths`}
                  />
                </div>
                <div className={`${styles.PropPrimaryDet}`}>
                  <h1 className={`${styles.PropertySeller}`}>
                    Seller :{" "}
                    <span className={`${styles.SellerName}`}>
                      {propDet?.user?.username || "Unknown"}
                    </span>{" "}
                  </h1>
                
                </div>
                <div className={`${styles.PropButton}`}>
                <button type="button"  onClick={() => handleStatusUser(propDet?.property?.id)}
                        className={`btn ${
                          propDet?.property?.status === "0"
                            ? "btn btn-success"
                            : "btn btn-danger"
                        } btn btn-primary btn-lg ms-5 mt-5`}>
                            { propDet?.property?.status  === "0" ? <p className="bg-transparent"><HiStatusOnline className="bg-success"/>Active</p>
                             : <p className="bg-transparent"><HiStatusOffline className="bg-danger"/>Inactive</p>}
                            </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PropDetail;
