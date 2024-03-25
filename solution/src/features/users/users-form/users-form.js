/**
 * UsersForm component representing a form for adding new users.
 *
 * @component
 * @returns {JSX.Element}
 */
export const UsersForm = () => {
  return (
    <form>
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
    </form>
  );
};