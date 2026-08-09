import os from "node:os";

function systemInfo() {
    return {
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        cpuCount: os.cpus().length,
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        homeDirectory: os.homedir(),
        uptime: os.uptime(),
    };
}

export { systemInfo };
