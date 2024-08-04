'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChartData } from 'chart.js';
import { SurveyData } from '@/types/survey';
import '@/lib/chartjs-config';
import BarChartComponent from '@/components/ui/BarChartComponent';
import PieChartComponent from '@/components/ui/PieChartComponent';
import EmailStatusTable from '@/components/EmailStatusTable';
import UploadPdfButton from '@/components/UploadPdfButton';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Menu, MenuItem, Checkbox, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useFetchSurveyData } from '@/lib/useFetchSurveyData';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorElEmail, setAnchorElEmail] = useState<null | HTMLElement>(null);
  const [anchorElGaming, setAnchorElGaming] = useState<null | HTMLElement>(null);
  const [anchorElBlockchain, setAnchorElBlockchain] = useState<null | HTMLElement>(null);
  const [emailFilter, setEmailFilter] = useState<'withEmail' | 'withoutEmail' | undefined>();
  const [mobileGamingFilter, setMobileGamingFilter] = useState<'true' | 'false' | 'all'>('all');
  const [blockchainFilter, setBlockchainFilter] = useState<('yes' | 'no' | 'a little')[]>(['yes', 'no', 'a little']);

  const {
    surveyData,
    loading,
    totalResponses,
    totalEmails,
    totalMobileGaming,
    totalBlockchainFamiliarity,
    avgInterestInClashOfClans,
    avgInterestInDigitalAssets,
    avgInterestInEarningTokens,
    emailChartData,
    mobileGamingData,
    blockchainFamiliarityData,
    interestInClashOfClansData,
    interestInDigitalAssetsData,
    interestInEarningTokensData,
  } = useFetchSurveyData({ emailFilter, mobileGamingFilter, blockchainFilter });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleEmailFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElEmail(event.currentTarget);
  };

  const handleEmailFilterClose = () => {
    setAnchorElEmail(null);
  };

  const handleEmailFilterSelect = (filter: 'withEmail' | 'withoutEmail' | undefined) => {
    setEmailFilter(filter);
    handleEmailFilterClose();
  };

  const handleGamingFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElGaming(event.currentTarget);
  };

  const handleGamingFilterClose = () => {
    setAnchorElGaming(null);
  };

  const handleGamingFilterSelect = (filter: 'true' | 'false' | 'all') => {
    setMobileGamingFilter(filter);
    handleGamingFilterClose();
  };

  const handleBlockchainFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBlockchain(event.currentTarget);
  };

  const handleBlockchainFilterClose = () => {
    setAnchorElBlockchain(null);
  };

  const handleBlockchainFilterChange = (option: 'yes' | 'no' | 'a little') => {
    setBlockchainFilter((prev) => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  if (status === 'loading' || loading) {
    return <div>Chargement...</div>;
  }

  if (status === 'authenticated' && !session) {
    return <div>Session non trouvée. Veuillez réessayer de vous connecter.</div>;
  }

  const emailDocs = surveyData
    .filter(doc => doc.email && doc.idEmail)
    .map(doc => ({ email: doc.email!, idEmail: doc.idEmail! }));

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tableau de bord
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="contained" onClick={handleEmailFilterClick}>
            Filtre Email
          </Button>
          <Menu anchorEl={anchorElEmail} open={Boolean(anchorElEmail)} onClose={handleEmailFilterClose}>
            <MenuItem onClick={() => handleEmailFilterSelect(undefined)}>Tous les utilisateurs</MenuItem>
            <MenuItem onClick={() => handleEmailFilterSelect('withEmail')}>Avec Email</MenuItem>
            <MenuItem onClick={() => handleEmailFilterSelect('withoutEmail')}>Sans Email</MenuItem>
          </Menu>
          <Button variant="contained" onClick={handleGamingFilterClick}>
            Filtre Jeux Mobiles
          </Button>
          <Menu anchorEl={anchorElGaming} open={Boolean(anchorElGaming)} onClose={handleGamingFilterClose}>
            <MenuItem onClick={() => handleGamingFilterSelect('all')}>Tous</MenuItem>
            <MenuItem onClick={() => handleGamingFilterSelect('true')}>Oui</MenuItem>
            <MenuItem onClick={() => handleGamingFilterSelect('false')}>Non</MenuItem>
          </Menu>
          <Button variant="contained" onClick={handleBlockchainFilterClick}>
            Filtre Blockchain
          </Button>
          <Menu anchorEl={anchorElBlockchain} open={Boolean(anchorElBlockchain)} onClose={handleBlockchainFilterClose}>
            <MenuItem>
              <Checkbox
                checked={blockchainFilter.includes('yes')}
                onChange={() => handleBlockchainFilterChange('yes')}
              />
              <ListItemText primary="Oui" />
            </MenuItem>
            <MenuItem>
              <Checkbox
                checked={blockchainFilter.includes('no')}
                onChange={() => handleBlockchainFilterChange('no')}
              />
              <ListItemText primary="Non" />
            </MenuItem>
            <MenuItem>
              <Checkbox
                checked={blockchainFilter.includes('a little')}
                onChange={() => handleBlockchainFilterChange('a little')}
              />
              <ListItemText primary="Un peu" />
            </MenuItem>
          </Menu>
          <UploadPdfButton />
        </Box>
        <Grid container spacing={2}>
          {emailFilter === undefined && (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Aperçu des réponses au sondage
                  </Typography>
                  <PieChartComponent data={emailChartData} />
                  <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    Nombre total de réponses : {totalResponses}
                  </Typography>
                  <Typography variant="body1" align="center">
                    Réponses avec Email : {totalEmails}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {emailFilter !== undefined && (
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Aperçu des réponses au sondage
                  </Typography>
                  <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                    Nombre total de réponses : {totalResponses}
                  </Typography>
                  <Typography variant="body1" align="center">
                    Réponses avec Email : {totalEmails}
                  </Typography>
                  <Typography variant="body1" align="center">
                    Réponses sans Email : {totalResponses - totalEmails}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Réponses sur les jeux mobiles
                </Typography>
                <PieChartComponent data={mobileGamingData} />
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                  True : {totalMobileGaming.true}
                </Typography>
                <Typography variant="body1" align="center">
                  False : {totalMobileGaming.false}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Familiarité avec la blockchain
                </Typography>
                <PieChartComponent data={blockchainFamiliarityData} />
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                  Yes : {totalBlockchainFamiliarity.yes}
                </Typography>
                <Typography variant="body1" align="center">
                  No : {totalBlockchainFamiliarity.no}
                </Typography>
                <Typography variant="body1" align="center">
                  A little : {totalBlockchainFamiliarity.aLittle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Intérêt pour Clash of Clans
                </Typography>
                <BarChartComponent data={interestInClashOfClansData} />
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                  Note moyenne : {avgInterestInClashOfClans.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Intérêt pour les actifs numériques
                </Typography>
                <BarChartComponent data={interestInDigitalAssetsData} />
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                  Note moyenne : {avgInterestInDigitalAssets.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Intérêt pour gagner des jetons
                </Typography>
                <BarChartComponent data={interestInEarningTokensData} />
                <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                  Note moyenne : {avgInterestInEarningTokens.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <EmailStatusTable emailDocs={emailDocs} />
      </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Button variant="contained" onClick={() => window.open('https://vercel.com/martials-projects-0761edc5/oxelta-sondage/analytics')}>
            Sondage + deck
          </Button>
          <Button variant="contained" onClick={() => window.open('https://vercel.com/martials-projects-0761edc5/oxelta_data-room/analytics')}>
            Data Room
          </Button>
        </Box>
    </Container>
  );
};

export default Dashboard;
