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

// Import CSS file
import styles from './list.module.css'; 

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userLists, loading, error } = useSelector((state) => state.user);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [filter, setFilter] = useState(null); // Filter state
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  useEffect(() => {
    // Fetch user list when filter or currentPage changes
    dispatch(userList({ page: currentPage, perPage: 10 }));
  }, [filter, currentPage, dispatch]);

  // Status handler
  const handleStatusUser = async (userId) => {
    await dispatch(userStatus(userId));
    dispatch(userList({ page: currentPage, perPage: 10 }));
  };

  // Delete handler
  const handleDeleteUser = async (userId) => {
    await dispatch(deleteUser(userId));
    dispatch(userList({ page: currentPage, perPage: 10 }));
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
    ? userLists?.users?.data?.filter(user => user.type == filter)
    : userLists?.users?.data;

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= userLists?.meta?.last_page) {
      setCurrentPage(pageNumber);
    }
  };

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
              onClick={() => setFilter(null)}
              className={`${styles.btnCustom}`}
            >
              <FaUserPlus className="bg-transparent" /> All
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              onClick={() => navigate("/admin/user/add")}
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
                    <td>{index + 1 + (currentPage - 1) * 10}</td>
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
            {/* Pagination Controls */}
            <div className="pagination d-flex justify-content-between align-items-center mt-3">
              <Button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span>Page {currentPage} of {userLists?.last_page}</span>
              <Button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === userLists?.last_page}
              >
                Next
              </Button>
            </div>
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
