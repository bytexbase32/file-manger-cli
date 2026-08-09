import fs from "node:fs/promises";

async function mkdir(directory) {
    await fs.mkdir(directory);
}

async function rmdir(directory) {
    await fs.rmdir(directory);
}

export { mkdir, rmdir };
