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
  listingTypesList,
  deletelistingType,
  listingTypeStatus,
  addlistingType
} from "../../../adminStore/typesApi/listingTypes/listTypeApiSlices";
import styles from "../user/list.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListingTypes = () => {
  const { typesList, loading, error } = useSelector(
    (state) => state.listingTypes
  );
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(listingTypesList());
  }, [dispatch]);

  const handleStatusUser = async (userId) => {
    try {
      await dispatch(listingTypeStatus(userId));
      dispatch(listingTypesList());
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handledeletelistingType = async (userId) => {
    try {
      await dispatch(deletelistingType(userId));
      dispatch(listingTypesList());
      toast.success("Listing type deleted successfully");
    } catch (error) {
      toast.error("Failed to delete listing type");
    }
  };

  const openDeleteDialog = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const confirmdeletelistingType = () => {
    if (userIdToDelete) {
      handledeletelistingType(userIdToDelete);
      setShowDeleteDialog(false);
    }
  };

  const handleAddListingType = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      await dispatch(addlistingType({ name }));
      setName('');
      dispatch(listingTypesList());
      toast.success("Listing type added successfully");
    } catch (error) {
      toast.error("Failed to add listing type");
    }
  };

  return (
    <>
      <Container fluid className="d-flex flex-column">
        <Row>
          <Col>
            <h2 className="p-2">
              <HiUsers /> Listing Types List
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center">
          <Col className="d-flex flex-direction-row justify-content-start ml-4">
           <div className="mt-3">
           <MdAddChart size={70}/>
           </div>
          <Form onSubmit={handleAddListingType} noValidate>
            <div className="d-flex flex-direction-column align-items-start mb-2 ms-4 mt-3">
              <Form.Group className="mb-3" controlId="formName" style={{ flex: 1 }}>
                <Form.Label><b>Add Listing Type</b></Form.Label>
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
                {typesList?.listing_type?.map((listing_type, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{listing_type.name}</td>
                    <td>
                      <Button
                        onClick={() => handleStatusUser(listing_type.id)}
                        className={`btn ${
                          listing_type.status === "1"
                            ? "btn btn-success"
                            : "btn btn-danger"
                        }`}
                      >
                        <b className="bg-transparent">
                          {listing_type.status === "1" ? (
                            <FaUnlock className="bg-success" />
                          ) : (
                            <FaLock className="bg-danger" />
                          )}
                        </b>
                      </Button>
                    </td>
                    <td className="display-flex flex-column align-items-center">
                      <Button
                        onClick={() => openDeleteDialog(listing_type.id)}
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
        onConfirm={confirmdeletelistingType}
        message="Are you sure you want to delete this user?"
        className="bg-transparent"
      />
      <ToastContainer />
    </>
  );
};

export default ListingTypes;
