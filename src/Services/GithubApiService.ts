/**
 * @author Miguel Coronel
 * @date 01-03-2024
 */

import { Commit } from '../Interfaces/Commits'
import thirdParty from '../Lib/GithubApi'

/**
   * Método para obtener todos los commits
   * @returns {Promise<Commmits>}
*/
const getCommits = async (user: string, repo: string): Promise<Commit[] | undefined> => {
    const commits =  await thirdParty.getCommits(user, repo)

    if (!commits) return

    return transformCommits(commits)
}

const getCommitBySha = async (user: string, repo: string, sha: string): Promise<Commit | undefined> => {
    const commit =  await thirdParty.getCommitBySha(user, repo, sha)

    if (!commit) return

    let commitArray: Array<any> = []
    commitArray.push(commit)

    return transformCommits(commitArray)
}

const getRepositories = async (user: string): Promise<any> => {
    const repositories =  await thirdParty.getRepositories(user)

    if (!repositories || repositories.message) return

    return transformRepositories(repositories)
}

// Transforma la estructura de los commits a una mas sencilla
const transformCommits = (commits: any): any => {
    return commits.map((commit: any) => {
        return {
            sha: commit.sha,
            message: commit.commit.message,
            author: commit.commit.author.name,
            date: commit.commit.author.date
        }
    })
}

// Transforma la estructura de los repositorios a solo el nombre
const transformRepositories = (repositories: any): any => {
    return repositories.map((repository: any) => {
        return {
            name: repository.name,
        }
    })
}

export default module.exports = { 
    getCommits,
    getCommitBySha,
    getRepositories
}