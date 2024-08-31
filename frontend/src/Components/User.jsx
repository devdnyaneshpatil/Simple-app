import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import UserCard from "./UserCard";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

function User({ token }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUserData = async (page) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/user?page=${page}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      setUserData(data.data.docs);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error.response?.data?.message ||
          "Failed to load data. Please try again."
      );
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (id) => {
    setSelectedUserId(id);
    setShowUpdateModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUserId(null);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUserId(null);
  };

  const renderPagination = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`btn btn-outline-primary mx-1 ${
            i === currentPage ? "active" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  useEffect(() => {
    fetchUserData(currentPage);
  }, [currentPage]);

  return (
    <div className="container mt-5">
      <ToastContainer />
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Profession</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              userData.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onDeleteClick={handleDeleteClick}
                  onEditClick={handleEditClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">{renderPagination()}</div>

      <DeleteUser
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        userId={selectedUserId}
        fetchUserData={fetchUserData}
        currentPage={currentPage}
        token={token}
      />

      <UpdateUser
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        userId={selectedUserId}
        fetchUserData={fetchUserData}
        currentPage={currentPage}
        token={token}
      />
    </div>
  );
}

export default User;
