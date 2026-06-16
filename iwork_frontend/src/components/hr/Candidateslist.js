import React from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Button, Typography, Chip, Box 
} from "@mui/material";

export default function CandidatesList({ candidates, onUpdateStatus, onViewCV }) {
  if (!candidates || candidates.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center", bgcolor: "#fff", borderRadius: "12px", mt: 2 }}>
        <Typography variant="h6" color="textSecondary" sx={{ fontFamily: "'DM Sans', sans-serif" }}>
          Aucune candidature reçue dans votre département pour le moment.
        </Typography>
      </Box>
    );
  }

  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted": 
        return <Chip label="Accepté" color="success" size="small" />;
      case "rejected": 
        return <Chip label="Refusé" color="error" size="small" />;
      case "reviewed": 
        return <Chip label="En cours" color="info" size="small" />;
      default: 
        return <Chip label="En attente" color="warning" size="small" />;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6", mt: 2 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ bgcolor: "#F9FAFB" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "'DM Sans', sans-serif" }}>Candidat</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "'DM Sans', sans-serif" }}>Poste</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "'DM Sans', sans-serif" }}>Statut</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "'DM Sans', sans-serif" }}>CV</TableCell>
            <TableCell sx={{ fontWeight: "bold", fontFamily: "'DM Sans', sans-serif" }} align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((app) => {
            // Extraction sécurisée des données imbriquées de Prisma
            const candidateName = `${app.candidate?.firstName || ""} ${app.candidate?.lastName || ""}`.trim() || "Candidat anonyme";
            const candidateEmail = app.candidate?.email || "Pas d'adresse email";
            const jobTitle = app.job?.title || "Poste non spécifié";
            const cvFile = app.cvUrl || app.candidate?.curriculum_vitae;

            return (
              <TableRow key={app.id} hover>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                    {candidateName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {candidateEmail}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontFamily: "'DM Sans', sans-serif" }}>{jobTitle}</TableCell>
                <TableCell>{getStatusChip(app.status)}</TableCell>
                <TableCell>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    disabled={!cvFile}
                    onClick={() => onViewCV(cvFile)}
                    sx={{ textTransform: "none", borderRadius: "8px", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Ouvrir le CV
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {app.status?.toLowerCase() === "pending" ? (
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="success" 
                        onClick={() => onUpdateStatus(app.id, "accepted")}
                        sx={{ textTransform: "none", borderRadius: "8px", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Accepter
                      </Button>
                      <Button 
                        size="small" 
                        variant="contained" 
                        color="error" 
                        onClick={() => onUpdateStatus(app.id, "rejected")}
                        sx={{ textTransform: "none", borderRadius: "8px", fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Refuser
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ fontFamily: "'DM Sans', sans-serif", italic: true }}>
                      Traité
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}