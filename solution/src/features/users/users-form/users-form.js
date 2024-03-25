import { useContext, useEffect, useState } from "react";
import { UsersDispatchContext } from "../users-context";
import { getLocations, isNameValid } from "../../../mock-api/apis";
import { debounce } from "../../../utilities";
import "./users-form.css";

const NAME_INPUT_STATES = {
  loading: "loading",
  error: "error",
  success: "success",
};

const NAME_INPUT_STATE_MSG = {
  [NAME_INPUT_STATES.loading]: "Checking name...",
  [NAME_INPUT_STATES.error]: "This name has already been taken.",
  [NAME_INPUT_STATES.success]: "This name is available!",
};

/**
 * Debounced name validation to reduce API calls
 * @type {function(...[*]): Promise<*>}
 */
const debouncedValidateName = debounce(async (name) => {
  if (!name) return false;
  return await isNameValid(name);
}, 300);

/**
 * UsersForm component representing a form for adding new users.
 *
 * @component
 * @returns {JSX.Element}
 */
export const UsersForm = () => {
  const dispatch = useContext(UsersDispatchContext);

  const [isFormValid, setFormValid] = useState(false);
  const [nameState, setNameState] = useState(null);
  const [locations, setLocations] = useState([]);

  /**
   * Reset form.
   */
  const onFormReset = () => {
    setFormValid(false);
    setNameState(null);
  };

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
    setNameState(null);

    const name = event.target.value;

    if (!name) {
      setNameState(null);
      return;
    }

    setNameState("loading");
    debouncedValidateName(name)
      .then((isValid) => {
        isValid
          ? setNameState("success")
          : setNameState("error");
        setFormValid(isValid);
      })
      .catch((error) => {
        setNameState(null);
        setFormValid(false);
        console.error(error);
      });
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
    <form id="users-form" onSubmit={onFormSubmit} onReset={onFormReset}>
      <div className="container">
        {/* Input field to enter user's name */}
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <div>
            <input id="name" name="name" type="text" onChange={onNameInputChange} required />
            {/* Input message */}
            {nameState && (
              <div className={`message ${NAME_INPUT_STATES[nameState]}`}>{NAME_INPUT_STATE_MSG[nameState]}</div>)}
          </div>
        </div>

        {/* Dropdown to select user's location */}
        <div className="input-group">
          <label htmlFor="location">Location</label>
          <select id="location" name="location" required>
            {locations.map((location) => <option key={location}>{location}</option>)}
          </select>
        </div>
      </div>

      <div className="button-group">
        {/* Button to clear the form */}
        <button type="reset">Clear</button>

        {/* Button to submit the form */}
        <button type="submit" disabled={!isFormValid}>Add</button>
      </div>
    </form>);
};