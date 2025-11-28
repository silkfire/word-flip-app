import { spawn } from "bun";

// Start the watcher
spawn(["bun", "run", "watch.js"], { stdout: "inherit", stderr: "inherit" });

// Start the server
spawn(["bun", "--hot", "server.js"], { stdout: "inherit", stderr: "inherit" });
