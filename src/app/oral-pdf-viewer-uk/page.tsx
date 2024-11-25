import { getSignedUrlForUkOralPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerUKPage() {
  const signedUrl = await getSignedUrlForUkOralPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}