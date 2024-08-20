import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row, Spinner, Button, Table } from "react-bootstrap";
import { HiUsers } from "react-icons/hi";
import { FaUserPlus, FaEdit, FaTrash, FaUnlock, FaLock } from "react-icons/fa";
import ConfirmationDialog from '../../../components/Admin/Confirmation'; 

import {
  userList, userStatus, deleteUser
} from "../../../adminStore/userApi/userApiSlice";

// Make sure to import the CSS file if it's not already imported
import styles from './list.module.css'; // Adjust the path as necessary

const List = () => {
  const navigate = useNavigate();
  const { userLists, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [filter, setFilter] = useState(null); // New state for filter

  useEffect(() => {
    // Fetch the user list with delay
    setTimeout(() => {
      dispatch(userList());
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    // Refetch user list when filter changes
    dispatch(userList());
  }, [filter, dispatch]);

  // Status handler
  const handleStatusUser = async (userId) => {
    await dispatch(userStatus(userId));
    dispatch(userList());
  };

  // Delete handler
  const handleDeleteUser = async (userId) => {
    await dispatch(deleteUser(userId));
    dispatch(userList());
  };

  const openDeleteDialog = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const confirmDeleteUser = () => {
    if (userIdToDelete) {
      handleDeleteUser(userIdToDelete);
      setShowDeleteDialog(false);
    }
  };

  // Filtered user lists
  const filteredUsers = filter 
    ? userLists?.users?.filter(user => user.type == filter)
    : userLists?.users;

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <>
      <Container fluid className="d-flex flex-column">
        <Row>
          <Col>
            <h2 className="p-2">
              <HiUsers /> Users List
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-between align-items-center">
          <Col className="d-flex justify-content-start">
            <Button
              onClick={() => setFilter(2)}
              className={`${styles.btnCustom}`}
            >
              <FaUserPlus className="bg-transparent"/> Buyer 
            </Button>
            <Button
              onClick={() => setFilter(3)}
              className={`${styles.btnCustom}`}
            >
              <FaUserPlus className="bg-transparent" /> Seller
            </Button>
            <Button
              onClick={() => setFilter()}
              className={`${styles.btnCustom}`}
            >
              <FaUserPlus className="bg-transparent" /> All
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              onClick={() => {
                navigate("/admin/user/add");
              }}
              className="bg-success border-0 d-flex justify-content-center"
            >
              <FaUserPlus className="mr-1 mt-1 bg-transparent " /> Add User
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover className="px-2 py-1 mt-3">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>E-mail</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        onClick={() => handleStatusUser(user.id)}
                        className={`btn ${
                          user.status === "1"
                            ? "btn btn-success"
                            : "btn btn-danger"
                        }`}
                      >
                        <b className="bg-transparent">
                          {user.status === "1" ? <FaUnlock className="bg-success"/> : <FaLock className="bg-danger"/>}
                        </b>
                      </Button>
                    </td>
                    <td className="display-flex flex-column align-items-center">
                      <Link
                        to={`/admin/user/edit/${user.id}`}
                        className="btn me-2 btn-info"
                      >
                        <FaEdit className="bg-info"/>
                      </Link>
                      <Button
                        onClick={() => openDeleteDialog(user.id)}
                        className="btn btn-danger"
                      >
                        <FaTrash className="bg-danger"/>
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
        onConfirm={confirmDeleteUser}
        message="Are you sure you want to delete this user?"
        className="bg-transparent"
      />
    </>
  );
};

export default List;
