/* eslint-disable react-hooks/exhaustive-deps */
import { Search, Sort } from "@mui/icons-material";
import EcoIcon from "@mui/icons-material/Spa";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Slider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../services/api";
import EmptyState from "./ui/EmptyState";
import ProductItem from "./ui/ProductItem";
import {
  FilterButton,
  Header,
  HeaderPattern,
  PageContainer,
  SearchBox,
} from "./ui/StyledComponents";

const categories = [
  "Todos",
  "Alimentos Orgânicos",
  "Cosméticos Naturais",
  "Produtos de Limpeza",
  "Moda Sustentável",
  "Casa & Decoração",
  "Jardinagem",
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => fetchProducts(), 500);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [searchTerm, selectedCategory, priceRange]);

  useEffect(
    () => setPage(1),
    [searchTerm, selectedCategory, priceRange, sortBy]
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCategory !== "Todos") params.category = selectedCategory;
      if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
        params.priceMin = priceRange[0];
        params.priceMax = priceRange[1];
      }
      const response = await api.get("/products", { params });
      setProducts(response.data);
    } catch (error) {
      setError(
        "Não foi possível carregar os produtos. Por favor, tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const getSortedProducts = () => {
    let sorted = [...products];
    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }
    return sorted;
  };

  const paginatedProducts = getSortedProducts().slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    if (
      !newValue ||
      !Array.isArray(newValue) ||
      newValue.length !== 2 ||
      newValue.some((n) => typeof n !== "number")
    )
      return;
    setPriceRange(newValue as number[]);
  };
  const handleCategoryChange = (cat: string) => setSelectedCategory(cat);

  const handleSortMenuClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleSortMenuClose = () => setAnchorEl(null);
  const handleSortOptionSelect = (value: string) => {
    setSortBy(value);
    handleSortMenuClose();
  };

  const handleProductClick = (productId: string) =>
    navigate(`/products/${productId}`);

  const getEmptyMessage = () => {
    if (searchTerm)
      return `Não encontramos produtos correspondentes a "${searchTerm}".`;
    if (selectedCategory !== "Todos") return "Não há produtos nesta categoria.";
    return "Não há produtos disponíveis no momento.";
  };

  if (error) {
    return (
      <PageContainer>
        <Header>
          <HeaderPattern />
          <Container maxWidth="lg">
            <Box display="flex" alignItems="center" mb={2}>
              <EcoIcon sx={{ fontSize: 32, mr: 1 }} />
              <Typography variant="h4" component="h1" fontWeight="bold">
                EcoMarket
              </Typography>
            </Box>
          </Container>
        </Header>
        <Container maxWidth="lg">
          <EmptyState
            title="Erro ao carregar produtos"
            message={error}
            actionLabel="Tentar Novamente"
            onAction={() => window.location.reload()}
          />
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header sx={{ position: "relative", zIndex: 1, width: "100%" }}>
        <HeaderPattern />
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="space-between"
            alignItems={isMobile ? "stretch" : "center"}
            gap={2}
            pb={2}
          >
            <SearchBox
              placeholder="Buscar produtos ecológicos..."
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: isMobile ? "100%" : 500 }}
            />
            <Box display="flex" gap={1} position="relative">
              <FilterButton
                variant="contained"
                startIcon={<Sort />}
                onClick={handleSortMenuClick}
                aria-controls={menuOpen ? "sort-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
              >
                {isMobile ? "" : "Ordenar"}
              </FilterButton>
              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleSortMenuClose}
                MenuListProps={{ "aria-labelledby": "sort-button" }}
              >
                <MenuItem onClick={() => handleSortOptionSelect("featured")}>
                  Em destaque
                </MenuItem>
                <MenuItem onClick={() => handleSortOptionSelect("newest")}>
                  Mais recentes
                </MenuItem>
                <MenuItem onClick={() => handleSortOptionSelect("price-low")}>
                  Menor preço
                </MenuItem>
                <MenuItem onClick={() => handleSortOptionSelect("price-high")}>
                  Maior preço
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Header>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" gap={4} position="relative">
          {/* Filters sidebar - desktop */}
          {!isMobile && (
            <Box width="250px" flexShrink={0}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                  position: "sticky",
                  top: "20px",
                  bgcolor: "white",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Categorias
                </Typography>
                <List disablePadding>
                  {categories.map((category) => (
                    <ListItemButton
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      selected={selectedCategory === category}
                      sx={{
                        py: 0.5,
                        borderRadius: "8px",
                        "&.Mui-selected": {
                          backgroundColor: "rgba(46, 125, 50, 0.1)",
                          color: "#2e7d32",
                          fontWeight: "bold",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(46, 125, 50, 0.05)",
                        },
                      }}
                    >
                      <ListItemText primary={category} />
                    </ListItemButton>
                  ))}
                </List>

                <Box sx={{ height: "1px", bgcolor: "divider", my: 2 }} />

                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Preço
                </Typography>
                <Box px={1}>
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    sx={{
                      color: "#2e7d32",
                      "& .MuiSlider-thumb": {
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: "0px 0px 0px 8px rgba(46, 125, 50, 0.16)",
                        },
                      },
                    }}
                  />
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">R$ {priceRange[0]}</Typography>
                    <Typography variant="body2">R$ {priceRange[1]}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}

          {/* Product grid e paginação */}
          <Box flexGrow={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography variant="h5" fontWeight="bold">
                {selectedCategory === "Todos"
                  ? "Todos os Produtos"
                  : selectedCategory}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {getSortedProducts().length}{" "}
                {getSortedProducts().length === 1 ? "produto" : "produtos"}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {loading ? (
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="200px"
                  >
                    <CircularProgress size={48} color="success" />
                  </Box>
                </Grid>
              ) : getSortedProducts().length === 0 ? (
                <Grid item xs={12}>
                  <EmptyState
                    title="Nenhum produto encontrado"
                    message={getEmptyMessage()}
                    actionLabel={searchTerm ? "Limpar Busca" : undefined}
                    onAction={searchTerm ? () => setSearchTerm("") : undefined}
                  />
                </Grid>
              ) : (
                paginatedProducts.map((product) => (
                  <ProductItem
                    key={product._id}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))
              )}
            </Grid>
            {/* Paginação */}
            {!loading && getSortedProducts().length > itemsPerPage && (
              <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                  count={Math.ceil(getSortedProducts().length / itemsPerPage)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#1b5e20",
                      borderColor: "#1b5e20",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#1b5e20",
                      color: "#ffffff",
                    },
                    "& .MuiPaginationItem-root.Mui-selected:hover": {
                      backgroundColor: "#25763a",
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default ProductList;
