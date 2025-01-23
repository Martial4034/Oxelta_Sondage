import { getSignedUrlForPartner } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForPartner();

  return <PDFLoader signedUrl={signedUrl} />;
}
