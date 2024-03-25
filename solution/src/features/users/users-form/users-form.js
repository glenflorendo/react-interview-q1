import { useContext } from "react";
import { UsersDispatchContext } from "../users-context";

/**
 * UsersForm component representing a form for adding new users.
 *
 * @component
 * @returns {JSX.Element}
 */
export const UsersForm = () => {
  const dispatch = useContext(UsersDispatchContext);

  /**
   * Handles form submission.
   * @param event
   */
  const onFormSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    dispatch({ type: "add", data });
  };

  return (
    <form onSubmit={onFormSubmit}>
      {/* Input field to enter user's name */}
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" />

      {/* Dropdown to select user's location */}
      <label htmlFor="location">Location</label>
      <select id="location" name="location">
        <option value="Canada">Canada</option>
        <option value="China">China</option>
        <option value="USA">USA</option>
        <option value="Brazil">Brazil</option>
      </select>

      {/* Button to clear the form */}
      <button type="reset">Clear</button>

      {/* Button to submit the form */}
      <button type="submit">Add</button>
    </form>);
};