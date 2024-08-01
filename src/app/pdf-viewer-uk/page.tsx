import { getSignedUrlForUkPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerUKPage() {
  const signedUrl = await getSignedUrlForUkPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}