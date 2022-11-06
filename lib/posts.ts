import fs from "fs";
import path from "path";
import matter from "gray-matter";

import jobs from "../posts/jobs.json";

import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const jobRoles = jobs.jobs;

  return jobRoles.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const jobRoles = jobs.jobs;

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return jobRoles.map((fileName) => {
    return {
      params: {
        id: fileName.id,
      },
    };
  });
}

export async function getPostData(id) {
  const jobRoles = jobs.jobs;
  const job = jobRoles.filter((job) => {
    return job.id == id;
  });

  return {
    ...job[0],
  };
}
