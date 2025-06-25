import { Add, Inventory, People, ShoppingBag } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { Header, HeaderPattern, PageContainer } from "../ui/StyledComponents";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [productsResponse, usersResponse] = await Promise.all([
          api.get("/products"),
          api.get("/users"),
        ]);

        setStats({
          totalProducts: productsResponse.data.length,
          totalUsers: usersResponse.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <PageContainer>
      <Header>
        <HeaderPattern />
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" mb={2}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              color="white"
            >
              Painel Administrativo
            </Typography>
          </Box>
        </Container>
      </Header>

      <Container maxWidth="lg">
        <Box mt={4} mb={6}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Visão Geral
          </Typography>

          {loading ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress
                size={40}
                thickness={4}
                sx={{ color: "#2e7d32" }}
              />
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          bgcolor: "rgba(46, 125, 50, 0.1)",
                          borderRadius: "50%",
                          p: 1,
                          mr: 2,
                        }}
                      >
                        <Inventory sx={{ color: "#2e7d32" }} />
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        Produtos
                      </Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="bold" mb={2}>
                      {stats.totalProducts}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleNavigate("/admin/products")}
                      sx={{
                        color: "#2e7d32",
                        borderColor: "#2e7d32",
                        "&:hover": {
                          borderColor: "#1b5e20",
                          backgroundColor: "rgba(46, 125, 50, 0.04)",
                        },
                      }}
                    >
                      Gerenciar Produtos
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          bgcolor: "rgba(25, 118, 210, 0.1)",
                          borderRadius: "50%",
                          p: 1,
                          mr: 2,
                        }}
                      >
                        <People sx={{ color: "#1976d2" }} />
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        Usuários
                      </Typography>
                    </Box>
                    <Typography variant="h4" fontWeight="bold" mb={2}>
                      {stats.totalUsers}
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleNavigate("/admin/users")}
                      sx={{
                        color: "#1976d2",
                        borderColor: "#1976d2",
                        "&:hover": {
                          borderColor: "#0d47a1",
                          backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                    >
                      Gerenciar Usuários
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          bgcolor: "rgba(76, 175, 80, 0.1)",
                          borderRadius: "50%",
                          p: 1,
                          mr: 2,
                        }}
                      >
                        <Add sx={{ color: "#4caf50" }} />
                      </Box>
                      <Typography variant="h6" fontWeight="bold">
                        Novo Produto
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      Adicione novos produtos ecológicos à sua loja.
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleNavigate("/admin/products/new")}
                      sx={{
                        bgcolor: "#4caf50",
                        "&:hover": {
                          bgcolor: "#388e3c",
                        },
                      }}
                    >
                      Adicionar Produto
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>

        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Ações Rápidas
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Inventory />}
                onClick={() => handleNavigate("/admin/products")}
                sx={{
                  py: 1.5,
                  color: "#2e7d32",
                  borderColor: "#2e7d32",
                  "&:hover": {
                    borderColor: "#1b5e20",
                    backgroundColor: "rgba(46, 125, 50, 0.04)",
                  },
                }}
              >
                Listar Produtos
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<Add />}
                onClick={() => handleNavigate("/admin/products/new")}
                sx={{
                  py: 1.5,
                  color: "#4caf50",
                  borderColor: "#4caf50",
                  "&:hover": {
                    borderColor: "#388e3c",
                    backgroundColor: "rgba(76, 175, 80, 0.04)",
                  },
                }}
              >
                Novo Produto
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<People />}
                onClick={() => handleNavigate("/admin/users")}
                sx={{
                  py: 1.5,
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": {
                    borderColor: "#0d47a1",
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                  },
                }}
              >
                Gerenciar Usuários
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<ShoppingBag />}
                onClick={() => handleNavigate("/products")}
                sx={{
                  py: 1.5,
                  color: "#ff9800",
                  borderColor: "#ff9800",
                  "&:hover": {
                    borderColor: "#f57c00",
                    backgroundColor: "rgba(255, 152, 0, 0.04)",
                  },
                }}
              >
                Ver Loja
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default AdminDashboard;
