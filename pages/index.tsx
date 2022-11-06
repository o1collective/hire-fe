import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    location: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Join the BIG NOODLE revolution!</p>
        <p>
          This is a trial website. Go to my{" "}
          <a href="https://ideas.pinsern.com">First post</a>!
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Jobs</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, location }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small>{location}</small>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
