"use client";

import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import PieChartComponent from '@/components/ui/PieChartComponent';
import BarChartComponent from '@/components/ui/BarChartComponent';
import RadarChartComponent from '@/components/ui/RadarChartComponent';
import { SurveyData } from '@/types/survey';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      if (!session) {
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);
  
  const [surveyData, setSurveyData] = useState<SurveyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'sondage'));
      const data = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        responseDate: doc.data().responseDate.toDate(), // Assuming Firestore timestamp
      })) as SurveyData[];
      setSurveyData(data);
    };

    fetchData();
  }, []);

  const mobileGamingData = surveyData.reduce<{ reponses: string; nombre: number; fill: string; }[]>((acc, cur) => {
    const response = cur.mobileGaming ? 'Oui' : 'Non';
    const index = acc.findIndex(item => item.reponses === response);
    if (index !== -1) {
      acc[index].nombre += 1;
    } else {
      acc.push({ reponses: response, nombre: 1, fill: cur.mobileGaming ? "var(--color-oui)" : "var(--color-non)" });
    }
    return acc;
  }, []);

  const blockchainFamiliarityData = surveyData.reduce<{ reponses: string; nombre: number; }[]>((acc, cur) => {
    const index = acc.findIndex(item => item.reponses === cur.blockchainFamiliarity);
    if (index !== -1) {
      acc[index].nombre += 1;
    } else {
      acc.push({ reponses: cur.blockchainFamiliarity, nombre: 1 });
    }
    return acc;
  }, []);

  const interestData = surveyData.reduce<{ reponses: string; nombre: number; }[]>((acc, cur) => {
    const index = acc.findIndex(item => item.reponses === cur.interestInEarningTokens.toString());
    if (index !== -1) {
      acc[index].nombre += 1;
    } else {
      acc.push({ reponses: cur.interestInEarningTokens.toString(), nombre: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <PieChartComponent 
          data={mobileGamingData} 
          title="Jouez-vous à des jeux vidéo mobiles ?" 
          description="Répartition des réponses"
        />
        <BarChartComponent 
          data={blockchainFamiliarityData} 
          title="Êtes-vous familiarisé avec la technologie de la blockchain ?" 
          description="Répartition des réponses"
        />
        <RadarChartComponent 
          data={interestData} 
          title="Intérêt pour gagner des tokens" 
          description="Intérêt où vous pouvez gagner de l’argent sous forme de tokens"
        />
      </div>
    </div>
  );
};

export default Dashboard;
