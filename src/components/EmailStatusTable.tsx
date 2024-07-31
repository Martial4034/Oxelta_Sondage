import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Typography, Chip
} from '@mui/material';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

interface EmailStatusTableProps {
  emailDocs: { email: string; idEmail: string }[];
}

const statusColors: { [key: string]: string } = {
  'email.delivered': '#4caf50',  // green
  'email.bounced': '#f44336',    // red
  'email.clicked': '#673ab7',    // purple
  'email.delivery_delayed': '#ff9800',  // orange
};

const EmailStatusTable: React.FC<EmailStatusTableProps> = () => {
  const [emailStatuses, setEmailStatuses] = useState<{ email: string; status: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmailStatuses = async () => {
      try {
        const q = query(collection(db, 'sondage'), where('email', '!=', ''));
        const querySnapshot = await getDocs(q);
        const statuses = querySnapshot.docs.map(doc => ({
          email: doc.data().email,
          status: doc.data().mailStatus || 'Unknown'
        }));
        setEmailStatuses(statuses);
      } catch (error) {
        console.error('Error fetching email statuses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailStatuses();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="mt-6">
      <Typography variant="h6" component="h2" gutterBottom>
        Statut des Emails
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emailStatuses.map((doc, index) => (
              <TableRow key={doc.email}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.email}</TableCell>
                <TableCell>
                  <Chip
                    label={doc.status}
                    sx={{
                      backgroundColor: statusColors[doc.status] || 'default',
                      color: 'white',
                      border: `1px solid ${statusColors[doc.status] || 'default'}`,
                    }}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmailStatusTable;
