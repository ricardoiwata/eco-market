import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import api from "../services/api";

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários.");
        console.error("Erro ao buscar usuários:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user: any) => user._id !== userId));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {error && (
        <Typography color="error" data-testid="error-message">
          {error}
        </Typography>
      )}
      {users.map((user: any) => (
        <Grid item xs={12} sm={6} md={4} key={user._id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{user.username}</Typography>
              <Typography variant="body2">{user.email}</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(user._id)}
              >
                Deletar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserList;
