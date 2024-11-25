import { getSignedUrlForVfOralPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForVfOralPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}