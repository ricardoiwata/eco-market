/* eslint-disable jsx-a11y/no-autofocus */
import {
  AdminPanelSettings,
  Delete,
  Edit,
  PersonOutline,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";

import { useUsers } from "../../hooks/useUsers";
import EmptyState from "../ui/EmptyState";
import {
  Header,
  HeaderPattern,
  PageContainer,
  StyledButton,
} from "../ui/StyledComponents";

const ROLE_INFO = {
  admin: {
    label: "Administrador",
    icon: <AdminPanelSettings fontSize="small" />,
    color: "primary",
    bgcolor: "rgba(25, 118, 210, 0.1)",
    fontColor: "#1976d2",
  },
  consumer: {
    label: "Usuário",
    icon: <PersonOutline fontSize="small" />,
    color: "default",
    bgcolor: "rgba(0, 0, 0, 0.08)",
    fontColor: "rgba(0, 0, 0, 0.87)",
  },
  seller: {
    label: "Vendedor",
    icon: <Storefront fontSize="small" />,
    color: "secondary",
    bgcolor: "rgba(123, 31, 162, 0.1)",
    fontColor: "#7b1fa2",
  },
};

const UserManagement: React.FC = () => {
  const { users, loading, error, fetchUsers, deleteUser, updateUserRole } =
    useUsers();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [roleDraft, setRoleDraft] = useState<string>("");

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    const success = await deleteUser(userToDelete);
    if (success) {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleRoleEdit = (user: any) => {
    setEditRoleId(user._id);
    setRoleDraft(user.role);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setRoleDraft(newRole);
    const ok = await updateUserRole(userId, newRole);
    if (ok) setEditRoleId(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  if (loading) {
    return (
      <PageContainer>
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: "#2e7d32" }}
            />
          </Box>
        </Container>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Container maxWidth="lg">
          <EmptyState
            title="Erro ao carregar usuários"
            message={error}
            actionLabel="Tentar Novamente"
            onAction={fetchUsers}
          />
        </Container>
      </PageContainer>
    );
  }

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
              Gerenciamento de Usuários
            </Typography>
          </Box>
        </Container>
      </Header>

      <Container maxWidth="lg">
        {users.length === 0 ? (
          <EmptyState
            title="Nenhum usuário encontrado"
            message="Não há usuários cadastrados no sistema."
            actionLabel="Atualizar"
            onAction={fetchUsers}
          />
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              mt: 4,
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell>Nome de Usuário</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Função</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  const info = ROLE_INFO[user.role as keyof typeof ROLE_INFO];
                  return (
                    <TableRow key={user._id} hover>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {editRoleId === user._id ? (
                          <Select
                            data-testid="role-select"
                            value={roleDraft}
                            onChange={(e) =>
                              handleRoleChange(user._id, e.target.value)
                            }
                            onBlur={() => setEditRoleId(null)}
                            size="small"
                            sx={{ minWidth: 120 }}
                            autoFocus
                          >
                            <MenuItem value="admin">
                              <Chip
                                icon={ROLE_INFO.admin.icon}
                                label={ROLE_INFO.admin.label}
                                size="small"
                                sx={{
                                  bgcolor: ROLE_INFO.admin.bgcolor,
                                  color: ROLE_INFO.admin.fontColor,
                                }}
                              />
                            </MenuItem>
                            <MenuItem value="seller">
                              <Chip
                                icon={ROLE_INFO.seller.icon}
                                label={ROLE_INFO.seller.label}
                                size="small"
                                sx={{
                                  bgcolor: ROLE_INFO.seller.bgcolor,
                                  color: ROLE_INFO.seller.fontColor,
                                }}
                              />
                            </MenuItem>
                            <MenuItem value="consumer">
                              <Chip
                                icon={ROLE_INFO.consumer.icon}
                                label={ROLE_INFO.consumer.label}
                                size="small"
                                sx={{
                                  bgcolor: ROLE_INFO.consumer.bgcolor,
                                  color: ROLE_INFO.consumer.fontColor,
                                }}
                              />
                            </MenuItem>
                          </Select>
                        ) : (
                          <>
                            <Chip
                              icon={info.icon}
                              label={info.label}
                              size="small"
                              sx={{
                                bgcolor: info.bgcolor,
                                color: info.fontColor,
                                mr: 1,
                              }}
                            />
                            <IconButton
                              onClick={() => handleRoleEdit(user)}
                              size="small"
                              aria-label="Editar papel"
                              disabled={loading}
                              data-testid={`role-edit-button-${user.username}`}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClick(user._id)}
                          sx={{ color: "#f44336" }}
                          disabled={user.role === "admin" || loading}
                          data-testid={`delete-button-${user.username}`}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir este usuário? Esta ação não pode ser
            desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <StyledButton
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              color: "#1b5e20",
              borderColor: "#1b5e20",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              width: "100px",
              "&:hover": {
                color: "#ffffff",
                borderColor: "#1b5e20",
              },
            }}
          >
            Cancelar
          </StyledButton>
          <StyledButton
            onClick={handleDeleteConfirm}
            variant="contained"
            autoFocus
            sx={{ width: "100px" }}
          >
            Excluir
          </StyledButton>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default UserManagement;
