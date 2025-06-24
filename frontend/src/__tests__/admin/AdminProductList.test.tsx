import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminProductList from "../../components/admin/AdminProductList";

// Mocks
const mockNavigate = jest.fn();
const mockDeleteProduct = jest.fn();
const mockFetchProducts = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("../../hooks/useProducts", () => ({
  useProducts: () => ({
    products: [
      {
        _id: "1",
        name: "Produto 1",
        category: "Categoria 1",
        price: 10,
      },
      {
        _id: "2",
        name: "Produto 2",
        category: "Categoria 2",
        price: 20,
      },
    ],
    loading: false,
    error: null,
    fetchProducts: mockFetchProducts,
    deleteProduct: mockDeleteProduct,
  }),
}));

describe("AdminProductList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("exibe lista de produtos", () => {
    render(<AdminProductList />);
    expect(screen.getByText("Produto 1")).toBeInTheDocument();
    expect(screen.getByText("Categoria 1")).toBeInTheDocument();
    expect(screen.getByText("R$ 10.00")).toBeInTheDocument();
    expect(screen.getByText("Produto 2")).toBeInTheDocument();
    expect(screen.getByText("Categoria 2")).toBeInTheDocument();
    expect(screen.getByText("R$ 20.00")).toBeInTheDocument();
  });

  test("navega para tela de adicionar produto ao clicar no botão", async () => {
    render(<AdminProductList />);
    const addButton = screen.getByRole("button", {
      name: /adicionar produto/i,
    });
    await userEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith("/admin/products/new");
  });

  test("navega para tela de editar produto ao clicar no botão editar", async () => {
    render(<AdminProductList />);
    const editButton = screen.getByTestId("edit-button-Produto 1");
    await userEvent.click(editButton);
    expect(mockNavigate).toHaveBeenCalledWith("/admin/products/edit/1");
  });

  test("abre diálogo de exclusão ao clicar no botão deletar", async () => {
    render(<AdminProductList />);
    const deleteButton = screen.getByTestId("delete-button-Produto 1");
    await userEvent.click(deleteButton);
    expect(screen.getByText(/confirmar exclusão/i)).toBeInTheDocument();
  });

  test("confirma exclusão e chama deleteProduct, exibe snackbar", async () => {
    mockDeleteProduct.mockResolvedValue(true);
    render(<AdminProductList />);
    const deleteButton = screen.getByTestId("delete-button-Produto 1");
    await userEvent.click(deleteButton);

    const deleteConfirmButton = screen.getByRole("button", {
      name: /excluir/i,
    });
    await userEvent.click(deleteConfirmButton);

    await waitFor(() => {
      expect(mockDeleteProduct).toHaveBeenCalledWith("1");
    });

    expect(
      screen.getByText(/produto excluído com sucesso/i)
    ).toBeInTheDocument();
  });
});
