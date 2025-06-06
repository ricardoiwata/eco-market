import { Visibility, VisibilityOff, Person, Lock, Email, Badge, ArrowBack } from "@mui/icons-material"
import {
  Typography,
  Box,
  Divider,
  Link,
  InputAdornment,
  IconButton,
  FormHelperText,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuthHooks } from "../hooks/useAuth"

import LogoHeader from "./ui/LogoHeader"
import {
  Card,
  AuthContainer as SignUpContainer,
  StyledTextField,
  StyledButton,
  LeafBackground,
  BackButton,
} from "./ui/StyledComponents"


const Register: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const { loading, error, handleRegister } = useAuthHooks()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Username validation
    if (username.length < 3) {
      newErrors.username = "O nome de usuário deve ter pelo menos 3 caracteres"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = "Email inválido"
    }

    // Password validation
    if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres"
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    // CPF validation (basic format check)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/
    if (!cpfRegex.test(cpf)) {
      newErrors.cpf = "CPF inválido (formato: 123.456.789-00 ou 12345678900)"
    }

    setValidationErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    await handleRegister({ username, password, email, cpf })
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formatCPF = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}.${digits.slice(3)}`
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    } else {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`
    }
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = formatCPF(e.target.value)
    setCpf(formattedCPF)
  }

  return (
    <SignUpContainer>
      <LeafBackground />
      <BackButton onClick={() => navigate("/login")} aria-label="Voltar para login">
        <ArrowBack />
      </BackButton>

      <Card variant="outlined">
        <LogoHeader title="Criar Conta EcoMarket" size="small" />

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "text.secondary",
          }}
        >
          Junte-se a nós e comece a comprar produtos ecológicos
        </Typography>

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

        <Box
          component="form"
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
                  <Person sx={{ color: validationErrors.username ? "error.main" : "#2e7d32" }} />
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
                  <Email sx={{ color: validationErrors.email ? "error.main" : "#2e7d32" }} />
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
                  <Badge sx={{ color: validationErrors.cpf ? "error.main" : "#2e7d32" }} />
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
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: validationErrors.password ? "error.main" : "#2e7d32" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <StyledTextField
            label="Confirmar Senha"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
            error={!!validationErrors.confirmPassword}
            helperText={validationErrors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: validationErrors.confirmPassword ? "error.main" : "#2e7d32" }} />
                </InputAdornment>
              ),
            }}
          />

          <FormHelperText sx={{ textAlign: "center", color: "text.secondary" }}>
            Ao se registrar, você concorda com nossos Termos de Serviço e Política de Privacidade.
          </FormHelperText>

          <StyledButton type="submit" fullWidth variant="contained" disableElevation disabled={loading}>
            {loading ? "Registrando..." : "Criar Conta"}
          </StyledButton>
        </Box>

        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            ou
          </Typography>
        </Divider>

        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              sx={{
                color: "#2e7d32",
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Faça login
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  )
}

export default Register
