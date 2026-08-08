import fs from "node:fs/promises";

function pwd() {
    return process.cwd();
}

async function ls() {
    const content = await fs.readdir(pwd());
    return content;
}

function cd(args) {
    if (args.length !== 1) {
        console.log(`FILE_MANAGER: cd: too many arguments`);
        return;
    }
    try {
        process.chdir(args[0]);
    } catch (error) {
        console.log(`FILE_MANAGER: cd: ${error}`);
    }
}

export { pwd, ls, cd };
