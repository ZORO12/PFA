import React from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";

const SIDEBAR_WIDTH = 260;
const FONT = "'DM Sans', sans-serif";

export default function HrSidebar({ mobileOpen, onClose, activeItem, onSelect }) {
  const menuItems = [
    { text: "Vue d'ensemble", icon: "📊" },
    { text: "Mes Offres", icon: "💼" },
    { text: "Candidatures", icon: "👥" },
  ];

  const sidebarContent = (
    <Box sx={{ height: "100%", backgroundColor: "#111827", color: "#FFFFFF", p: 2 }}>
      <Box sx={{ px: 2, py: 3 }}>
        <Typography sx={{ fontFamily: FONT, fontSize: "22px", fontWeight: 700 }}>
          <span style={{ color: "#2ec4b6" }}>i</span>work <span style={{ fontSize: "12px", color: "#2ec4b6", verticalAlign: "super" }}>RH</span>
        </Typography>
      </Box>

      <List>
        {menuItems.map((item) => {
          const isSelected = activeItem === item.text;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  onSelect(item.text);
                  if (onClose) onClose();
                }}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: isSelected ? "rgba(46, 196, 182, 0.15)" : "transparent",
                  color: isSelected ? "#2ec4b6" : "#9CA3AF",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.05)" },
                }}
              >
                <Typography sx={{ mr: 2, fontSize: 18 }}>{item.icon}</Typography>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontFamily: FONT, fontSize: "14px", fontWeight: isSelected ? 600 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: SIDEBAR_WIDTH }, flexShrink: { sm: 0 } }}>
      {/* Version Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: SIDEBAR_WIDTH, border: "none" },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Version Bureau */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: SIDEBAR_WIDTH, border: "none" },
        }}
        open
      >
        {sidebarContent}
      </Drawer>
    </Box>
  );
}