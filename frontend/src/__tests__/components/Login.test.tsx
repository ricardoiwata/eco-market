import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../../components/Login";

jest.mock("../../hooks/useAuth", () => ({
  useAuthHooks: () => ({
    loading: false,
    error: "",
    handleLogin: jest.fn(),
  }),
}));

describe("Login Component", () => {
  it("deve renderizar os campos de usuário e senha", () => {
    render(<Login />);
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it("deve permitir digitação nos campos", async () => {
    render(<Login />);
    const userField = screen.getByLabelText(/usuário/i);
    const passwordField = screen.getByLabelText(/senha/i);

    await userEvent.type(userField, "testeuser");
    await userEvent.type(passwordField, "senhateste");

    expect(userField).toHaveValue("testeuser");
    expect(passwordField).toHaveValue("senhateste");
  });

  it("deve alternar a visibilidade da senha", async () => {
    render(<Login />);
    const toggleButton = screen.getByLabelText(/toggle password visibility/i);
    const passwordField = screen.getByLabelText(/senha/i);

    expect(passwordField).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);

    expect(passwordField).toHaveAttribute("type", "text");
  });

  it("deve chamar handleLogin ao enviar o formulário", async () => {
    const mockHandleLogin = jest.fn();
    jest.spyOn(require("../../hooks/useAuth"), "useAuthHooks").mockReturnValue({
      loading: false,
      error: "",
      handleLogin: mockHandleLogin,
    });

    render(<Login />);

    const userField = screen.getByLabelText(/usuário/i);
    const passwordField = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await userEvent.type(userField, "user");
    await userEvent.type(passwordField, "123456");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockHandleLogin).toHaveBeenCalledWith("user", "123456");
    });
  });

  it("deve exibir erro se fornecido", () => {
    jest.mocked(require("../../hooks/useAuth").useAuthHooks).mockReturnValue({
      loading: false,
      error: "Credenciais inválidas",
      handleLogin: jest.fn(),
    });

    render(<Login />);
    expect(screen.getByText(/credenciais inválidas/i)).toBeInTheDocument();
  });
});
