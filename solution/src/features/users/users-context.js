import { createContext, useReducer } from "react";

const initialUsers = [];
const initialDispatch = (action) => {};

/**
 * Reducer function for users
 *
 * @param users - the current list of users
 * @param action - the action to mutate the list of users
 * @returns {*|*[]} - the mutated list of users
 */
const usersReducer = (users, action) => {
  switch (action.type) {
    case "add":
      // Add new user to the list
      return [...users, action.data];
    default:
      return users;
  }
};

export const UsersContext = createContext(initialUsers);
export const UsersDispatchContext = createContext(initialDispatch);

export const UsersProvider = ({ children }) => {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);

  return (
    <UsersContext.Provider value={users}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersContext.Provider>
  );
};
