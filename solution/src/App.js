function App() {
  return (
    <div className="App">
      <form>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />

        <label htmlFor="location">Location</label>
        <select id="location" name="location">
          <option value="Canada">Canada</option>
          <option value="China">China</option>
          <option value="USA">USA</option>
          <option value="Brazil">Brazil</option>
        </select>

        <button type="reset">Clear</button>
        <button type="submit">Add</button>
      </form>

      <table>
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
        </tr>
        </thead>

        <tbody>
        <tr>
          <td>Name 1</td>
          <td>Location 1</td>
        </tr>
        <tr>
          <td>Name 2</td>
          <td>Location 2</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
