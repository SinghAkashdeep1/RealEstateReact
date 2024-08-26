import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userPropertiesSell } from '../../userStore/dashboardApi/dashboardSlices';
import styles from "./UserDash.module.css";
import { GoDotFill } from "react-icons/go";
import { FaEye } from "react-icons/fa";
import Table from 'react-bootstrap/Table';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { userPropertiesData, loading } = useSelector(state => state.userDashBoard);
  const [showTable, setShowTable] = useState(false);
console.log(userPropertiesData?.data?.properties)
  useEffect(() => {
    dispatch(userPropertiesSell());
  }, [dispatch]);

  const handleEyeClick = () => {
    setShowTable(prevState => !prevState);
  };

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div className={styles.propertiesCountContainer}>
          <h2 className={styles.propertiesCountTitle}>Properties for Sell</h2>
          <h3 className={styles.propertiesCountNumber}>
            <GoDotFill className={styles.dotIcon} />{userPropertiesData?.data?.properties?.length}
          </h3>
        </div>
        <div className={styles.propertiesCountContainer}>
          <h3 className={styles.propertiesCountNumber}>
            <FaEye className={styles.dotIcon} onClick={handleEyeClick} />
          </h3>
        </div>
      </div>
      {showTable && (
        <div className={styles.dashboardContainer}>
          <div className={styles.propertiesTableContainer}>
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Address</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {userPropertiesData?.data?.properties?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <img src={`http://127.0.0.1:8000/${item.image}`} alt={`Property ${item.id}`} style={{ width: '100px', height: 'auto' }} />
                    </td>
                    <td>{item.price}</td>
                    <td>{item.status === '1' ? 'Unsold' : 'Sold'}</td>
                    <td>{item.address?.location}, {item.address?.city}, {item.address?.pincode}, {item.address?.country}, {item.address?.city}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
