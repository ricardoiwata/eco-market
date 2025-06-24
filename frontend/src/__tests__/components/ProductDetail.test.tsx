import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "../../components/ProductDetail";
import api from "../../services/api";

// Mock de navegação
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => jest.fn(),
  };
});

// Mock da API
jest.mock("../../services/api");

const mockProduct = {
  id: "1",
  name: "Produto Teste",
  price: 99.99,
  description: "Descrição do produto",
  category: "Ecológico",
  state: "DF",
  image: "https://example.com/image.jpg",
  sellerPhone: "(61) 91234-5678",
  additionalImages: [],
};

describe("ProductDetail Component", () => {
  it("deve exibir o loading inicialmente", async () => {
    (api.get as jest.Mock).mockReturnValue(new Promise(() => {})); // pendente

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("deve exibir erro quando a requisição falha", async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/não foi possível carregar os detalhes/i)
      ).toBeInTheDocument();
    });
  });

  it("deve exibir mensagem de produto não encontrado", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: null });

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/produto não encontrado/i)).toBeInTheDocument();
    });
  });

  it("deve renderizar corretamente com dados válidos", async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockProduct });

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Produto Teste")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("R$ 99.99")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/Descrição do produto/)).toBeInTheDocument();
    });
  });

  it("deve abrir o WhatsApp ao clicar no botão", async () => {
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

    (api.get as jest.Mock).mockResolvedValue({ data: mockProduct });

    render(
      <MemoryRouter initialEntries={["/product/1"]}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("WhatsApp"));

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining("wa.me/5561912345678"),
      "_blank"
    );

    openSpy.mockRestore();
  });
});
