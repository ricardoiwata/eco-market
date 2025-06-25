import { ArrowBack, LocationOn, WhatsApp } from "@mui/icons-material";
import EcoIcon from "@mui/icons-material/Spa";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

import EmptyState from "./ui/EmptyState";
import {
  BackButton,
  DetailCard,
  PageContainer,
  ProductImage,
  WhatsAppButton,
} from "./ui/StyledComponents";

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);

        setTimeout(() => {
          setProduct(response.data);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(
          "Não foi possível carregar os detalhes do produto. Por favor, tente novamente mais tarde."
        );
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleWhatsApp = () => {
    const phoneNumber = product?.sellerPhone?.replace(/\D/g, "") || "";
    const message = `Olá! Estou interessado no produto "${product.name}" no EcoMarket.`;
    window.open(
      `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <PageContainer>
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: "#2e7d32" }}
            />
          </Box>
        </Container>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Container maxWidth="lg">
          <EmptyState
            title="Erro ao carregar produto"
            message={error}
            actionLabel="Voltar para Produtos"
            onAction={handleBack}
          />
        </Container>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <Container maxWidth="lg">
          <EmptyState
            title="Produto não encontrado"
            message="O produto que você está procurando não existe ou foi removido."
            actionLabel="Voltar para Produtos"
            onAction={handleBack}
          />
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container maxWidth="lg" sx={{ pt: 6, position: "relative" }}>
        <BackButton onClick={handleBack} aria-label="voltar">
          <ArrowBack />
        </BackButton>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Box position="relative">
              <ProductImage
                image={
                  product.image ||
                  `/placeholder.svg?height=500&width=600&text=${encodeURIComponent(
                    product.name
                  )}`
                }
                title={product.name}
              />
            </Box>

            {/* Additional Images (if available) */}
            {product.additionalImages &&
              product.additionalImages.length > 0 && (
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  {product.additionalImages.map(
                    (img: string, index: number) => (
                      <Grid item xs={3} key={index}>
                        <Box
                          component="img"
                          src={img}
                          alt={`${product.name} - imagem ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            cursor: "pointer",
                          }}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              )}
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <DetailCard>
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                {product.name}
              </Typography>
              <Typography variant="h5" color="#2e7d32" fontWeight="bold" mb={3}>
                R$ {product.price.toFixed(2)}
              </Typography>

              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>

              <Box mb={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Categoria
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  <Chip
                    icon={<EcoIcon />}
                    label={product.category}
                    color="success"
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box sx={{ height: "1px", bgcolor: "divider", my: 3 }} />

              {/* Seller Information */}
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Informações do Vendedor:
              </Typography>
              <Box mb={3}>
                <Typography variant="body2" color="textSecondary">
                  <LocationOn
                    sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }}
                  />
                  {product.state}
                </Typography>
              </Box>

              {/* Contact Buttons */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <WhatsAppButton
                    variant="contained"
                    fullWidth
                    startIcon={<WhatsApp />}
                    onClick={handleWhatsApp}
                  >
                    WhatsApp
                  </WhatsAppButton>
                </Grid>
              </Grid>
            </DetailCard>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
};

export default ProductDetail;
