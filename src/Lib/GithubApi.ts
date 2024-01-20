/**
 * @author Miguel Coronel
 * @date 01-03-2024
 */

import { configServices } from "../Config/services";
import { Commit } from "../Interfaces/Commits";

const key = configServices.TOKEN_GITHUB_API

const getCommits = async (user: string, repo: string): Promise<Commit[] | undefined> => {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/commits`, {
        method: 'GET',
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${key}`
        }
    })
    const commits = await response.json();
    return commits;
}

const getCommitBySha = async (user: string, repo: string, sha: string): Promise<Commit> => {
    const response = await fetch(`https://api.github.com/repos/${user}/${repo}/commits/${sha}`, {
        method: 'GET',
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${key}`
        }
    })
    const commits = await response.json();
    return commits;
}

const getRepositories = async (user: string): Promise<any> => {
    const response = await fetch(`https://api.github.com/users/${user}/repos`, {
        method: 'GET',
        headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${key}`
        }
    })
    const commits = await response.json();
    return commits;
}

export default module.exports = {
    getCommits,
    getCommitBySha,
    getRepositories
}

// TODO: Routes
// 'https://api.github.com/repos/{ownwer}/{repo}/'
// 'https://api.github.com/repos/{ownwer}/{repo}/commits'
// 'https://api.github.com/repos/{ownwer}/{repo}/:sha'
// 'https://api.github.com/users/{ownwer}/repos'
// 'https://api.github.com/users/{ownwer}' -> 'https://avatars.githubusercontent.com/u/{id_image}'
