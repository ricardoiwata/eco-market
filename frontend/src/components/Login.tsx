import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";

import { useAuthHooks } from "../hooks/useAuth";

import LogoHeader from "./ui/LogoHeader";
import {
  Card,
  LeafBackground,
  AuthContainer as SignInContainer,
  StyledButton,
  StyledTextField,
} from "./ui/StyledComponents";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, handleLogin } = useAuthHooks();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await handleLogin(username, password);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SignInContainer>
      <LeafBackground />
      <Card variant="outlined">
        <LogoHeader title="EcoMarket" />

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "text.secondary",
          }}
        >
          Bem-vindo(a) de volta! Faça login para continuar.
        </Typography>

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 3,
          }}
        >
          {error && (
            <Typography
              color="error"
              sx={{
                bgcolor: "rgba(211, 47, 47, 0.1)",
                p: 1.5,
                borderRadius: 1,
                fontSize: "0.875rem",
              }}
            >
              {error}
            </Typography>
          )}

          <StyledTextField
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#2e7d32" }} />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#2e7d32" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ textAlign: "right", mt: -1 }}>
            <Link
              href="#"
              variant="body2"
              sx={{
                color: "#2e7d32",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Esqueceu sua senha?
            </Link>
          </Box>

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </StyledButton>
        </Box>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            ou
          </Typography>
        </Divider>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              sx={{
                color: "#2e7d32",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Crie uma conta
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
};

export default Login;
