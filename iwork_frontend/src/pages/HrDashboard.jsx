import React, { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

import HrSidebar from "../components/hr/HrSidebar";
import TopBar from "../components/adminComponents/Topbar";
import HrStatsOverview from "../components/hr/HrStatsOverview";
import OffersList from "../components/adminComponents/OffersList";
import CandidatesList from "../components/hrComponents/Candidateslist";

const SIDEBAR_WIDTH = 260;

export default function HrDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Vue d'ensemble");
  
  // États de synchronisation API
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMenuToggle = () => setMobileOpen((prev) => !prev);
  const companyId = localStorage.getItem("companyId");

  // Appeler la route GET /api/applications/my-department du backend
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Récupération du jeton d'authentification
        
        const response = await axios.get("http://localhost:5000/api/applications/my-department", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setCandidates(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération du département:", err);
        setError("Erreur de liaison : Vérifiez la connexion au serveur backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentData();
  }, []);

  // Appeler la route PATCH /api/applications/:id/status du backend
  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.patch(`http://localhost:5000/api/applications/${applicationId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Met à jour l'état local instantanément pour le testeur
      setCandidates((prev) =>
        prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app))
      );
    } catch (err) {
      console.error("Erreur lors du changement de statut:", err);
      alert(err.response?.data?.error || "Erreur de mise à jour du statut.");
    }
  };

  // Fonction utilitaire pour ouvrir le fichier PDF du CV dans un nouvel onglet
  const handleOpenCV = (cvUrl) => {
    if (!cvUrl) return alert("Aucun CV disponible pour ce candidat.");
    // Si l'URL est un chemin local du backend, on ajoute le domaine de l'API
    const fullUrl = cvUrl.startsWith("http") ? cvUrl : `http://localhost:5000/${cvUrl}`;
    window.open(fullUrl, "_blank");
  };

  // Distribution propre des pages
  const pageMap = {
    "Vuedensemble": <HrStatsOverview candidates={candidates} />, 
    "MesOffres": <OffersList companyId={companyId} />,
    "Candidatures": (
      <CandidatesList 
        candidates={candidates} 
        onUpdateStatus={handleUpdateStatus} 
        onViewCV={handleOpenCV} 
      />
    ),
  };

  const cleanedItem = activeItem.replace(/\s+/g, "");
  let currentPage = pageMap[cleanedItem] || <HrStatsOverview candidates={candidates} />;

  if (loading) {
    currentPage = (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    currentPage = (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" sx={{ fontFamily: "'DM Sans', sans-serif" }}>{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      
      <HrSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeItem={activeItem}
        onSelect={setActiveItem}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        }}
      >
        <TopBar onMenuToggle={handleMenuToggle} />

        <Box component="main" sx={{ flexGrow: 1, mt: "64px", p: 3 }}>
          {currentPage}
        </Box>
      </Box>
    </Box>
  );
}