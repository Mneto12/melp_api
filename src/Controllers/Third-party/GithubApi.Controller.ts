/**
 * @author Miguel Coronel
 * @date 01-03-2024
 */
import { Request, Response } from "express";
import service from "../../Services/GithubApiService";

/**
   * Método para obtener todos los commits
*/
const getCommits = async ({ params }: Request, res: Response) => {
    const { user, repo } = params;
    try {
        const data = await service.getCommits(user, repo);
        if (!data) return res.status(404).json({ message: "Commits not found" })
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ message: "Internal server error" })
    }
};

/**
   * Método para obtener un commit por su sha
   * @param {sha} string
*/
const getCommitsBySha = async ({ params }: Request, res: Response) => {
    const { user, repo, commit_sha } = params;
    try {
        const data = await service.getCommitBySha(user, repo, commit_sha);
        if (!data) return res.status(404).json({ message: "Commit not found" })
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

/**
   * Método para obtener un usuario por su username
   * @param {sha} string
*/
const getRepositories = async ({ params }: Request, res: Response) => {
    const { user } = params;
    try {
        const data = await service.getRepositories(user);
        if (!data) return res.status(404).json({ message: "User not found" })
        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ message: "Internal server error" })
    }
}


const test = async (req: Request, res: Response) => {
   // hola
}

export default module.exports = { 
    getCommits,
    getCommitsBySha,
    getRepositories,
    test
}
