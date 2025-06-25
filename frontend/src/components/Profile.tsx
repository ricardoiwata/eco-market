import {
  ArrowBack,
  Badge,
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import LogoHeader from "./ui/LogoHeader";
import {
  BackButton,
  Card,
  LeafBackground,
  AuthContainer as ProfileContainer,
  StyledButton,
  StyledTextField,
} from "./ui/StyledComponents";

const Profile: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get("/users/me");
        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
        setCpf(res.data.cpf || "");
      } catch (e) {
        setError("Não foi possível carregar seus dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (username.length < 3) newErrors.username = "Nome muito curto";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) newErrors.email = "Email inválido";
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    if (!cpfRegex.test(cpf)) newErrors.cpf = "CPF inválido";
    if (password && password.length < 6)
      newErrors.password = "Senha muito curta";
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(e.target.value);
    setCpf(formattedCPF);
  };

  function formatCPF(value: string) {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    else if (digits.length <= 6)
      return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    else if (digits.length <= 9)
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    else
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
        6,
        9
      )}-${digits.slice(9, 11)}`;
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSuccess(null);
    setError(null);
    if (!validateForm()) return;
    setLoading(true);
    try {
      const payload: any = { username, email, cpf };
      if (password) payload.password = password;
      await api.put("/users/me", payload);
      setSuccess("Perfil atualizado com sucesso!");
      setPassword("");
    } catch (e: any) {
      setError(e.response?.data?.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <ProfileContainer>
      <LeafBackground />
      <BackButton onClick={() => navigate(-1)} aria-label="Voltar">
        <ArrowBack />
      </BackButton>

      <Card variant="outlined">
        <LogoHeader title="Perfil EcoMarket" size="small" />

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "text.secondary",
          }}
        >
          Veja e edite suas informações de perfil
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{ bgcolor: "rgba(211, 47, 47, 0.1)", p: 1.5, borderRadius: 1 }}
          >
            {error}
          </Typography>
        )}
        {success && (
          <Typography
            color="success.main"
            sx={{ bgcolor: "rgba(27,94,32,0.1)", p: 1.5, borderRadius: 1 }}
          >
            {success}
          </Typography>
        )}

        <Box
          component="form"
          data-testid="profile-form"
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2.5,
          }}
        >
          <StyledTextField
            label="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            variant="outlined"
            error={!!validationErrors.username}
            helperText={validationErrors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person
                    sx={{
                      color: validationErrors.username
                        ? "error.main"
                        : "#2e7d32",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            variant="outlined"
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email
                    sx={{
                      color: validationErrors.email ? "error.main" : "#2e7d32",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="CPF"
            value={cpf}
            onChange={handleCPFChange}
            required
            fullWidth
            variant="outlined"
            error={!!validationErrors.cpf}
            helperText={validationErrors.cpf}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge
                    sx={{
                      color: validationErrors.cpf ? "error.main" : "#2e7d32",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="Nova Senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            error={!!validationErrors.password}
            helperText={
              validationErrors.password || "Preencha para alterar a senha"
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock
                    sx={{
                      color: validationErrors.password
                        ? "error.main"
                        : "#2e7d32",
                    }}
                  />
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

          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            disabled={loading}
            onClick={() => navigate(-1)}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </StyledButton>
        </Box>
      </Card>
    </ProfileContainer>
  );
};

export default Profile;
