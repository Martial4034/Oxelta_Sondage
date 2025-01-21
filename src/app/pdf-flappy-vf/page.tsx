import { getSignedUrlForFlappyVF } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerVFPage() {
  const signedUrl = await getSignedUrlForFlappyVF();

  return <PDFLoader signedUrl={signedUrl} />;
}
