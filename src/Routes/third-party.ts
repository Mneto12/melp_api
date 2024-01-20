import { Router } from "express";
import controllerGithub from '../Controllers/Third-party/GithubApi.Controller'
const router = Router();

router.get("/github/:user/:repo/commits", controllerGithub.getCommits);
router.get("/github/:user/:repo/commit/:commit_sha", controllerGithub.getCommitsBySha);
router.get("/github/users/:user", controllerGithub.getRepositories);
router.get('/test', controllerGithub.test)

export { router };