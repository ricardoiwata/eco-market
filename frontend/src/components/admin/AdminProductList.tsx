/* eslint-disable jsx-a11y/no-autofocus */
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProducts } from "../../hooks/useProducts";
import EmptyState from "../ui/EmptyState";
import {
  Header,
  HeaderPattern,
  PageContainer,
  StyledButton,
} from "../ui/StyledComponents";

const AdminProductList: React.FC = () => {
  const { products, loading, error, fetchProducts, deleteProduct } =
    useProducts();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para o Snackbar
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/admin/products/new");
  };

  const handleEditProduct = (productId: string) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleViewProduct = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    const success = await deleteProduct(productToDelete);
    if (success) {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      setSnackbarOpen(true);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Função para fechar o Snackbar
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
            title="Erro ao carregar produtos"
            message={error}
            actionLabel="Tentar Novamente"
            onAction={fetchProducts}
          />
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header>
        <HeaderPattern />
        <Container maxWidth="lg">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="white"
            >
              Gerenciamento de Produtos
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddProduct}
              sx={{
                bgcolor: "white",
                color: "#2e7d32",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Adicionar Produto
            </Button>
          </Box>
        </Container>
      </Header>

      <Container maxWidth="lg">
        {products.length === 0 ? (
          <EmptyState
            title="Nenhum produto cadastrado"
            message="Comece adicionando seu primeiro produto ecológico."
            actionLabel="Adicionar Produto"
            onAction={handleAddProduct}
          />
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              mt: 4,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell align="right">Preço</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.category || "Sem categoria"}
                        size="small"
                        sx={{
                          bgcolor: "rgba(46, 125, 50, 0.1)",
                          color: "#2e7d32",
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      R$ {product.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleViewProduct(product._id)}
                          sx={{ color: "#2196f3" }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEditProduct(product._id)}
                          sx={{ color: "#ff9800" }}
                          data-testid={`edit-button-${product.name}`}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(product._id)}
                          sx={{ color: "#f44336" }}
                          data-testid={`delete-button-${product.name}`}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este produto? Esta ação não pode ser
            desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              color: "#1b5e20",
              borderColor: "#1b5e20",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              width: "100px",
              "&:hover": {
                color: "#ffffff", // Cor do texto ao passar o mouse
                borderColor: "#1b5e20", // Você também pode ajustar a borda no hover, se necessário
              }, // Aumenta a largura
            }}
          >
            Cancelar
          </StyledButton>
          <StyledButton
            onClick={handleDeleteConfirm}
            variant="contained"
            autoFocus
            sx={{ width: "100px" }}
          >
            Excluir
          </StyledButton>
        </DialogActions>
      </Dialog>

      {/* Snackbar para Notificação */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Produto excluído com sucesso"
      />
    </PageContainer>
  );
};

export default AdminProductList;
