import { createStoreon, StoreonModule } from "storeon";
import { useStoreon } from "storeon/react"; // or storeon/preact

export class Post { 
        constructor(cid, height, board, data) {
                this.cid=cid;
                this.height = height;
                this.board=board;
                this.data=data;
        }
}

/*
interface PostBox {
  posts: Map<Board, Map<number, [Post]>>;
}

class Post {
  cid: string;
  height: number;
  board: string;
  data: string;

  constructor(cid: string, height: number, board: string, data: string) {
    this.cid = cid;
    this.height = height;
    this.board = board;
    this.data = data;
  }
}

// Events declaration: map of event names to type of event data
interface Events {
  // `set` event which goes with number as data
  post_announce: Post;
}

const PostBoxModule: StoreonModule<PostBox, Events> = (store) => {
  store.on("@init", () => {
    ports: new Map();
  });
  store.on("post_announce", (post_box, post) => {
    const box = post_box!;
    console.warn("+++ ", post);
    let board = post.board;
    if (!box.posts.has(board)) {
      box.posts.set(board, new Map());
    }

    const post_record = {
      cid: post.cid,
      //board: post.board,
      height: post.height,
      data: post.data,
    };
    if (!box.posts.get(board).has(post_record.height)) {
      box.posts.get(board).set(post_record.height, []);
    }
    return { posts: box };
  });
};

*/

// board => height => cid
//const tree = () => new Proxy({}, { get: (target, name) => name in target ? target[name] : target[name] = tree() });

const init_posts = (store) => {
        store.on("@init", () => {})
        store.on("posts/add", (postbox, post) => {

                console.warn("POSTING", post.data);
                //let o = tree();
                //o[post.board][post.height][post.cid] = post.data;
                let o = {};
                o[post.data.board] = {}
                o[post.data.board][post.data.height] = {}
                o[post.data.board][post.data.height][post.data.cid] = post.data.data;
                
                return {posts: o} ;
        })
}
//type Board = string;

export const store = createStoreon([init_posts]);
