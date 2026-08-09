import { createInterface } from "node:readline/promises";
import { parseCommand } from "./cli/parser.js";
import { pwd, ls, cd } from "./commands/navigation.js";
import { exit, clear, help } from "./commands/utilities.js";
import { mkdir, rmdir } from "./commands/directories.js";
import {systemInfo} from "./commands/system.js";
import {
    touch,
    read,
    write,
    append,
    rename,
    mv,
    deleteFile,
    info,
    find,
    pathInfo,
} from "./commands/files.js";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});

rl.on("line", async (line) => {
    rl.pause();
    const { command, args } = parseCommand(line.trim());
    try {
        if (command === "pwd") {
            console.log(pwd());
        } else if (command === "ls") {
            const content = await ls();
            console.log(content);
        } else if (command === "cd") {
            cd(args);
        } else if (command === "mkdir") {
            await mkdir(args[0]);
        } else if (command === "rmdir") {
            await rmdir(args[0]);
        } else if (command === "touch") {
            await touch(args[0]);
        } else if (command === "read") {
            const content = await read(args[0]);
            console.log(content);
        } else if (command === "write") {
            await write(args[0], args.slice(1).join(" "));
        } else if (command === "append") {
            await append(args[0], args.slice(1).join(" "));
        } else if (command === "rename") {
            await rename(args[0], args[1]);
        } else if (command === "mv") {
            await mv(args[0], args[1]);
        } else if (command === "delete") {
            await deleteFile(args[0]);
        } else if (command === "info") {
            const stats = await info(args[0]);
            console.log("Size: ", stats.size);
            console.log("Is File: ", stats.isFile());
            console.log("Is directory: ", stats.isDirectory());
            console.log("Last modification time: ", stats.mtime);
        } else if (command === "find") {
            const result = await find(process.cwd(), args[0]);
            result.forEach((el) => console.log(el, " "));
        } else if (command === "path") {
            const result = pathInfo(args[0]);

            console.log("Absolute:", result.absolute);
            console.log("Directory:", result.directory);
            console.log("Base:", result.base);
            console.log("Name:", result.name);
            console.log("Extension:", result.extension);
        } else if (command === "os") {
            const info = systemInfo();

            console.log("Platform:", info.platform);
            console.log("Architecture:", info.architecture);
            console.log("Hostname:", info.hostname);
            console.log("CPU count:", info.cpuCount);
            console.log("Total memory:", info.totalMemory);
            console.log("Free memory:", info.freeMemory);
            console.log("Home directory:", info.homeDirectory);
            console.log("Uptime:", info.uptime);
        } else if (command === "help") {
            help();
        } else if (command === "clear") {
            clear();
        } else if (command === "exit") {
            exit();
        } else if (command === "") {
        } else {
            console.error(`FILE_MANAGER: Unknown command: ${command}`);
        }
    } catch (error) {
        console.error(`FILE_MANAGER: ${command}: ${error.message}`);
    } finally {
        rl.prompt();
        rl.resume();
    }
});

rl.prompt();

process.on("SIGINT", () => {
    console.log("\n^C");
    rl.close();
});

rl.on("close", () => {
    console.log("\nEOF received");
});
