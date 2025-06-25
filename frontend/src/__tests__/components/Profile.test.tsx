import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../../components/Profile";
import api from "../../services/api";

jest.mock("../../services/api");

beforeEach(() => {
  (api.get as jest.Mock).mockResolvedValue({
    data: {
      username: "",
      email: "",
      cpf: "",
    },
  });
});

describe("Profile component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve carregar dados do perfil ao montar", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        username: "ricardo",
        email: "ricardo@email.com",
        cpf: "123.456.789-00",
      },
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(await screen.findByDisplayValue("ricardo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("ricardo@email.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123.456.789-00")).toBeInTheDocument();
  });

  it("deve mostrar mensagem de erro se falhar ao carregar dados", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Erro"));

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/não foi possível carregar seus dados/i)
      ).toBeInTheDocument();
    });
  });

  it("deve validar campos e impedir submissão com erros", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const nomeInput = screen.getByLabelText(/nome de usuário/i);
    const emailInput = screen.getByLabelText(/email/i);
    const cpfInput = screen.getByLabelText(/cpf/i);
    const senhaInput = screen.getByLabelText(/nova senha/i);
    await screen.findByRole("button", { name: /salvar/i });
    const botaoSalvar = screen.getByRole("button", { name: /salvar/i });

    fireEvent.change(nomeInput, { target: { value: "a" } });
    fireEvent.change(emailInput, { target: { value: "emailinvalido" } });
    fireEvent.change(cpfInput, { target: { value: "123" } });
    fireEvent.change(senhaInput, { target: { value: "123" } });

    fireEvent.click(botaoSalvar);

    expect(await screen.findByText(/nome muito curto/i)).toBeInTheDocument();
    expect(await screen.findByText(/email inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/cpf inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/senha muito curta/i)).toBeInTheDocument();
  });

  it("deve exibir mensagem de sucesso ao atualizar perfil", async () => {
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        username: "Ricardo",
        email: "ricardo@email.com",
        cpf: "123.456.789-00",
      },
    });

    (api.put as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Ricardo")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/perfil atualizado com sucesso/i)
      ).toBeInTheDocument();
    });
  });
});
