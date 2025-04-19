import Home from "./components/Home";
import BoardView from "./components/Board/BoardView";
import Thread from "./components/Thread/Thread";
import NonChanView from "./components/NonChan/NonChanView";
import "./style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./store";
//import { spawnNode } from "lumina-node";
import init, {
  Namespace,
  Network,
  NodeClient,
  NodeConfig,
} from "lumina-node-wasm";
import { useEffect } from "react";
import { publish, subscribe, unsubscribe } from "./events";
import { StoreContext } from "storeon/react";

declare global {
  interface Window {
    //nostr?: any;
    lumina?: NodeClient;
  }
}

async function spawnNode() {
  let worker = new Worker(new URL("worker.js", import.meta.url), {
    type: "module",
  });
  let client = await new NodeClient(worker);
  return client;
}

function luminaDispatcher(ev: MessageEvent<any>) {
  let message = ev.data;
  if (message["is_error"]) {
    console.error("lumina error", ev.data);
    return;
  }
  const event = message.get("event");
  const event_type = event.type;
  if (
    [
      "fetching_headers_started",
      "share_sampling_result",
      "sampling_finished",
      "sampling_started",
    ].includes(event_type)
  ) {
    return;
  }
  if (event_type === "fetching_headers_finished") {
    publish("get_headers", {
      msg: "Got headers",
      data: event,
    });
    return;
  }
  if (["connecting_to_bootnodes"].includes(event_type)) {
    publish("connecting", {
      msg: "Connecting to bootstrappers.",
      data: {},
    });
    return;
  }
  if (["peer_connected"].includes(event_type)) {
    publish("peers", {
      msg: "Peer connected",
      data: {},
    });
    return;
  }

  if (event_type === "post_announce") {
    publish("post_announce", {
      msg: "Post",
      data: event,
    });
    return;
  }
  console.debug("lumina event", ev.data);
}

const toBytes = (text: string): number[] => {
  const buffer = Buffer.from(text, "utf8");
  const result = Array(buffer.length);
  for (let i = 0; i < buffer.length; ++i) {
    result[i] = buffer[i];
  }
  return result;
};

function App() {
  useEffect(() => {
    const launch = async () => {
      await init();
      const node_config = NodeConfig.default("mamo-1");
      node_config.bootnodes = [
        "/dnsaddr/da-bridge-0.par.mamochain.com/p2p/12D3KooWNc3hDtzLvyKj8xbcE3SFMRy4uX5EojCScCuqYRrz4tzS",
        "/ip4/10.0.0.122/udp/2121/quic-v1/webtransport/certhash/uEiC9qQ07A3eKnrw8g8lbe72sKWBv0GF5BK9J48ZWG7AAXQ/certhash/uEiBWKL71sgUfg7ygpbJ5cjkGCpI2irAqaHOM0B9TOJGhXw/p2p/12D3KooWAiZZ6LK1NbqvTFsPUsnDzQy1ARGYiCvth3DDEsGShZA2",
      ];

      console.log("c", node_config);
      window.lumina = await spawnNode();

      let event_channel = await window.lumina?.eventsChannel();
      event_channel.onmessage = luminaDispatcher;
      console.debug("lumina launched", await window.lumina?.start(node_config));

      await window.lumina.waitConnectedTrusted();
      console.info("head: ", await window.lumina.getNetworkHeadHeader());
      const peers = await window.lumina.peerTrackerInfo();
      publish("peers", {
        msg: "Updating peer stats",
        data: {
          connected: peers.num_connected_peers,
          trusted: peers.num_connected_trusted_peers,
        },
      });
    };

    subscribe("command", (event: any) => {
      if (event.detail.data.scan) {
        let channel = new MessageChannel();
        window.lumina?.addConnectionToWorker(channel.port1);
        const scan = async () => {
          const lumina = await new NodeClient(channel.port2);
          let from = BigInt(event.detail.data.scan.from.replace(/[^0-9]/g, ""));
          const to = BigInt(event.detail.data.scan.to.replace(/[^0-9]/g, ""));
          console.log("rpc get_headers(", from, to, ")");
          while (from <= to) {
            console.log("fetch ", from);
            lumina.request_all_posts(from, "/b/").then(() => console.log("DL"));
            /*
              lumina.getHeaderByHeight(from).then((header: any) => {
                lumina
                  .requestAllBlobs(header!, new Namespace(toBytes("/b/")))
                  .then((blobs: any) => {
                    for (let blob of blobs) {
                      console.log("got blob: ", blob.toJSON());
                    }
                  });
              });
                                                        */
            from++;
          }
        };
        scan();
      }
    });

    /*
    subscribe((event: any) => {
      let event_type = event.detail.event;
      console.warn("[" + event_type + "]", event.detail.msg, event.detail.data);
    });
                */

    launch();
  });

  return (
    <StoreContext.Provider value={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:boardParam" element={<BoardView />} />
            <Route path="/thread/:id" element={<Thread />} />
            <Route path="/mostr" element={<NonChanView />} />
          </Routes>
        </div>
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
