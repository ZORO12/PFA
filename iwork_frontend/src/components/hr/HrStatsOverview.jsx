import React, { useState } from "react";
import { Box, Typography, Card, MenuItem, Select } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Données fictives pour le visuel immédiat (à lier à l'API plus tard)
const CANDIDATURES_DATA = [
  { x: "Jan", v: 45 }, { x: "Feb", v: 80 }, { x: "Mar", v: 120 },
  { x: "Apr", v: 65 }, { x: "May", v: 95 }, { x: "Jun", v: 140 },
];

const FONT = "'DM Sans', sans-serif";
const DARK = "#111827";

function StatCard({ icon, label, value }) {
  return (
    <Card elevation={0} sx={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #F3F4F6", p: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <Box sx={{ width: 42, height: 42, borderRadius: "11px", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
        {icon}
      </Box>
      <Typography sx={{ fontSize: 13, color: "#9CA3AF", fontFamily: FONT }}>{label}</Typography>
      <Typography sx={{ fontSize: 28, fontWeight: 700, color: DARK, fontFamily: FONT }}>{value}</Typography>
    </Card>
  );
}

export default function HrStatsOverview() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
      
      {/* Ligne des cartes de statistiques de la RH */}
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "18px",
        "@media (max-width: 900px)": { gridTemplateColumns: "1fr" },
      }}>
        <StatCard icon="👥" label="Candidatures Reçues" value="248" />
        <StatCard icon="💼" label="Mes Offres Actives" value="12" />
        <StatCard icon="🤖" label="CV Analysés par l'IA" value="185" />
      </Box>

      {/* Graphique de suivi */}
      <Card elevation={0} sx={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #F3F4F6", p: "22px" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "18px" }}>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: DARK, fontFamily: FONT }}>
            Évolution des Candidatures
          </Typography>
        </Box>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={CANDIDATURES_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="x" tick={{ fontFamily: FONT, fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontFamily: FONT, fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} width={35} />
            <Tooltip contentStyle={{ borderRadius: 10, borderColor: "#E5E7EB", fontFamily: FONT }} />
            <Bar dataKey="v" fill="#4361EE" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
}