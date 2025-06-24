import {
  Dashboard,
  Inventory,
  Logout,
  Menu as MenuIcon,
  People,
  Person,
  ShoppingBag,
} from "@mui/icons-material";
import SpaIcon from "@mui/icons-material/Spa";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const Navigation: React.FC = () => {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Don't show navigation on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <SpaIcon sx={{ color: "#2e7d32", mr: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          EcoMarket
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItemButton onClick={() => handleNavigation("/products")}>
          <ListItemIcon>
            <ShoppingBag sx={{ color: "#2e7d32" }} />
          </ListItemIcon>
          <ListItemText primary="Produtos" />
        </ListItemButton>

        {isAdmin && (
          <>
            <Divider />
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="overline" color="text.secondary">
                Administração
              </Typography>
            </Box>
            <ListItemButton onClick={() => handleNavigation("/admin")}>
              <ListItemIcon>
                <Dashboard sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation("/admin/products")}>
              <ListItemIcon>
                <Inventory sx={{ color: "#2e7d32" }} />
              </ListItemIcon>
              <ListItemText primary="Gerenciar Produtos" />
            </ListItemButton>
            <ListItemButton onClick={() => handleNavigation("/admin/users")}>
              <ListItemIcon>
                <People sx={{ color: "#1976d2" }} />
              </ListItemIcon>
              <ListItemText primary="Gerenciar Usuários" />
            </ListItemButton>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#2e7d32" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <SpaIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" fontWeight="bold">
              EcoMarket
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                color="inherit"
                onClick={() => handleNavigation("/products")}
              >
                Produtos
              </Button>
              {isAdmin && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/admin")}
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/admin/products")}
                  >
                    Gerenciar Produtos
                  </Button>
                </>
              )}
            </Box>
          )}

          <Box sx={{ ml: 2 }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#1b5e20" }}>
                <People />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            navigate("/perfil");
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
