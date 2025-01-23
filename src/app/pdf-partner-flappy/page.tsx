import { getSignedUrlForFlappyPartner } from '@/lib/firebaseAdmin';
import PDFLoader from '@/components/PDFLoader';

export default async function PDFViewerUkPage() {
  const signedUrl = await getSignedUrlForFlappyPartner();

  return <PDFLoader signedUrl={signedUrl} />;
}
