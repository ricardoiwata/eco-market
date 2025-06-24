import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import UserList from "../../components/UserList";
import api from "../../services/api";

// Mock da API
jest.mock("../../services/api");

const mockUsers = [
  { _id: "1", username: "João", email: "joao@example.com" },
  { _id: "2", username: "Maria", email: "maria@example.com" },
];

describe("UserList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve carregar e exibir usuários", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockUsers });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByText("João")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Maria")).toBeInTheDocument();
    });
  });

  it("deve excluir usuário ao clicar no botão 'Deletar'", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockUsers });
    (api.delete as jest.Mock).mockResolvedValue({}); // Mock da deleção

    render(<UserList />);

    // Espera carregar os usuários
    await waitFor(() => {
      expect(screen.getByText("João")).toBeInTheDocument();
    });

    // Clica no botão Deletar do usuário João
    const deleteButton = screen.getAllByRole("button", { name: /deletar/i })[0];
    fireEvent.click(deleteButton);

    // Espera o João ser removido da tela
    await waitFor(() => {
      expect(screen.queryByText("João")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Maria")).toBeInTheDocument();
    });
  });

  it("deve lidar com erro na requisição", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Erro"));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/erro ao carregar usuários/i)
      ).toBeInTheDocument();
    });
  });
});
