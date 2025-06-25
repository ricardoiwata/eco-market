import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
  };
});

jest.mock("../../services/api", () => ({
  __esModule: true,
  default: {
    post: jest.fn().mockResolvedValue({}),
  },
}));

describe("ProductForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.setTimeout(15000);

  it("submete formulário com dados válidos e navega para /admin/products", async () => {
    render(
      <MemoryRouter>
        <ProductForm />
      </MemoryRouter>
    );

    const nomeInput = screen.getByLabelText(/nome do produto/i);
    const descricaoInput = screen.getByLabelText(/descrição/i);
    const precoInput = screen.getByTestId("input-preco");
    const estadoSelect = screen.getByLabelText(/estado/i);
    const categoriaSelect = screen.getByLabelText(/categoria/i);
    const telefoneInput = screen.getByLabelText(/telefone do vendedor/i);
    const imagemInput = screen.getByTestId("input-url");
    const botaoSubmit = screen.getByTestId("submit-button");

    await userEvent.type(nomeInput, "Sabonete Natural");
    await userEvent.type(descricaoInput, "Sabonete vegano e artesanal");

    await userEvent.type(precoInput, "25,50");

    await userEvent.click(estadoSelect);
    const opcaoSP = await screen.findByRole("option", { name: "São Paulo" });
    await userEvent.click(opcaoSP);
    expect(estadoSelect).toHaveTextContent("São Paulo");

    await userEvent.click(categoriaSelect);
    const opcaoCosmeticos = await screen.findByRole("option", {
      name: "Cosméticos Naturais",
    });
    await userEvent.click(opcaoCosmeticos);
    expect(categoriaSelect).toHaveTextContent("Cosméticos Naturais");

    await userEvent.type(telefoneInput, "11987654321");
    await userEvent.type(imagemInput, "https://img.com/sabonete.jpg");

    expect(botaoSubmit).not.toBeDisabled();

    await userEvent.click(botaoSubmit);
  });
});
