import * as React from "react";
import { getUsers } from "./services/usersAPI";
import { User } from "./types";

interface ContextType {
  selected: User | null;
  setSelected: React.Dispatch<React.SetStateAction<User | null>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const Context = React.createContext<ContextType>({
  selected: null,
  setSelected: () => {
    return;
  },
  users: [],
  setUsers: () => {
    return;
  },
});

interface ContexProps {
  children: React.ReactNode;
  initialUsers: User[] | [];
}

export const ContextProvider: React.FC<ContexProps> = ({
  children,
  initialUsers,
}) => {
  const [selected, setSelected] = React.useState<User | null>(
    JSON.parse(localStorage.getItem("selectedUser") || "null")
  );
  const [users, setUsers] = React.useState<User[]>(initialUsers);

  React.useEffect(() => {
    if (!users.length) {
      setUsers(getUsers());
    }
  }, [setUsers, users.length]);

  React.useEffect(() => {
    localStorage.setItem("selectedUser", JSON.stringify(selected));
  }, [selected]);

  return (
    <Context.Provider
      value={{
        selected,
        setSelected,
        users,
        setUsers,
      }}
    >
      {children}
    </Context.Provider>
  );
};
