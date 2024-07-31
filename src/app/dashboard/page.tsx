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
import { Container, Typography, Box, Grid, Card, CardContent, Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useFetchSurveyData } from '@/lib/useFetchSurveyData';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [emailFilter, setEmailFilter] = useState<'withEmail' | 'withoutEmail' | undefined>();

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
  } = useFetchSurveyData(emailFilter);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter: 'withEmail' | 'withoutEmail' | undefined) => {
    setEmailFilter(filter);
    handleFilterClose();
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
          <Button variant="contained" onClick={handleFilterClick}>
            Filtre 1
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
            <MenuItem onClick={() => handleFilterSelect(undefined)}>Tous les utilisateurs</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('withEmail')}>Avec Email</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('withoutEmail')}>Sans Email</MenuItem>
          </Menu>
          <Button variant="contained">Filtre 2</Button>
          <Button variant="contained">Filtre 3</Button>
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
    </Container>
  );
};

export default Dashboard;
