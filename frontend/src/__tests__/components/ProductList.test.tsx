import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductList from "../../components/ProductList";
import api from "../../services/api";

jest.mock("../../services/api");

const mockProducts = [
  {
    _id: "1",
    name: "Sabonete Natural",
    price: 15.5,
    createdAt: "2024-06-01T00:00:00.000Z",
    category: "Cosméticos Naturais",
    image: "https://example.com/image.jpg",
  },
];

describe("ProductList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve mostrar loading inicialmente", async () => {
    (api.get as jest.Mock).mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("deve exibir erro ao falhar na requisição", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("Erro de API"));

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/erro ao carregar produtos/i)
      ).toBeInTheDocument();
    });
  });

  it("deve exibir produtos ao carregar com sucesso", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockProducts });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Sabonete Natural")).toBeInTheDocument();
    });
  });

  it("deve filtrar produtos pela busca", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockProducts });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/buscar produtos/i);
    fireEvent.change(input, { target: { value: "Sabonete" } });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith("/products", expect.any(Object));
    });
  });

  it("deve mostrar mensagem quando nenhum produto é encontrado", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [] });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/nenhum produto encontrado/i)
      ).toBeInTheDocument();
    });
  });

  it("deve mudar de categoria ao clicar", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockProducts });

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const button = await screen.findByText("Cosméticos Naturais");
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(
        "/products",
        expect.objectContaining({ params: expect.any(Object) })
      );
    });
  });
});
