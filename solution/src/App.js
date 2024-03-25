import { UsersProvider } from "./features/users/users-context";
import { UsersForm } from "./features/users/users-form";
import { UsersTable } from "./features/users/users-table";

function App() {
  return (
    <div className="App">
      <UsersProvider>
        <UsersForm />
        <UsersTable />
      </UsersProvider>
    </div>
  );
}

export default App;
