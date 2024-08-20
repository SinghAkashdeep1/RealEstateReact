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
  propertySubTypesList,
  deletePropertySubType,
  propertySubTypeStatus,
  addPropertySubType
} from "../../../adminStore/typesApi/propertySubTypes/propSubTypeSlices";

import styles from "../user/list.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyTypes = () => {
  const { subPropertyList, loading, error } = useSelector(
    (state) => state.propertySubTypes
  );
  console.log(subPropertyList);
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(propertySubTypesList());
  }, [dispatch]);

  const handleStatusUser = async (userId) => {
    try {
      const response = await dispatch(propertySubTypeStatus(userId));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Status updated successfully");
      } else {
        toast.error("Failed to update status");
      }
      dispatch(propertySubTypesList());
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update status";
      toast.error(errorMessage);
    }
  };

  const handledeletePropertySubType = async (userId) => {
    try {
      const response = await dispatch(deletePropertySubType(userId));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Listing type deleted successfully");
      } else {
        toast.error("Failed to delete listing type");
      }
      dispatch(propertySubTypesList());
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

  const confirmdeletePropertySubType = () => {
    if (userIdToDelete) {
      handledeletePropertySubType(userIdToDelete);
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
      const response = await dispatch(addPropertySubType({ name }));
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Property sub-type added successfully");
        setName('');
        dispatch(propertySubTypesList());
      } else {
        toast.error("Failed to add Property sub-type");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to add Property sub-type";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Container fluid className="d-flex flex-column">
        <Row>
          <Col>
            <h2 className="p-2">
              <HiUsers /> Property Sub-Types List
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
                  <Form.Label><b>Add Property Sub-type</b></Form.Label>
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
                {subPropertyList?.property_sub_type?.map((property_sub_type, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{property_sub_type.name}</td>
                    <td>
                      <Button
                        onClick={() => handleStatusUser(property_sub_type.id)}
                        className={`btn ${
                          property_sub_type.status === "1"
                            ? "btn btn-success"
                            : "btn btn-danger"
                        }`}
                      >
                        <b className="bg-transparent">
                          {property_sub_type.status === "1" ? (
                            <FaUnlock className="bg-success" />
                          ) : (
                            <FaLock className="bg-danger" />
                          )}
                        </b>
                      </Button>
                    </td>
                    <td className="display-flex flex-column align-items-center">
                      <Button
                        onClick={() => openDeleteDialog(property_sub_type.id)}
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
        onConfirm={confirmdeletePropertySubType}
        message="Are you sure you want to delete this listing type?"
        className="bg-transparent"
      />
      <ToastContainer />
    </>
  );
};

export default PropertyTypes;
