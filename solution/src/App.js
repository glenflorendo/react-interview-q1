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
    </div>
  );
}

export default App;
