import { promises as fs } from 'fs';

export async function getDataJson() {
    const file = await fs.readFile(process.cwd() + '/lib/data.json', 'utf8');
    return file;
}
