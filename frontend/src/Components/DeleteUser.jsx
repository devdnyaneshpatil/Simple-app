import React from "react";
import { Modal, Button } from "react-bootstrap"; // Using React-Bootstrap for modal
import axios from "axios";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteUser({ show, handleClose, userId, fetchUserData, currentPage, token }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`https://simple-app-8c2n.onrender.com/api/v1/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User deleted successfully.");
      handleClose();
      fetchUserData(currentPage); // Refetch the user data after deletion
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete user. Please try again."
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUser;
