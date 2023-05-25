import type { PageServerLoad } from "./$types";
import projects from "../projects.json";
import { error } from "@sveltejs/kit";

export const load = (({ params, url }) => {
  const projectTitle = params.project;

  const err = url.searchParams.get("err");
  if (err) throw error(418, "This is a test error");

  const project = projects.find(({ title }) => title === projectTitle);
  if (!project) throw error(404, "no such file or directory");

  return { project };
}) satisfies PageServerLoad;
