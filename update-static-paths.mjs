import path from 'path';
import fs from 'fs';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

async function listFiles({ owner, repo, rootDir, ref = 'remote-metas-experiment' }) {
    try {
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path: rootDir,
            ref,
        });

        const filenames = response.data
            .filter(file => file.type === 'file')
            .map(file => file.path.replace(rootDir, ''));

        return filenames;
    } catch (error) {
        console.error('Error fetching files from GitHub:', error);
        throw error;
    }
}

async function findStaticPaths({ owner, repo, rootDir }) {
    try {
        const filePaths = await listFiles({ owner, repo, rootDir, ref: "remote-metas-experiment" });
        return filePaths
            .filter(filename => /\.mdx?$/.test(filename))
            .map(filename => ({
                params: {
                    slug: filename.replace(/\.mdx?$/, '').split('/'),
                },
            }));
    } catch (error) {
        console.error('Error finding static paths:', error);
        throw error;
    }
}

async function generateStaticPaths() {
    const owner = 'bigcommerce';
    const repo = 'docs';
    const rootDir = 'docs/';
    const staticPaths = await findStaticPaths({ owner, repo, rootDir });

    const outputPath = path.join(process.cwd(), 'static-paths.json');
    try {
        console.log(staticPaths.length, 'static paths generated')
        fs.writeFileSync(outputPath, JSON.stringify(staticPaths, null, 2));
        console.log('Static paths written to', outputPath);
    } catch (error) {
        console.error('Error generating static paths:', error);
        process.exit(1);
    }
}

export { listFiles, generateStaticPaths, findStaticPaths };
