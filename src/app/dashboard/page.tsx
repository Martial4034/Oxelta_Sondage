'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import PieChartComponent from '@/components/ui/PieChartComponent';
import BarChartComponent from '@/components/ui/BarChartComponent';
import RadarChartComponent from '@/components/ui/RadarChartComponent';
import { SurveyData } from '@/types/survey';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

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

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated' && !session) {
    return <div>Session not found. Please try logging in again.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <PieChartComponent 
          data={surveyData} 
          title="Jouez-vous à des jeux vidéo mobiles ?" 
          description="Répartition des réponses"
        />
        <BarChartComponent 
          data={surveyData} 
          title="Êtes-vous familiarisé avec la technologie de la blockchain ?" 
          description="Répartition des réponses"
        />
        <RadarChartComponent 
          data={surveyData} 
          title="Intérêt pour gagner des tokens" 
          description="Intérêt où vous pouvez gagner de l’argent sous forme de tokens"
        />
      </div>
    </div>
  );
};

export default Dashboard;
