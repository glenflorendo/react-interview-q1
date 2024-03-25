import { UsersProvider } from "./features/users/users-context";
import { UsersForm } from "./features/users/users-form";
import { UsersTable } from "./features/users/users-table";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <div className="section-container">
          <UsersForm />
        </div>

        <div className="section-container">
          <UsersTable />
        </div>
      </UsersProvider>
    </div>
  );
}

export default App;
