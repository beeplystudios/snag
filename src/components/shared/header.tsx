import Head from "next/head";

export const Header: React.FC<{ title?: string }> = ({ title }) => {
  return (
    <Head>
      <title>{`${title ? title + " | " : ""}Snag`}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={`${title ? title + " | " : ""}Snag`} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Get snaggy with it" />
    </Head>
  );
};
