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

  const [isFormValid, setFormValid] = useState(false);
  const [locations, setLocations] = useState([]);

  /**
   * Handles form submission.
   *
   * If the form is valid, parse the form data and dispatch the add action. Then, reset and invalidate the form to
   * prepare for the next submission.
   *
   * @param event
   */
  const onFormSubmit = (event) => {
    if (!isFormValid) return;

    event.preventDefault();

    const form = new FormData(event.target);
    const data = Object.fromEntries(form.entries());

    dispatch({ type: "add", data });
    event.target.reset();
    setFormValid(false);
  };

  /**
   * Handles name input change.
   *
   * On every change, invalidate the form. If the name is empty, do nothing. Otherwise, validate the name and set
   * the form validity accordingly.
   *
   * @param event
   * @returns {Promise<void>}
   */
  const onNameInputChange = async (event) => {
    setFormValid(false);

    const name = event.target.value;

    if (!name) return;
    const isValid = await isNameValid(name);
    isValid
      ? setFormValid(true)
      : setFormValid(false);
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
      <button type="submit" disabled={!isFormValid}>Add</button>
    </form>);
};