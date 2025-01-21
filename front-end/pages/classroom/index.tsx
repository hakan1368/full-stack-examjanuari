import AddClassRoomForm from '@components/classroom/AddClassRoomForm';
import Header from '@components/header';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const Classroom: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('')}</title>
      </Head>
      <Header />
      <main>
        <section className="flex flex-col justify-center">
          <AddClassRoomForm />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Classroom;
