import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, Query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SurveyData } from '@/types/survey';
import { ChartData } from 'chart.js';
import { countDocumentsWithField } from '@/lib/firebaseUtils';

type Filters = {
  emailFilter?: 'withEmail' | 'withoutEmail';
  mobileGamingFilter?: 'true' | 'false' | 'all';
  blockchainFilter?: ('yes' | 'no' | 'a little')[];
};

export const useFetchSurveyData = ({ emailFilter, mobileGamingFilter, blockchainFilter }: Filters) => {
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);
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
        label: 'Intérêt pour Clash of Clans',
        data: Array(11).fill(0),
        backgroundColor: '#36A2EB',
      },
    ],
  });
  const [interestInDigitalAssetsData, setInterestInDigitalAssetsData] = useState<ChartData<'bar'>>({
    labels: Array.from({ length: 11 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Intérêt pour les actifs numériques',
        data: Array(11).fill(0),
        backgroundColor: '#FF6384',
      },
    ],
  });
  const [interestInEarningTokensData, setInterestInEarningTokensData] = useState<ChartData<'bar'>>({
    labels: Array.from({ length: 11 }, (_, i) => i.toString()),
    datasets: [
      {
        label: 'Intérêt pour gagner des jetons',
        data: Array(11).fill(0),
        backgroundColor: '#FFCE56',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Initialisez la collection
      let baseQuery: Query = collection(db, 'sondage');

      // Appliquez les filtres
      if (emailFilter) {
        baseQuery = query(
          baseQuery,
          where('email', emailFilter === 'withEmail' ? '!=' : '==', '')
        );
      }

      if (mobileGamingFilter && mobileGamingFilter !== 'all') {
        baseQuery = query(
          baseQuery,
          where('mobileGaming', '==', mobileGamingFilter === 'true')
        );
      }

      if (blockchainFilter && blockchainFilter.length > 0) {
        baseQuery = query(
          baseQuery,
          where('blockchainFamiliarity', 'in', blockchainFilter)
        );
      }

      const querySnapshot = await getDocs(baseQuery);
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

      setLoading(false);
    };

    fetchData();
  }, [emailFilter, mobileGamingFilter, blockchainFilter]);

  return {
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
  };
};
