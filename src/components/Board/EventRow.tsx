import { useNostrEvents } from "nostr-react";
import { parseContent } from "../../utils/parseContent";
import { useState, useEffect } from "react";
import "./thread.css";
import { Event } from "nostr-tools";
import * as bolt11 from "bolt11";
import Popout from "../PostForms/PopoutMain";
import media_failed from "../../assets/media_failed.png";
import { Post } from "../../store";

export function useReplyCounts(event: Event) {
  const { events } = useNostrEvents({
    filter: {
      kinds: [1, 9735],
      "#e": [event.id],
      limit: 100,
    },
  });
  const [replyCount, setReplyCount] = useState(0);
  const [imageReplyCount, setImageReplyCount] = useState(0);
  const [zapAmount, setZapAmount] = useState(0);

  useEffect(() => {
    const filteredEvents = events.filter(
      (event) => parseContent(event).file !== "",
    );

    const zapEvents = events.filter((event) => event.kind === 9735);

    const amount = zapEvents.reduce((acc, event) => {
      let zapped = event.tags[1][1];
      try {
        const decoded = bolt11.decode(zapped);
        const decodedAmount = decoded?.satoshis;
        if (decodedAmount == null) {
          throw new Error("Invalid invoice");
        } else {
          return acc + decodedAmount;
        }
      } catch (error) {
        return acc;
      }
    }, 0);

    setZapAmount(amount);
    setReplyCount(events.length - zapEvents.length);
    setImageReplyCount(filteredEvents.length);
  }, [events]);

  return { replyCount, zapAmount, imageReplyCount };
}

type EventRowProps = {
  post: Post;
};

const EventRow = ({ post }: EventRowProps) => {
  //const { replyCount, zapAmount, imageReplyCount } = useReplyCounts(event);
  //const { subject, zapAddress, comment, file } = parseContent(post);
  const [whichPopout, setWhichPopout] = useState("null");

  const replyCount = 0;
  const zapAmount = 0;
  const imageReplyCount = 0;

  const subject = post.height;
  const zapAddress = post.cid;
  const comment = post.data;
  const file = "";

  const closePopout = () => {
    if (whichPopout === "null") {
      setWhichPopout("zap");
    } else if (whichPopout === "zap") {
      setWhichPopout("null");
    }
  };

  const renderMedia = () => {
    //if (file && (file.endsWith(".mp4") || file.endsWith(".webm"))) {
    if (file) {
      return (
        <video
          controls
          className="thumb"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        >
          <source src={file} type="video/mp4" />
        </video>
      );
    } else if (!file.includes("http")) {
      return (
        <img
          alt="Invalid thread"
          loading="lazy"
          className="thumb"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
          src={media_failed}
        />
      );
    } else {
      return (
        <img
          alt="Invalid thread"
          loading="lazy"
          className="thumb"
          style={{ maxWidth: "150px", maxHeight: "150px" }}
          src={file}
        />
      );
    }
  };

  return (
    <>
      <div className="thread">
        <a href={`/thread/$${post.cid}@${post.height}`}>{renderMedia()}</a>
        {zapAddress ? (
          <div className="threadIcons">
            <a href="#" onClick={closePopout}>
              <span>{zapAddress}</span>
            </a>
          </div>
        ) : null}
        <div title="(R)eplies / (I)mage Replies" id="meta" className="meta">
          R: <b>{replyCount}</b>{" "}
          {imageReplyCount > 0 && (
            <span>
              / I: <b>{imageReplyCount}</b>
            </span>
          )}
          {zapAmount > 0 && (
            <span>
              {" "}
              / &#9889;: <b>{zapAmount}</b>
            </span>
          )}
          <a
            href={`/thread/$${post.cid}@${post.height}`}
            className="postMenuBtn"
            title="Thread Menu"
          >
            ▶
          </a>
        </div>
        <div className="teaser">
          {subject && <b>{subject}:</b>} {comment}
        </div>
      </div>
      #
    </>
  );
};

export default EventRow;

