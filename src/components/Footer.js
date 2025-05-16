import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Link, 
  Typography,
  Divider,
  IconButton 
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              LearnHub
            </Typography>
            <Typography variant="body2">
              Empowering your learning journey with quality courses from industry experts.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block">Home</Link>
              <Link href="#" color="inherit" display="block">Courses</Link>
              <Link href="#" color="inherit" display="block">Pricing</Link>
              <Link href="#" color="inherit" display="block">FAQ</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block">Terms</Link>
              <Link href="#" color="inherit" display="block">Privacy</Link>
              <Link href="#" color="inherit" display="block">Cookies</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Subscribe to our newsletter
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;