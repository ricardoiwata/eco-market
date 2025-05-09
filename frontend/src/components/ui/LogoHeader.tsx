import SpaIcon from "@mui/icons-material/Spa"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import type React from "react"

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}))

const StyledEcoIcon = styled(SpaIcon)(({ theme }) => ({
  fontSize: "2.5rem",
  color: "#2e7d32",
  marginRight: theme.spacing(1),
  animation: "float 3s ease-in-out infinite",
  "@keyframes float": {
    "0%": {
      transform: "translateY(0px) rotate(0deg)",
    },
    "50%": {
      transform: "translateY(-10px) rotate(10deg)",
    },
    "100%": {
      transform: "translateY(0px) rotate(0deg)",
    },
  },
}))

interface LogoHeaderProps {
  title: string
  subtitle?: string
  size?: "small" | "medium" | "large"
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ title, subtitle, size = "medium" }) => {
  const getFontSize = () => {
    switch (size) {
      case "small":
        return "clamp(1.5rem, 8vw, 1.75rem)"
      case "large":
        return "clamp(2.25rem, 10vw, 2.5rem)"
      default:
        return "clamp(2rem, 10vw, 2.15rem)"
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "small":
        return "2rem"
      case "large":
        return "3rem"
      default:
        return "2.5rem"
    }
  }

  return (
    <LogoContainer>
      <StyledEcoIcon sx={{ fontSize: getIconSize() }} />
      <Box>
        <Typography
          component="h1"
          variant={size === "small" ? "h5" : size === "large" ? "h3" : "h4"}
          sx={{
            fontWeight: 700,
            color: "#2e7d32",
            fontSize: getFontSize(),
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: -0.5,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </LogoContainer>
  )
}

export default LogoHeader
