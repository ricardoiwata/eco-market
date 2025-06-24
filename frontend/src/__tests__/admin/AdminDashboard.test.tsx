import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashboard from "../../components/admin/AdminDashboard";
import api from "../../services/api";

// Mock do módulo api
jest.mock("../../services/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("AdminDashboard component", () => {
  it("deve exibir estatísticas corretamente após carregar", async () => {
    mockedApi.get.mockImplementation((url) => {
      if (url === "/products") {
        return Promise.resolve({ data: [{}, {}, {}] }); // 3 produtos
      }
      if (url === "/users") {
        return Promise.resolve({ data: [{}, {}] }); // 2 usuários
      }
      return Promise.reject(new Error("Unknown endpoint"));
    });

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    // Spinner enquanto carrega
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    // Espera os números aparecerem
    await waitFor(() => {
      expect(screen.getByText("3")).toBeInTheDocument(); // totalProducts
    });
    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument(); // totalUsers
    });

    expect(screen.getByText("Produtos")).toBeInTheDocument();
    expect(screen.getByText("Usuários")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Gerenciar Produtos/i })
    ).toBeInTheDocument();
    const userButtons = screen.getAllByRole("button", {
      name: /Gerenciar Usuários/i,
    });
    expect(userButtons.length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("button", { name: /Adicionar Produto/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Ver Loja/i })
    ).toBeInTheDocument();
  });

  it("deve lidar com erro de requisição", async () => {
    mockedApi.get.mockRejectedValue(new Error("Erro na API"));

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    // Como os dados falharam, estatísticas continuam 0
    const allZeroElements = screen.getAllByText("0");
    expect(allZeroElements.length).toBeGreaterThan(0);
  });
});
