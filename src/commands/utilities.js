function exit() {
    console.log("exit");
    process.exit(0);
}

function clear() {
    console.clear();
}

function help() {
    console.log(" ****** File manager CLI version 1.0.0 ****** ");
    console.log("pwd");
    console.log("ls");
    console.log("cd [..]");
    console.log("mkdir [..]");
    console.log("rmdir [..]");
    console.log("touch [..]");
    console.log("read [..]");
    console.log("write [..]");
    console.log("rename [..] [..]");
    console.log("mv [..] [..]");
    console.log("delete [..]");
    console.log("info [..]");
    console.log("find [..]");
    console.log("tree");
    console.log("path [..]");
    console.log("hash [..]");
    console.log("compress [..]");
    console.log("decompress [..]");
    console.log("os");
    console.log("help");
    console.log("clear");
    console.log("exit");
}

export { exit, clear, help };
