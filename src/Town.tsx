import React, { useState, useEffect, useRef } from "react";
import { useStoreon } from "storeon/react";
import { publish, subscribe } from "./events";
import { Post } from "./store";

// Mock data to simulate WASM module fetch
const BOARDS = [
  { id: "a", name: "Anime & Manga" },
  { id: "b", name: "Random" },
  { id: "g", name: "Technology" },
  { id: "pol", name: "Politically Incorrect" },
];

const THREADS = [
  {
    id: 1,
    board: "a",
    op: {
      name: "Anonymous",
      timestamp: "05/20/23(Thu)15:30:42",
      content: "What anime are you watching this season?",
      image: "https://maxm-imggenurl.web.val.run/anime-poster",
      postNumber: 123456,
    },
    replies: [
      {
        name: "Anonymous",
        timestamp: "05/20/23(Thu)15:35:12",
        content: "Chainsaw Man is pretty good",
        postNumber: 123457,
      },
      {
        name: "Anonymous",
        timestamp: "05/20/23(Thu)15:40:22",
        content: "Demon Slayer season 3 is mid",
        postNumber: 123458,
      },
    ],
  },
];

export function Town() {
  const [currentBoard, setCurrentBoard] = useState("a");
  //const [threads, setThreads] = useState(THREADS);
  const [boardInput, setBoardInput] = useState("");
  const [boardError, setBoardError] = useState("");

  // New state for scan inputs
  const [scanInput1, setScanInput1] = useState("");
  const [scanInput2, setScanInput2] = useState("");
  const [watchChecked, setWatchChecked] = useState(true);

  // New state for terminal logs
  const [logs, setLogs] = useState([
    "> System initialized",
    "> Waiting for user input",
  ]);
  const logEndRef = useRef(null);

  const addLog = (message: any) => {
    setLogs((prevLogs) => [...prevLogs, `> ${message}`]);
  };

  useEffect(() => {
    // Scroll to bottom of logs
    //logEndRef.current?. scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleBoardInput = (e: any) => {
    const input = e.target.value.toLowerCase().trim();
    setBoardInput(input);
    setBoardError("");
  };

  const submitBoardInput = (e: any) => {
    e.preventDefault();
    const matchedBoard = BOARDS.find((board) => board.id === boardInput);

    if (matchedBoard) {
      setCurrentBoard(matchedBoard.id);
      addLog(`Switched to board /${matchedBoard.id}/ - ${matchedBoard.name}`);
      setBoardInput("");
      setBoardError("");
    } else {
      setBoardError("Board not found");
      addLog(`Error: Board /${boardInput}/ not found`);
    }
  };

  const handleScan = (e: any) => {
    e.preventDefault();
    // Enhanced scan logging
    const start = scanInput1 || "start";
    const end = scanInput2 || "end";

    addLog(`Scanning from ${start} to ${end}`);

    console.log("submit", start, end);
    publish("command", {
      msg: "Scan range command",
      data: { scan: { from: start, to: end } },
    });
  };

  const { dispatch, posts } = useStoreon("posts");
  const [postlist, setPostlist] = useState([] as Post[]);

  subscribe("post_announce", (ev: any) => {
    let announce = new Post(
      ev.detail.data.cid,
      ev.detail.data.height,
      ev.detail.data.board,
      ev.detail.data.data,
    );
    console.log("NEW POST: ", announce);
    dispatch("posts/add", announce);

    const posts = postlist.concat([announce]);
    setPostlist(posts);
  });

  /*
  //var postlist: Post[] = [];
  if (posts && posts[currentBoard]) {
    console.log("P: ", posts, currentBoard);
    for (const [height, cids] of Object.entries(posts[currentBoard])) {
      for (const [cid, data] of Object.entries(cids!)) {
        //console.log("P", height, cid, data);
        postlist.push(new Post(cid, height, currentBoard, data));
      }
    }
    //const board_posts = posts["/b/"] ?? [];
    //console.log("P: ", board_posts);
    console.log("P: ", postlist);
  }
        */

  console.log("P: ", postlist);
  return (
    <div className="board-container">
      <div className="board-header">
        <h1>
          /{currentBoard}/ - {BOARDS.find((b) => b.id === currentBoard)?.name}
        </h1>
      </div>

      <div className="board-navigation">
        {BOARDS.map((board) => (
          <a
            key={board.id}
            href={`#${board.id}`}
            className={currentBoard === board.id ? "active" : ""}
            onClick={() => {
              setCurrentBoard(board.id);
              addLog(`Switched to board /${board.id}/ - ${board.name}`);
            }}
          >
            /{board.id}/
          </a>
        ))}
        <div className="board-nav-right">
          <div className="scan-section">
            <form onSubmit={handleScan} className="scan-input-form">
              <span className="input-prefix">@</span>
              <input
                type="number"
                value={scanInput1}
                onChange={(e) => setScanInput1(e.target.value)}
                placeholder="Start"
                className="scan-input"
              />
              <span className="input-prefix">@</span>
              <input
                type="number"
                value={scanInput2}
                onChange={(e) => setScanInput2(e.target.value)}
                placeholder="End"
                className="scan-input"
              />
              <button type="submit" className="scan-button">
                Scan
              </button>
              <label className="watch-checkbox">
                <input
                  type="checkbox"
                  checked={watchChecked}
                  onChange={(e) => setWatchChecked(e.target.checked)}
                />
                Watch
              </label>
            </form>
          </div>
          <form onSubmit={submitBoardInput} className="board-input-form">
            <input
              type="text"
              value={boardInput}
              onChange={handleBoardInput}
              placeholder="Enter board"
              className={boardError ? "board-input-error" : ""}
            />
            {boardError && (
              <span className="board-error-message">{boardError}</span>
            )}
          </form>
        </div>
      </div>

      <div className="threads-container">
        {postlist.map((thread) => (
          <div key={thread.cid} className="thread">
            <div className="thread-op">
              <div className="post-info">
                <span className="post-name">{thread.cid}</span>
                <span className="post-time">{thread.height}</span>
                <span className="post-number">No. {thread.height}</span>
              </div>

              {false && thread.data && (
                <div className="thread-image">
                  <img src={thread.data} alt="Thread image" />
                </div>
              )}

              <blockquote className="post-content">{thread.data}</blockquote>
            </div>
          </div>
        ))}
      </div>

      <div className="terminal-log">
        <div className="terminal-content">
          {logs.map((log, index) => (
            <div key={index} className="log-line">
              {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
}
