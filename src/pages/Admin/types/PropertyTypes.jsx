import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Button, Table } from "react-bootstrap";
import { HiUsers } from "react-icons/hi";
import { FaTrash, FaUnlock, FaLock } from "react-icons/fa";
import ConfirmationDialog from "../../../components/Admin/Confirmation";
import Form from 'react-bootstrap/Form';
import { MdAddChart } from "react-icons/md";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import {
  propertyTypesList,
  deletePropertyType,
  propertyTypeStatus,
  addPropertyType
} from "../../../adminStore/typesApi/propertyTypes/propertyTypeSlices";

import styles from "../user/list.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyTypes = () => {
  const { propertyList, loading, error } = useSelector(
    (state) => state.propertyTypes
  );
  console.log(propertyList);
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(propertyTypesList());
  }, [dispatch]);

  const handleStatusUser = async (userId) => {
    try {
      const response = await dispatch(propertyTypeStatus(userId));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
      dispatch(propertyTypesList());
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update status";
      toast.error(errorMessage);
    }
  };

  const handleDeletePropertyType = async (userId) => {
    try {
      const response = await dispatch(deletePropertyType(userId));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Listing type deleted successfully");
      } else {
        toast.error("Failed to delete listing type");
      }
      dispatch(propertyTypesList());
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to delete listing type";
      toast.error(errorMessage);
    }
  };

  const openDeleteDialog = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const confirmDeletePropertyType = () => {
    if (userIdToDelete) {
      handleDeletePropertyType(userIdToDelete);
      setShowDeleteDialog(false);
    }
  };

  const handleAddPropertyType = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      const response = await dispatch(addPropertyType({ name }));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Property type added successfully");
        setName('');
        dispatch(propertyTypesList());
      } else {
        toast.error("Failed to add Property type");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add Property type";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Container fluid className="d-flex flex-column">
        <Row>
          <Col>
            <h2 className="p-2">
              <HiUsers /> Property Types List
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center">
          <Col className="d-flex flex-direction-row justify-content-start ml-4">
            <div className="mt-3">
              <MdAddChart size={70}/>
            </div>
            <Form onSubmit={handleAddPropertyType} noValidate>
              <div className="d-flex flex-direction-column align-items-start mb-2 ms-4 mt-3">
                <Form.Group className="mb-3" controlId="formName" style={{ flex: 1 }}>
                  <Form.Label><b>Add Property Type</b></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-pill"
                    required
                  />
                </Form.Group>
                <Button type="submit" className="btn btn-secondary mt-4 ms-2">
                    <IoCheckmarkDoneCircleSharp size={30} className="bg-transparent"/>
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover className="px-2 py-1 mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {propertyList?.property_type?.map((property_type, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{property_type.name}</td>
                    <td>
                      <Button
                        onClick={() => handleStatusUser(property_type.id)}
                        className={`btn ${
                          property_type.status === "1"
                            ? "btn btn-success"
                            : "btn btn-danger"
                        }`}
                      >
                        <b className="bg-transparent">
                          {property_type.status === "1" ? (
                            <FaUnlock className="bg-success" />
                          ) : (
                            <FaLock className="bg-danger" />
                          )}
                        </b>
                      </Button>
                    </td>
                    <td className="display-flex flex-column align-items-center">
                      <Button
                        onClick={() => openDeleteDialog(property_type.id)}
                        className="btn btn-danger"
                      >
                        <FaTrash className="bg-danger" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <ConfirmationDialog
        show={showDeleteDialog}
        onClose={closeDeleteDialog}
        onConfirm={confirmDeletePropertyType}
        message="Are you sure you want to delete this listing type?"
        className="bg-transparent"
      />
      <ToastContainer />
    </>
  );
};

export default PropertyTypes;
