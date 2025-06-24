import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../../components/Register";
import * as useAuthHookModule from "../../hooks/useAuth";

jest.mock("../../hooks/useAuth");

describe("Register component", () => {
  const mockHandleRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthHookModule.useAuthHooks as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      handleRegister: mockHandleRegister,
    });
  });

  it("deve validar campos e impedir submissão com erros", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nome de usuário/i), {
      target: { value: "a" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "emailinvalido" },
    });

    fireEvent.change(screen.getByTestId("input-cpf"), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByTestId("input-senha"), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByTestId("input-confirmar-senha"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));

    await waitFor(() => {
      expect(mockHandleRegister).not.toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText(/nome de usuário deve ter/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/cpf inválido/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/senha deve ter/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/senhas não coincidem/i)).toBeInTheDocument();
    });
  });

  it("deve chamar handleRegister com dados válidos", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nome de usuário/i), {
      target: { value: "usuario" },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "usuario@email.com" },
    });

    fireEvent.change(screen.getByTestId("input-cpf"), {
      target: { value: "123.456.789-00" },
    });

    fireEvent.change(screen.getByTestId("input-senha"), {
      target: { value: "123456" },
    });

    fireEvent.change(screen.getByTestId("input-confirmar-senha"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /criar conta/i }));

    await waitFor(() => {
      expect(mockHandleRegister).toHaveBeenCalledWith({
        username: "usuario",
        email: "usuario@email.com",
        cpf: "123.456.789-00",
        password: "123456",
      });
    });
  });

  it("deve exibir mensagem de erro do hook", async () => {
    (useAuthHookModule.useAuthHooks as jest.Mock).mockReturnValue({
      loading: false,
      error: "Erro ao registrar",
      handleRegister: mockHandleRegister,
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText(/erro ao registrar/i)).toBeInTheDocument();
  });
});
