import { useContext } from "react";
import { UsersContext } from "../users-context";
import "./users-table.css";

const EmptyTableBody = () => {
  return (
    <tr>
      <td colSpan={2}>
        <div className="empty-user-list-message">
          <strong>Nothing to show!</strong>
          <p>This list will automatically update once users complete the form above.</p>
        </div>
      </td>
    </tr>
  );
};

/**
 * UsersTable component representing a table for all users, including their names and locations.
 *
 * @component
 * @returns {JSX.Element}
 */
export const UsersTable = () => {
  const users = useContext(UsersContext);

  return (
    <table id="users-table">
      {/* Header */}
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Location</th>
      </tr>
      </thead>

      {/* Body */}
      <tbody>
      {users?.length > 0 ? (users.map((user, index) => (
        <tr key={`${index}-${user.name}-${user.location}`}>
          <td>{user.name}</td>
          <td>{user.location}</td>
        </tr>
      ))) : <EmptyTableBody />}
      </tbody>
    </table>
  );
};