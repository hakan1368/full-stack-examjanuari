import AddClassRoomForm from '@components/classroom/AddClassRoomForm';
import Header from '@components/header';
import { StatusMessage, User } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Classroom: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<User>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    if (!loggedInUser) {
      setStatusMessages([
        {
          message: t('Error', 'You are not authorized to view this page'),
          type: 'error',
        },
      ]);
    }
  }, []);
  return (
    <>
      <Head>
        <title>{t('')}</title>
      </Head>
      <Header />
      <main>
        <section className="flex flex-col justify-center">
          {loggedInUser && loggedInUser.role === 'admin' ? (
            <AddClassRoomForm />
          ) : (
            <div className="text-red-800">
              {statusMessages.map((msg, index) => (
                <p key={index}>{msg.message}</p>
              ))}
            </div>
          )}
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
