import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Typography, 
  Box 
} from '@mui/material';

const ApplyButton = ({ jobId }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const token = localStorage.getItem("token");

  const handleAction = () => {
    if (token) {
      // SI CONNECTÉ : Redirection vers la page de formulaire de candidature
      // On passe l'ID du job dans l'URL pour savoir pour quel poste il postule
      navigate(`/apply-form/${jobId}`);
    } else {
      // SI NON CONNECTÉ : On affiche la petite annonce (Modale)
      setOpenModal(true);
    }
  };

  return (
    <>
      <Button 
        variant="contained" 
        fullWidth 
        onClick={handleAction}
        sx={{ backgroundColor: '#2557a7', mt: 2, py: 1.5, fontWeight: 'bold' }}
      >
        Postuler maintenant
      </Button>

      {/* MODALE D'ANNONCE (S'affiche au milieu) */}
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        PaperProps={{ sx: { borderRadius: '12px', padding: '10px' } }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#2557a7' }}>
          Rejoignez IWORK
        </DialogTitle>
        
        <DialogContent>
          <Typography align="center" sx={{ mb: 2 }}>
            Vous devez avoir un compte candidat pour postuler à cette offre et envoyer votre CV.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', gap: 2, pb: 3 }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/login')}
            sx={{ px: 4 }}
          >
            Se connecter
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/register')}
            sx={{ backgroundColor: '#2557a7', px: 4 }}
          >
            S'inscrire
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplyButton;