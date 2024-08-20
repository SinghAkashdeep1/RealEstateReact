import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row, Spinner, Table, Button } from "react-bootstrap";
import { HiUsers } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import ConfirmationDialog from "../../../components/Admin/Confirmation";
import { propList, propStatus } from "../../../adminStore/propertyApi/propertyApiSlices";
import styles from "../user/list.module.css"; // Adjust the path as necessary
import { TbHomeStats } from "react-icons/tb";

const PropList = () => {
  const dispatch = useDispatch();
  const { propList: properties, addressList, loading, error, totalPages, currentPage } = useSelector((state) => state.property);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [filter, setFilter] = useState(null);
  console.log(addressList?.address); // 
  console.log(Array.isArray(addressList)); // This will log true if addressList is an array

  useEffect(() => {
    dispatch(propList({ page: currentPage || 1 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(propList({ page }));
    }
  };

  const filteredProperties = filter
    ? properties?.filter((prop) => prop.type === filter)
    : properties;

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error loading properties: {error.message}</div>;
  }

  const renderAddress = () => {
    if (addressList?.address && addressList?.address?.length > 0) {
      const address = addressList?.address[0]; 
      return (
        <div className="bg-transparent">
          <p className="bg-transparent">
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


  return (
    <>
      <Container fluid className="d-flex flex-column">
        <Row>
          <Col>
            <h2 className="p-2">
              <TbHomeStats /> Properties List
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover className="px-2 py-1 mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Property</th>
                  <th>Address</th>
                  <th>Price</th>
                  <th>Upload At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties?.map((prop, index) => {
                  const createdDate = new Date(prop.created_at);
                  const formattedDate = `${String(createdDate.getDate()).padStart(2, '0')}/${String(createdDate.getMonth() + 1).padStart(2, '0')}/${createdDate.getFullYear()}`;
                  
                  return (
                    <tr key={prop.id}>
                      <td>{(currentPage - 1) * 5 + index + 1}</td> {/* Adjust for pagination */}
                      <td>
                        <img
                          src={`http://127.0.0.1:8000/${prop.image}`}
                          width="200"
                          height="100"
                          alt="propImg"
                        />
                      </td>
                      <td>{renderAddress()}</td>
                      <td>{`$ ${prop.price}`}</td>
                      <td>{formattedDate}</td>
                      <td className="display-flex flex-column align-items-center">
                        <Link
                          to={`/admin/property/detail/${prop.id}`}
                          className="btn me-2 btn-info"
                        >
                          <FaEye className="bg-info " />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="mx-3">Page {currentPage} of {totalPages}</span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Container>
      <ConfirmationDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          // Confirm delete logic here
          setShowDeleteDialog(false);
        }}
        message="Are you sure you want to delete this property?"
        className="bg-transparent"
      />
    </>
  );
};

export default PropList;
