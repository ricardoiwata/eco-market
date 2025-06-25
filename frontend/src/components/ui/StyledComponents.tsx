import EcoIcon from "@mui/icons-material/Spa";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  IconButton,
  Card as MuiCard,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const floatAnimation = {
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
};

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#f8f9fa",
  backgroundImage: "linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)",
  paddingBottom: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  ...theme.applyStyles("dark", {
    backgroundImage: "linear-gradient(135deg, #1a1a1a 0%, #1b5e20 100%)",
  }),
}));

export const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  height: "100%",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "linear-gradient(135deg, #e6f7e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)",
    }),
  },
}));

export const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)",
  padding: theme.spacing(4, 0),
  color: "white",
  marginBottom: theme.spacing(4),
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  width: "100%",
  zIndex: 1,
}));

export const HeaderPattern = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.1,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zm20.97 0l9.315 9.314-1.414 1.414L34.828 0h2.83zM22.344 0L13.03 9.314l1.414 1.414L25.172 0h-2.83zM32 0l12.142 12.142-1.414 1.414L30 .828 17.272 13.556l-1.414-1.414L28 0h4zM.284 0l28 28-1.414 1.414L0 2.544v2.83L25.456 30l-1.414 1.414-28-28L0 0h.284zM0 5.373l25.456 25.455-1.414 1.415L0 8.2v2.83l21.627 21.626-1.414 1.414L0 13.657v2.828l17.8 17.8-1.414 1.414L0 19.1v2.83l14.142 14.14-1.414 1.415L0 24.544V30h30V0H0v5.373z' fill='%23ffffff' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
}));

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(8),
  textAlign: "center",
}));

export const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  borderRadius: "16px",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

export const ProductCard = styled(MuiCard)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
  },
}));

export const DetailCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: "12px",
  padding: theme.spacing(3),
  height: "100%",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
}));

export const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 0,
  paddingTop: "75%",
  position: "relative",
  backgroundColor: "#e8f5e9",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    transition: "all 0.3s",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4caf50",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2e7d32",
      borderWidth: "2px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2e7d32",
  },
  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f44336",
  },
}));

export const SearchBox = styled(TextField)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  borderRadius: "8px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4caf50",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#2e7d32",
    },
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  padding: "12px 0",
  backgroundColor: "#2e7d32",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: "#1b5e20",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 20px rgba(46, 125, 50, 0.4)",
  },
}));

export const FilterButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#2e7d32",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

export const BackButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  left: theme.spacing(2),
  color: "#2e7d32",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  minWidth: "auto",
  width: "40px",
  height: "40px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  [theme.breakpoints.down("sm")]: {
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
}));

export const WhatsAppButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: "#25D366",
  "&:hover": {
    backgroundColor: "#128C7E",
  },
}));

export const EcoLabel = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  left: theme.spacing(1),
  backgroundColor: "#2e7d32",
  color: "white",
  fontWeight: "bold",
  "& .MuiChip-icon": {
    color: "white",
  },
}));

export const PriceTag = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#2e7d32",
  fontWeight: "bold",
  padding: theme.spacing(0.5, 1.5),
  borderRadius: "16px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
}));

export const StyledEcoIcon = styled(EcoIcon)(({ theme }) => ({
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
}));

export const LargeEcoIcon = styled(EcoIcon)(({ theme }) => ({
  fontSize: "4rem",
  color: "#2e7d32",
  marginBottom: theme.spacing(2),
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
}));

export const LeafBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "200px",
  height: "200px",
  opacity: 0.1,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232e7d32'%3E%3Cpath d='M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3C9,14,14,8.87,22,8c0-2-2-6-2-6C18.25,4.21,17,8,17,8z'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  transform: "rotate(-15deg)",
  zIndex: 0,
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#2e7d32",
  fontSize: "clamp(2rem, 10vw, 2.15rem)",
  fontFamily: "'Poppins', sans-serif",
  letterSpacing: "-0.5px",
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));
