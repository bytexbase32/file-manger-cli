import fs from "node:fs/promises";
import path from "node:path";

async function touch(filename) {
    try {
        await fs.access(filename);
    } catch (error) {
        if (error.code === "ENOENT") {
            await fs.writeFile(filename, "");
        } else {
            throw error;
        }
    }
}

async function read(filename) {
    return await fs.readFile(filename, { encoding: "utf-8" });
}

async function write(filename, data) {
    await fs.writeFile(filename, data);
}

async function append(filename, data) {
    await fs.appendFile(filename, data);
}

async function rename(oldName, newName) {
    await fs.rename(oldName, newName);
}

async function mv(source, destination) {
    await fs.rename(source, destination);
}

async function deleteFile(filename) {
    await fs.unlink(filename);
}

async function info(filename) {
    return await fs.stat(filename);
}

async function find(startPath, name) {
    let results = [];

    async function search(currentPath) {
        let entries = await fs.readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);

            if (entry.name === name) results.push(fullPath);
            if (entry.isDirectory()) await search(fullPath);
        }
    }
    await search(startPath);
    return results;
}


function pathInfo(filename) {
    const absolutePath = path.resolve(filename);
    const parsedPath = path.parse(absolutePath);

    return {
        absolute: absolutePath,
        directory: parsedPath.dir,
        base: parsedPath.base,
        name: parsedPath.name,
        extension: parsedPath.ext,
    };
}


export { touch, read, write, append, rename, mv, deleteFile, info, find, pathInfo };
