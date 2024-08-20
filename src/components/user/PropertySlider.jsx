import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PropertySlider.module.css";
import { MdArrowOutward, MdKingBed } from "react-icons/md";
import { FaRegHeart, FaTape } from "react-icons/fa";
import { GiKitchenTap } from "react-icons/gi";
import { propertiesList } from '../../userStore/buyPropertyApi/buyPropertySlices';

const PropertySlider = () => {
  const dispatch = useDispatch();
  const { propertyList, loading, error } = useSelector((state) => state.propertyBuy);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3; // Show 3 cards at a time

  // Ensure propertyList and propertyList.property_list are defined
  const properties = propertyList?.property_list || [];
  const totalProperties = properties.length;

  useEffect(() => {
    dispatch(propertiesList());
  }, [dispatch]);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerSlide) % totalProperties);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerSlide + totalProperties) % totalProperties);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index * itemsPerSlide);
  };

  // Calculate the properties to display
  const displayedProperties = properties.slice(currentIndex, currentIndex + itemsPerSlide);
  const totalDots = Math.ceil(totalProperties / itemsPerSlide);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const getAddress = (propertyId) => {
    const address = propertyList?.address?.find(
      (addr) => addr.property_id == propertyId
    );
    return address
      ? `${address.location}, ${address.city}, ${address.pincode}, ${address.state}, ${address.country}`
      : "Unknown Address";
  };
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.backgroundSlider1}></div>
      <div className={styles.backgroundSlider2}></div>
      <div className={styles.PropertySliderContainer}>
        <div className={`${styles.sliderTitleContainer} bg-transparent `}>
          <h1 className={`${styles.sliderTitle} bg-transparent`}>New Deals In Your Area</h1>
          <button type="button" className="btn btn-primary rounded-pill">
            <MdArrowOutward size={20} className="bg-transparent" /> View all new Deals
          </button>
        </div>

        <div className={styles.slider}>
          <button className={styles.arrow} onClick={prevCard} disabled={currentIndex === 0}>
            &lt;
          </button>
          <div className={styles.cardContainer}>
            {displayedProperties.length > 0 ? (
              displayedProperties.map((property) => (
                <div key={property.id} className={styles.propertyDataBox}>
                  <div className={styles.propertyImgContainer}>
                    <img src={`http://127.0.0.1:8000/${property.image}`} alt={property.address} className={styles.propertyImage} />
                  </div>
                  <div className={styles.propertyPrimaryInfo}>
                    <div className={styles.propertyTitle}>
                      <h4 className={styles.propertyTitleText}>{property.price}</h4>
                      <FaRegHeart className={styles.propertySelectFav} />
                    </div>
                    <div className={styles.propertyTitleAddress}>{getAddress(property.id)}</div>
                    <div className={`${styles.propertyCountRooms} p-2`}>
                      <p className="bg-transparent"><MdKingBed size={25} className="bg-transparent"/> {property.bedrooms} |</p>
                      <p className="bg-transparent"><GiKitchenTap size={25} className="bg-transparent" /> {property.bathrooms} |</p>
                      <p className="bg-transparent"><FaTape size={25} className="bg-transparent"/> {property.area} sqft</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No properties available.</p>
            )}
          </div>
          <button className={styles.arrow} onClick={nextCard} disabled={currentIndex >= totalProperties - itemsPerSlide}>
            &gt;
          </button>
        </div>

        <div className={styles.dotsContainer}>
          {totalDots > 0 && Array.from({ length: totalDots }, (_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${currentIndex / itemsPerSlide === index ? styles.activeDot : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySlider;
