import { getSignedUrlForVfPdf } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForVfPdf();

  return <PDFLoader signedUrl={signedUrl} />;
}
