import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserManagement from "../../components/admin/UserManagement";

import * as usersHook from "../../hooks/useUsers";

jest.mock("../../hooks/useUsers", () => ({
  useUsers: jest.fn(),
}));
const mockUpdateUserRole = jest.fn(() => Promise.resolve(true));

describe("UserManagement", () => {
  const useUsersMock = usersHook.useUsers as jest.Mock;

  const usersMockData = [
    {
      _id: "1",
      username: "usuario1",
      email: "usuario1@email.com",
      role: "consumer",
    },
    {
      _id: "2",
      username: "adminUser",
      email: "admin@email.com",
      role: "admin",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("exibe spinner quando carregando", () => {
    useUsersMock.mockReturnValue({
      users: [],
      loading: true,
      error: null,
      fetchUsers: jest.fn(),
      deleteUser: jest.fn(),
      updateUserRole: jest.fn(),
    });

    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("exibe mensagem de erro", () => {
    const fetchUsersMock = jest.fn();

    useUsersMock.mockReturnValue({
      users: [],
      loading: false,
      error: "Erro ao carregar usuários",
      fetchUsers: fetchUsersMock,
      deleteUser: jest.fn(),
      updateUserRole: jest.fn(),
    });

    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    const errorElements = screen.getAllByText(/erro ao carregar usuários/i);
    expect(errorElements.length).toBe(2);

    const tryAgainButton = screen.getByRole("button", {
      name: /tentar novamente/i,
    });
    fireEvent.click(tryAgainButton);

    expect(fetchUsersMock).toHaveBeenCalled();
  });

  test("renderiza lista de usuários", () => {
    useUsersMock.mockReturnValue({
      users: usersMockData,
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
      deleteUser: jest.fn(),
      updateUserRole: jest.fn(),
    });

    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    expect(screen.getByText("usuario1")).toBeInTheDocument();
    expect(screen.getByText("usuario1@email.com")).toBeInTheDocument();
    expect(screen.getByText("adminUser")).toBeInTheDocument();
  });

  test("abre diálogo para confirmar exclusão e confirma exclusão", async () => {
    const deleteUserMock = jest.fn(() => Promise.resolve(true));

    useUsersMock.mockReturnValue({
      users: usersMockData,
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
      deleteUser: deleteUserMock,
      updateUserRole: jest.fn(),
    });

    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    const deleteButton = screen.getByTestId("delete-button-usuario1");
    fireEvent.click(deleteButton);

    expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();

    const confirmButton = screen.getByRole("button", { name: /excluir/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteUserMock).toHaveBeenCalledWith("1");
    });
    await waitFor(() => {
      expect(screen.queryByText(/confirmar exclusão/i)).not.toBeInTheDocument();
    });
  });

  test("botão deletar desabilitado para admin", () => {
    useUsersMock.mockReturnValue({
      users: usersMockData,
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
      deleteUser: jest.fn(),
      updateUserRole: jest.fn(),
    });

    render(
      <BrowserRouter>
        <UserManagement />
      </BrowserRouter>
    );

    const adminDeleteButton = screen.getByTestId("delete-button-adminUser");
    expect(adminDeleteButton).toBeDisabled();

    const userDeleteButton = screen.getByTestId("delete-button-usuario1");
    expect(userDeleteButton).not.toBeDisabled();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    useUsersMock.mockReturnValue({
      users: [
        {
          _id: "1",
          username: "johndoe",
          email: "john@example.com",
          role: "consumer",
        },
      ],
      loading: false,
      error: null,
      fetchUsers: jest.fn(),
      deleteUser: jest.fn(),
      updateUserRole: mockUpdateUserRole,
    });
  });
});
