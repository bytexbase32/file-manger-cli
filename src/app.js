import { createInterface } from "node:readline/promises";
import { parseCommand } from "./cli/parser.js";
import { pwd, ls, cd } from "./commands/navigation.js";
import { exit, clear, help } from "./commands/utilities.js";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});

rl.on("line", async (line) => {
    rl.pause();
    try {
        const { command, args } = parseCommand(line.trim());
        if (command === "pwd") {
            console.log(pwd());
        } else if (command === "ls") {
            const content = await ls();
            console.log(content);
        } else if (command === "cd") {
            cd(args);
        } else if (command === "mkdir") {
        } else if (command === "rmdir") {
        } else if (command === "touch") {
        } else if (command === "read") {
        } else if (command === "write") {
        } else if (command === "append") {
        } else if (command === "rename") {
        } else if (command === "mv") {
        } else if (command === "delete") {
        } else if (command === "info") {
        } else if (command === "find") {
        } else if (command === "tree") {
        } else if (command === "path") {
        } else if (command === "compress") {
        } else if (command === "decompress") {
        } else if (command === "os") {
        } else if (command === "help") {
            help();
        } else if (command === "clear") {
            clear();
        } else if (command === "exit") {
            exit();
        } if (command === "") {
        } else {
            console.log(`FILE_MANAGER: Unknown command: ${command}`);
        }
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
