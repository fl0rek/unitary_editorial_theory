import init, { NodeWorker } from "lumina-node-wasm";

init().then(() => {

        Error.stackTraceLimit = 99;

        let worker = new NodeWorker(global);
        console.log("Starting NodeWorker");

        worker.run();
})
