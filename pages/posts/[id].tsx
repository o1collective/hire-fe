import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import Layout from "../../components/layout";
import Date from "../../components/date";

import { getAllPostIds, getPostData } from "../../lib/posts";
import { getFormData } from "../../lib/forms";

import utilStyles from "../../styles/utils.module.css";
import FlexiForm from "../../components/flexiform";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);
  const formData = await getFormData(params.id);
  return {
    props: {
      postData,
      formData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
};

export default function Post({
  postData,
  formData,
}: {
  postData: {
    title: string;
    date: string;
    longDescription: {
      aboutThisRole: string;
      skillsRequired: string[];
      niceToHaves: string[];
    };
  };
  formData: {
    id: string;
    fields: {
      htmlTags: string;
      label: string;
      type: string;
      id: string;
      required: boolean;
      options: {
        value: string;
        label: string;
      }[];
      name: string;
    }[];
    action: string;
    method: string;
    button: {
      type: "submit" | "button" | "reset";
      text: string;
    };
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={utilStyles.headingLg}>About This Role</div>
        <div>{postData.longDescription.aboutThisRole}</div>
        <div className={utilStyles.headingLg}>Skills Required</div>
        <ul>
          {postData.longDescription.skillsRequired.map((skill) => {
            return <li className={utilStyles.listItem}>{skill}</li>;
          })}
        </ul>
        <div className={utilStyles.headingLg}>Nice To Haves</div>
        <ul>
          {postData.longDescription.niceToHaves.map((nice) => {
            return <li className={utilStyles.listItem}>{nice}</li>;
          })}
        </ul>
      </article>
      <div className={utilStyles.headingLg}>Register here</div>
      <FlexiForm formFieldsData={formData} />
    </Layout>
  );
}
