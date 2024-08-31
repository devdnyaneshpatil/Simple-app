import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Using FontAwesome icons

function UserCard({ user, onDeleteClick, onEditClick }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.phoneNo}</td>
      <td>{user.profession}</td>
      <td>{user.email}</td>
      <td>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={() => onEditClick(user._id)}
        >
          <FaEdit />
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDeleteClick(user._id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default UserCard;
