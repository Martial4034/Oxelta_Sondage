import { getSignedUrlForUkOralPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForUkOralPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}