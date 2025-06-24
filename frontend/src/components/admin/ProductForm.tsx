/* eslint-disable react/jsx-no-duplicate-props */
import {
  Category,
  Description,
  EditLocation,
  Image,
  Money,
  Phone,
  Title,
} from "@mui/icons-material";
import {
  Box,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { Card, StyledButton, StyledTextField } from "../ui/StyledComponents";

interface ProductFormProps {
  editMode?: boolean;
  productData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({
  editMode = false,
  productData = {},
}) => {
  const [name, setName] = useState(productData.name || "");
  const [description, setDescription] = useState(productData.description || "");
  const [price, setPrice] = useState(
    productData.price !== undefined && productData.price !== null
      ? String(productData.price)
      : ""
  );
  const [category, setCategory] = useState(productData.category || "");
  const [state, setState] = useState(productData.state || "");
  const [sellerPhone, setSellerPhone] = useState(
    productData.sellerPhone?.replace(/\D/g, "") || ""
  );
  const [image, setImage] = useState(productData.image || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = [
    "Alimentos Orgânicos",
    "Cosméticos Naturais",
    "Produtos de Limpeza",
    "Moda Sustentável",
    "Casa & Decoração",
    "Jardinagem",
  ];

  const estadosBrasil = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  function maskPhone(phone: string) {
    if (!phone) return "";
    return phone.length === 11
      ? phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3") // (XX) 9XXXX-XXXX
      : phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3"); // (XX) XXXX-XXXX
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Nome do produto é obrigatório";
    }

    if (!description.trim()) {
      newErrors.description = "Descrição do produto é obrigatória";
    }

    if (!price) {
      newErrors.price = "Preço é obrigatório";
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = "Preço deve ser um número positivo";
    }

    if (!category) {
      newErrors.category = "Categoria é obrigatória";
    }

    if (!sellerPhone.trim()) {
      newErrors.sellerPhone = "Telefone do vendedor é obrigatório";
    } else if (!/^\d{10,11}$/.test(sellerPhone)) {
      newErrors.sellerPhone = "Telefone deve ter 10 ou 11 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const priceNumber = Number(price);

    const productPayload = {
      name,
      description,
      price: priceNumber,
      category,
      image,
      state,
      sellerPhone,
    };

    try {
      if (editMode) {
        await api.put(`/products/${id}`, productPayload);
      } else {
        await api.post("/products", productPayload);
      }
      navigate("/admin/products");
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Ocorreu um erro ao salvar o produto. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (editMode && id) {
      api.get(`/products/${id}`).then((response) => {
        const data = response.data;
        setName(data.name);
        setDescription(data.description);
        setPrice(
          data.price !== undefined && data.price !== null
            ? String(data.price)
            : ""
        );
        setCategory(data.category);
        setState(data.state);
        setSellerPhone(data.sellerPhone);
        setImage(data.image);
      });
    }
  }, [editMode, id]);

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", p: 4, mt: 4 }}>
      <Typography
        variant="h5"
        component="h1"
        fontWeight="bold"
        mb={4}
        textAlign="center"
      >
        {editMode ? "Editar Produto" : "Adicionar Novo Produto"}
      </Typography>

      {errors.submit && (
        <Typography
          color="error"
          sx={{
            bgcolor: "rgba(211, 47, 47, 0.1)",
            p: 1.5,
            borderRadius: 1,
            fontSize: "0.875rem",
            mb: 3,
          }}
        >
          {errors.submit}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledTextField
              label="Nome do Produto"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
              placeholder="Nome do produto"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Title
                      sx={{ color: errors.name ? "error.main" : "#2e7d32" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              label="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
              placeholder="Descrição do produto"
              multiline
              rows={4}
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description
                      sx={{
                        color: errors.description ? "error.main" : "#2e7d32",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <NumericFormat
              value={price}
              onValueChange={(values) => {
                if (values.value !== price) {
                  setPrice(values.value);
                }
              }}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              required
              fixedDecimalScale
              allowNegative={false}
              prefix="R$ "
              customInput={StyledTextField}
              fullWidth
              placeholder="R$ 0,00"
              label="Preço"
              error={!!errors.price}
              helperText={errors.price}
              data-testid="input-preco"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Money
                      sx={{
                        color: errors.price ? "error.main" : "#2e7d32",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <StyledTextField
              select
              label="Estado"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              placeholder="Selecione um estado"
              fullWidth
              variant="outlined"
              error={!!errors.state}
              helperText={errors.state}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EditLocation
                      sx={{ color: errors.state ? "error.main" : "#2e7d32" }}
                    />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">Selecione um estado</MenuItem>
              {estadosBrasil.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              select
              label="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              fullWidth
              variant="outlined"
              error={!!errors.category}
              helperText={errors.category}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Category
                      sx={{ color: errors.category ? "error.main" : "#2e7d32" }}
                    />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">Selecione uma categoria</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </StyledTextField>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              label="Telefone do Vendedor"
              fullWidth
              value={maskPhone(sellerPhone)}
              error={!!errors.sellerPhone}
              helperText={errors.sellerPhone}
              placeholder="(XX) XXXXX-XXXX"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone
                      sx={{
                        color: errors.sellerPhone ? "error.main" : "#2e7d32",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                const onlyNumbers = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 11);
                setSellerPhone(onlyNumbers);
              }}
            />
            <FormHelperText>
              Insira DDD + telefone, nós colocamos o formato correto. Ex:
              11912345678
            </FormHelperText>
          </Grid>

          <Grid item xs={12}>
            <StyledTextField
              label="URL da Imagem"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
              variant="outlined"
              placeholder="https://exemplo.com/imagem.jpg"
              inputProps={{
                "data-testid": "input-url",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Image sx={{ color: "#2e7d32" }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText>
              Deixe em branco para usar uma imagem padrão. Recomendamos imagens
              de 400x300 pixels.
            </FormHelperText>
          </Grid>

          <Grid item xs={12} sm={12} sx={{ mt: 2 }}>
            <Box display="flex" gap={2} justifyContent="center">
              <StyledButton
                type="button"
                variant="outlined"
                onClick={() => navigate("/admin/products")}
                sx={{
                  color: "#1b5e20",
                  borderColor: "#1b5e20",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  width: "200px",
                  "&:hover": {
                    color: "#ffffff", // Cor do texto ao passar o mouse
                    borderColor: "#1b5e20", // Você também pode ajustar a borda no hover, se necessário
                  }, // Aumenta a largura
                }}
              >
                Cancelar
              </StyledButton>
              <StyledButton
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  width: "200px", // Aumenta a largura
                }}
                data-testid="submit-button"
              >
                {isSubmitting
                  ? "Salvando..."
                  : editMode
                  ? "Atualizar Produto"
                  : "Adicionar Produto"}
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default ProductForm;
