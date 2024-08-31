import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap"; 
import axios from "axios";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateUser({ show, handleClose, userId, fetchUserData, currentPage, token }) {
  const [userData, setUserData] = useState({
    name: "",
    phoneNo: "",
    profession: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const { data } = await axios.get(`https://simple-app-8c2n.onrender.com/api/v1/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(data.data);
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to load user data. Please try again."
          );
        }
      };
      fetchUserDetails();
    }
  }, [userId, token]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await axios.patch(
        `https://simple-app-8c2n.onrender.com/api/v1/user/${userId}`,
        {
          name: userData.name,
          phoneNo: userData.phoneNo,
          profession: userData.profession,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("User updated successfully.");
      handleClose();
      fetchUserData(currentPage); 
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update user. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="phoneNo"
              value={userData.phoneNo}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Profession</Form.Label>
            <Form.Control
              type="text"
              name="profession"
              value={userData.profession}
              onChange={handleInputChange}
              placeholder="Enter profession"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              readOnly
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateUser;
