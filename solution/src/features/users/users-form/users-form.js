import { useContext, useEffect, useState } from "react";
import { UsersDispatchContext } from "../users-context";
import { getLocations, isNameValid } from "../../../mock-api/apis";

/**
 * UsersForm component representing a form for adding new users.
 *
 * @component
 * @returns {JSX.Element}
 */
export const UsersForm = () => {
  const dispatch = useContext(UsersDispatchContext);

  const [locations, setLocations] = useState([]);

  /**
   * Handles form submission.
   * @param event
   */
  const onFormSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    dispatch({ type: "add", data });
    event.target.reset();
  };

  /**
   * Handles name input change.
   * @param event
   * @returns {Promise<void>}
   */
  const onNameInputChange = async (event) => {
    const name = event.target.value;
    const isValid = await isNameValid(name);
    isValid
      ? console.debug("Name is valid:", name)
      : console.debug("Name is invalid:", name);
  };

  /**
   * On mount
   */
  useEffect(() => {
    /**
     * Fetch locations data
     */
    getLocations()
      .then(setLocations)
      .catch(console.error);
  }, []);

  return (
    <form onSubmit={onFormSubmit}>
      {/* Input field to enter user's name */}
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" onChange={onNameInputChange} required />

      {/* Dropdown to select user's location */}
      <label htmlFor="location">Location</label>
      <select id="location" name="location" required>
        {locations.map((location) => <option key={location}>{location}</option>)}
      </select>

      {/* Button to clear the form */}
      <button type="reset">Clear</button>

      {/* Button to submit the form */}
      <button type="submit">Add</button>
    </form>);
};