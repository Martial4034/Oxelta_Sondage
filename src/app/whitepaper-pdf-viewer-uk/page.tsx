import { getSignedUrlForUkWhitePaperPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerUKPage() {
  const signedUrl = await getSignedUrlForUkWhitePaperPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}