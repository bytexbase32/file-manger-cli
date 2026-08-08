function parseCommand(command) {
    const parts = command.trim().split(/\s+/);
    return {
        command: parts[0],
        args: parts.slice(1),
    };
}

export { parseCommand };
