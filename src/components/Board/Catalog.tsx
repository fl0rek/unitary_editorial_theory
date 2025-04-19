import { useCallback } from "react";
import { useNostrEvents } from "nostr-react";
import EventRow from "./EventRow";
import { boards } from "../../constants/Const";
import "./thread.css";
import { PinnedPosts } from "./PinnedPosts";
import { pinnedPosts } from "../../constants/Const";
import { InputNumber } from "primereact/inputnumber";
import { publish, subscribe, unsubscribe } from "../../events";
import { useStoreon } from "storeon/react";
import { Post } from "../../store";

import Lumina from "../../App";
/*
import { useEffect, useState, useCallback, useRef } from "react";
import globalEventEmitter from "../../event-emitter";

/*
export const useEventEmitter = <T>(eventName: string) => {
  const [eventData, setEventData] = useState<T>();
  const skipRerender = useRef(false);
};

const useEventEmitter = (eventName: string) => {
  const [eventData, setEventData] = useState();
  const skipRerender = useRef(false);
};

const publishEvent = useCallback(
  (eventData, skipRender = true) => {
    skipRerender.current = skipRender;
    const event = new CustomEvent(eventName, { detail: eventData });
    globalEventEmitter.dispatchEvent(event);
  },
  [eventName],
);
*/

interface CatalogBannerProps {
  currentboard: String;
}

const useNostrEventsForBoard = (currentboard: String) => {
  console.info("Hello");
  //console.log(currentboard);

  //const board = boards[currentboard];
  //const pinnedPostsBoard: string[] | undefined = pinnedPosts.find( (pinnedPost) => pinnedPost[0] === board[0],);

  const { events: pinnedEvents } = useNostrEvents({ filter: { ids: [] } });

  const { events } = useNostrEvents({
    filter: {
      kinds: [1],
      //"#p": [board[1]],
      limit: 100,
    },
  });
  // Filter events where event.tags > 1
  //const filteredEvents = events.filter( (event) => !event.tags.some((tag) => tag[0] === "e"),);

  return { pinnedEvents, events };
};

function doScan() {
  const from = (
    document.getElementById("scan_from")?.firstElementChild as HTMLInputElement
  )?.value;
  const to = (
    document.getElementById("scan_to")?.firstElementChild as HTMLInputElement
  )?.value;
  console.log("submit", from, to);
  publish("command", {
    msg: "Scan range command",
    data: { scan: { from: from, to: to } },
  });
}

const Catalog: React.FC<CatalogBannerProps> = ({ currentboard }) => {
  const board = `/${currentboard}/`;
  console.log("Opening: ", board);
  const { dispatch, posts } = useStoreon("posts");

  subscribe("post_announce", (ev: any) => {
    console.log("NEW POST: ", ev);
    dispatch("posts/add", {
      cid: ev.detail.cid,
      height: ev.detail.height,
      board: board,
      data: ev.detail.data,
    });
  });

  var postlist: Post[] = [];
  if (posts) {
    for (const [height, cids] of Object.entries(posts[board])) {
      for (const [cid, data] of Object.entries(cids!)) {
        //console.log("P", height, cid, data);
        postlist.push(new Post(cid, height, board, data));
      }
    }
    //console.log("P: ", posts[board]);
    //const board_posts = posts["/b/"] ?? [];
    //console.log("P: ", board_posts);
  }

  //const board_posts: any[] = [];

  return (
    <>
      <div id="ctrl-top" className="desktop">
        <hr />
        <InputNumber prefix="@" placeholder="from" id="scan_from" />
        -
        <InputNumber prefix="@" placeholder="to" id="scan_to" />
        <button onClick={doScan}>scan</button>
      </div>
      <div id="content">
        <div id="threads" className="extended-small">
          {postlist.map((post: Post) => (
            <EventRow key={post.cid} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

//<Lumina></Lumina>
/*
          {pinnedEvents.map((event) => (
            <PinnedPosts key={event.id} event={event} />
          ))}
                                        */
export default Catalog;
