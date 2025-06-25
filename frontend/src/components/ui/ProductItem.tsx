import { Info, Visibility } from "@mui/icons-material";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type React from "react";

import {
  PriceTag,
  ProductCard,
  ProductImage,
  StyledButton,
} from "./StyledComponents";

const ViewDetailsButton = styled(StyledButton)({});

interface ProductItemProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
  };
  onClick: (id: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <ProductCard onClick={() => onClick(product._id)}>
        <ProductImage
          image={
            product.image ||
            `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(
              product.name
            )}`
          }
          title={product.name}
        >
          <PriceTag>R$ {product.price.toFixed(2)}</PriceTag>
        </ProductImage>
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            fontWeight="bold"
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 2, flexGrow: 1 }}
          >
            {product.description}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <Info sx={{ fontSize: 16, color: "text.secondary", mr: 0.5 }} />
            <Typography variant="body2" color="textSecondary">
              Clique para ver detalhes
            </Typography>
          </Box>
          <ViewDetailsButton
            variant="contained"
            fullWidth
            startIcon={<Visibility />}
          >
            Ver Detalhes
          </ViewDetailsButton>
        </CardContent>
      </ProductCard>
    </Grid>
  );
};

export default ProductItem;
