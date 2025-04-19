import Catalog from "./Catalog";
import BoardBanner from "../Misc/BoardBanner";
import NewThread from "../PostForms/NewThread";
import { useParams } from "react-router-dom";
import { boards } from "../../constants/Const";

const BoardView = () => {
  const { boardParam } = useParams();
  const boardIndex: string = boardParam!;

  // <BoardBanner currentboard={boardIndex} />
  // <NewThread currentboard={boardIndex} />
  return (
    <div>
      <hr className="abovePostForm" />
      <div style={{ position: "relative" }} />
      <Catalog currentboard={boardIndex} />
    </div>
  );
};

export default BoardView;

