import Layout from '@/components/Layout';
import DisasterList from '@/components/DisasterList';
import AlertBanner from '@/components/AlertBanner';
import AuthSection from '@/components/AuthSection';

const Index = () => {
  return (
    <Layout>
      <AuthSection />
      <AlertBanner
        level="info"
        message="Stay safe and informed during disasters. Check our resources for assistance."
        detailsLink="/resources"
      />
      <DisasterList />
    </Layout>
  );
};

export default Index;
