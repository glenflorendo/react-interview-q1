import { useContext } from "react";
import { UsersContext } from "../users-context";

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
      {users.map((user, index) => (
        <tr key={`${index}-${user.name}-${user.location}`}>
          <td>{user.name}</td>
          <td>{user.location}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
};