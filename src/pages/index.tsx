import type { FC } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';

const Home: FC = () => {
  return (
    <Fragment>
      <Head>
        <title>Afu React</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>Home</div>
    </Fragment>
  );
};

export default Home;
