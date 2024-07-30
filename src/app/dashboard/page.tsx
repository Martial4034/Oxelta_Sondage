// app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { countDocumentsWithField } from '@/lib/firebaseUtils';
import '@/lib/chartjs-config'; // Importez la configuration de Chart.js ici
import PieChartComponent from '@/components/ui/PieChartComponent';
import BarChartComponent from '@/components/ui/BarChartComponent';
import { ChartData } from 'chart.js';
import { SurveyData } from '@/types/survey';
import EmailStatusTable from '@/components/EmailStatusTable';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [emailChartData, setEmailChartData] = useState<ChartData<'pie'>>({
    labels: ['Avec Email', 'Sans Email'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  });
  const [mobileGamingData, setMobileGamingData] = useState<ChartData<'pie'>>({
    labels: ['True', 'False'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  });
  const [blockchainFamiliarityData, setBlockchainFamiliarityData] = useState<ChartData<'pie'>>({
    labels: ['Yes', 'No', 'A little'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  });

  const [interestInClashOfClansData, setInterestInClashOfClansData] = useState<ChartData<'bar'>>({
    labels: Array.from({ length: 11 }, (_, i) => i.toString()), // ["0", "1", ..., "10"]
    datasets: [
      {
        label: 'Interest in Clash of Clans',
        data: Array(11).fill(0),
        backgroundColor: '#36A2EB',
      },
    ],
  });

  const [interestInDigitalAssetsData, setInterestInDigitalAssetsData] = useState<ChartData<'bar'>>({
    labels: Array.from({ length: 11 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Interest in Digital Assets',
        data: Array(11).fill(0),
        backgroundColor: '#FF6384',
      },
    ],
  });

  const [interestInEarningTokensData, setInterestInEarningTokensData] = useState<ChartData<'bar'>>({
    labels: Array.from({ length: 11 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Interest in Earning Tokens',
        data: Array(11).fill(0),
        backgroundColor: '#FFCE56',
      },
    ],
  });

  const [totalResponses, setTotalResponses] = useState(0);
  const [totalEmails, setTotalEmails] = useState(0);
  const [totalMobileGaming, setTotalMobileGaming] = useState({ true: 0, false: 0 });
  const [totalBlockchainFamiliarity, setTotalBlockchainFamiliarity] = useState({
    yes: 0,
    no: 0,
    aLittle: 0,
  });

  const [avgInterestInClashOfClans, setAvgInterestInClashOfClans] = useState(0);
  const [avgInterestInDigitalAssets, setAvgInterestInDigitalAssets] = useState(0);
  const [avgInterestInEarningTokens, setAvgInterestInEarningTokens] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'sondage'));
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        responseDate: doc.data().responseDate.toDate(),
      })) as SurveyData[];
      setSurveyData(data);

      const emailCount = countDocumentsWithField(data, 'email');
      const mobileGamingTrueCount = data.filter(doc => doc.mobileGaming === true).length;
      const mobileGamingFalseCount = data.filter(doc => doc.mobileGaming === false).length;
      const blockchainYesCount = data.filter(doc => doc.blockchainFamiliarity?.toLowerCase() === 'yes').length;
      const blockchainNoCount = data.filter(doc => doc.blockchainFamiliarity?.toLowerCase() === 'no').length;
      const blockchainALittleCount = data.filter(doc => doc.blockchainFamiliarity?.toLowerCase() === 'a little').length;

      const interestInClashOfClansCounts = Array(11).fill(0);
      const interestInDigitalAssetsCounts = Array(11).fill(0);
      const interestInEarningTokensCounts = Array(11).fill(0);

      let totalInterestInClashOfClans = 0;
      let totalInterestInDigitalAssets = 0;
      let totalInterestInEarningTokens = 0;

      data.forEach(doc => {
        interestInClashOfClansCounts[doc.interestInClashOfClans]++;
        interestInDigitalAssetsCounts[doc.interestInDigitalAssets]++;
        interestInEarningTokensCounts[doc.interestInEarningTokens]++;

        totalInterestInClashOfClans += doc.interestInClashOfClans;
        totalInterestInDigitalAssets += doc.interestInDigitalAssets;
        totalInterestInEarningTokens += doc.interestInEarningTokens;
      });

      const avgClashOfClans = data.length ? totalInterestInClashOfClans / data.length : 0;
      const avgDigitalAssets = data.length ? totalInterestInDigitalAssets / data.length : 0;
      const avgEarningTokens = data.length ? totalInterestInEarningTokens / data.length : 0;

      setAvgInterestInClashOfClans(avgClashOfClans);
      setAvgInterestInDigitalAssets(avgDigitalAssets);
      setAvgInterestInEarningTokens(avgEarningTokens);

      setTotalResponses(data.length);
      setTotalEmails(emailCount);
      setTotalMobileGaming({ true: mobileGamingTrueCount, false: mobileGamingFalseCount });
      setTotalBlockchainFamiliarity({
        yes: blockchainYesCount,
        no: blockchainNoCount,
        aLittle: blockchainALittleCount,
      });

      setEmailChartData({
        labels: ['Avec Email', 'Sans Email'],
        datasets: [
          {
            data: [emailCount, data.length - emailCount],
            backgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      });

      setMobileGamingData({
        labels: ['True', 'False'],
        datasets: [
          {
            data: [mobileGamingTrueCount, mobileGamingFalseCount],
            backgroundColor: ['#36A2EB', '#FF6384'],
          },
        ],
      });

      setBlockchainFamiliarityData({
        labels: ['Yes', 'No', 'A little'],
        datasets: [
          {
            data: [blockchainYesCount, blockchainNoCount, blockchainALittleCount],
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          },
        ],
      });

      setInterestInClashOfClansData({
        labels: Array.from({ length: 11 }, (_, i) => i.toString()),
        datasets: [
          {
            label: 'Intérêt pour Clash of Clans',
            data: interestInClashOfClansCounts,
            backgroundColor: '#36A2EB',
          },
        ],
      });

      setInterestInDigitalAssetsData({
        labels: Array.from({ length: 11 }, (_, i) => i.toString()),
        datasets: [
          {
            label: 'Intérêt pour les actifs numériques',
            data: interestInDigitalAssetsCounts,
            backgroundColor: '#FF6384',
          },
        ],
      });

      setInterestInEarningTokensData({
        labels: Array.from({ length: 11 }, (_, i) => i.toString()),
        datasets: [
          {
            label: 'Intérêt pour gagner des jetons',
            data: interestInEarningTokensCounts,
            backgroundColor: '#FFCE56',
          },
        ],
      });
    };

    fetchData();
  }, []);

  if (status === 'loading') {
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
          <Button variant="contained">Filtre 1</Button>
          <Button variant="contained">Filtre 2</Button>
          <Button variant="contained">Filtre 3</Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
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
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Intérêt pour Clash of Clans
              </Typography>
              <BarChartComponent data={interestInClashOfClansData} />
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                Note moyenne : {avgInterestInClashOfClans.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Intérêt pour les actifs numériques
              </Typography>
              <BarChartComponent data={interestInDigitalAssetsData} />
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                Note moyenne : {avgInterestInDigitalAssets.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Intérêt pour gagner des jetons
              </Typography>
              <BarChartComponent data={interestInEarningTokensData} />
              <Typography variant="body1" align="center" sx={{ mt: 2 }}>
                Note moyenne : {avgInterestInEarningTokens.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <EmailStatusTable emailDocs={emailDocs} />
      </Box>
    </Container>
  );
};

export default Dashboard;
