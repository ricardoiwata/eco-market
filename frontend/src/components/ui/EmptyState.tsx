import { Typography, Button } from "@mui/material"
import type React from "react"

import { EmptyStateContainer, LargeEcoIcon } from "./StyledComponents"

interface EmptyStateProps {
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, actionLabel, onAction }) => {
  return (
    <EmptyStateContainer>
      <LargeEcoIcon />
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        {message}
      </Typography>
      {actionLabel && onAction && (
        <Button variant="outlined" color="primary" onClick={onAction} sx={{ color: "#2e7d32", borderColor: "#2e7d32" }}>
          {actionLabel}
        </Button>
      )}
    </EmptyStateContainer>
  )
}

export default EmptyState
