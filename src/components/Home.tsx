const Home = () => {
  return (
    <div>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="keywords"
        content="imageboard,image board,forum,bbs,anonymous,chan,anime,manga,ecchi,hentai,video games,english,japan"
      />
      <meta
        name="description"
        content="5chain is a simple image-based bulletin board where anyone can post comments and share images anonymously."
      />
      <meta name="robots" content="noarchive" />
      <title>5chain</title>
      <link
        rel="stylesheet"
        type="text/css"
        href="//s.4cdn.org/css/frontpage.12.css"
      />
      <link rel="shortcut icon" href="//s.4cdn.org/image/favicon.ico" />
      <link
        rel="apple-touch-icon"
        href="//s.4cdn.org/image/apple-touch-icon-iphone.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="//s.4cdn.org/image/apple-touch-icon-ipad.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="//s.4cdn.org/image/apple-touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="//s.4cdn.org/image/apple-touch-icon-ipad-retina.png"
      />
      <div id="doc">
        <div id="hd">
          <div id="logo-fp">
            <a href="/" title="Home">
              <img alt="ourChan" src="/logo.png" width={300} height={120} />
            </a>
          </div>
        </div>
        <div id="bd">
          <div className="box-outer" id="announce">
            <div className="box-inner">
              <div className="boxbar">
                <h2>What is 4chan?</h2>
                <a data-cmd="x-wot" href="#" className="closebutton" />
              </div>
              <div className="boxcontent">
                <div id="wot-cnt">
                  <p>
                    Launched on October 1, 2003, 4chan is a simple image-based
                    bulletin board where anyone can post comments and share
                    images. There are boards dedicated to a variety of topics,
                    from Japanese animation and culture to videogames, music,
                    and photography. Users do not need to register an account
                    before participating in the community. Feel free to click on
                    a board below that interests you and jump right in!
                  </p>
                  <p>
                    Be sure to familiarize yourself with the{" "}
                    <a href="/rules">Rules</a> before posting, and read the{" "}
                    <a href="/faq">FAQ</a> if you wish to learn more about how
                    to use the site.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="box-outer top-box" id="boards">
            <div className="box-inner">
              <div className="boxbar">
                <h2>Boards</h2>
                <div id="filter-btn" data-cmd="filter">
                  filter ▼
                </div>
              </div>
              <div className="board-list">
                <div className="board-category">
                  <div className="category-title">Japanese Culture</div>
                  <div className="boards">
                    <a href="/a/" className="board-link">
                      /a/ - Anime & Manga
                    </a>
                    <a href="/c/" className="board-link">
                      /c/ - Anime/Cute
                    </a>
                    <a href="/w/" className="board-link">
                      /w/ - Anime/Wallpapers
                    </a>
                    <a href="/m/" className="board-link">
                      /m/ - Mecha
                    </a>
                    <a href="/cgl/" className="board-link">
                      /cgl/ - Cosplay & EGL
                    </a>
                    <a href="/cm/" className="board-link">
                      /cm/ - Cute/Male
                    </a>
                    <a href="/f/" className="board-link">
                      /f/ - Flash
                    </a>
                    <a href="/n/" className="board-link">
                      /n/ - Transportation
                    </a>
                    <a href="/jp/" className="board-link">
                      /jp/ - Otaku Culture
                    </a>
                    <a href="/vp/" className="board-link">
                      /vp/ - Pokémon
                    </a>
                  </div>
                </div>

                <div className="board-category">
                  <div className="category-title">Video Games</div>
                  <div className="boards">
                    <a href="/v/" className="board-link">
                      /v/ - Video Games
                    </a>
                    <a href="/vg/" className="board-link">
                      /vg/ - Video Game Generals
                    </a>
                    <a href="/vm/" className="board-link">
                      /vm/ - Video Games/Multiplayer
                    </a>
                    <a href="/vmg/" className="board-link">
                      /vmg/ - Video Games/Mobile
                    </a>
                    <a href="/vp/" className="board-link">
                      /vp/ - Pokémon
                    </a>
                    <a href="/vr/" className="board-link">
                      /vr/ - Retro Games
                    </a>
                    <a href="/vrpg/" className="board-link">
                      /vrpg/ - RPG
                    </a>
                    <a href="/vst/" className="board-link">
                      /vst/ - Strategy Games
                    </a>
                    <a href="/vt/" className="board-link">
                      /vt/ - Virtual YouTubers
                    </a>
                  </div>
                </div>

                <div className="board-category">
                  <div className="category-title">Interests</div>
                  <div className="boards">
                    <a href="/co/" className="board-link">
                      /co/ - Comics & Cartoons
                    </a>
                    <a href="/g/" className="board-link">
                      /g/ - Technology
                    </a>
                    <a href="/tv/" className="board-link">
                      /tv/ - Television & Film
                    </a>
                    <a href="/k/" className="board-link">
                      /k/ - Weapons
                    </a>
                    <a href="/o/" className="board-link">
                      /o/ - Auto
                    </a>
                    <a href="/an/" className="board-link">
                      /an/ - Animals & Nature
                    </a>
                    <a href="/tg/" className="board-link">
                      /tg/ - Traditional Games
                    </a>
                    <a href="/sp/" className="board-link">
                      /sp/ - Sports
                    </a>
                    <a href="/xs/" className="board-link">
                      /xs/ - Extreme Sports
                    </a>
                    <a href="/pw/" className="board-link">
                      /pw/ - Professional Wrestling
                    </a>
                  </div>
                </div>

                <div className="board-category">
                  <div className="category-title">Creative</div>
                  <div className="boards">
                    <a href="/ic/" className="board-link">
                      /ic/ - Artwork/Critique
                    </a>
                    <a href="/wg/" className="board-link">
                      /wg/ - Wallpapers/General
                    </a>
                    <a href="/lit/" className="board-link">
                      /lit/ - Literature
                    </a>
                    <a href="/mu/" className="board-link">
                      /mu/ - Music
                    </a>
                    <a href="/fa/" className="board-link">
                      /fa/ - Fashion
                    </a>
                    <a href="/3/" className="board-link">
                      /3/ - 3DCG
                    </a>
                    <a href="/gd/" className="board-link">
                      /gd/ - Graphic Design
                    </a>
                    <a href="/diy/" className="board-link">
                      /diy/ - Do It Yourself
                    </a>
                    <a href="/wsg/" className="board-link">
                      /wsg/ - Worksafe GIF
                    </a>
                  </div>
                </div>

                <div className="board-category">
                  <div className="category-title">Other</div>
                  <div className="boards">
                    <a href="/b/" className="board-link">
                      /b/ - Random
                    </a>
                    <a href="/r/" className="board-link">
                      /r/ - Request
                    </a>
                    <a href="/r9k/" className="board-link">
                      /r9k/ - ROBOT9001
                    </a>
                    <a href="/pol/" className="board-link">
                      /pol/ - Politically Incorrect
                    </a>
                    <a href="/soc/" className="board-link">
                      /soc/ - Cams & Meetups
                    </a>
                    <a href="/s4s/" className="board-link">
                      /s4s/ - Shit 4chan Says
                    </a>
                  </div>
                </div>

                <div className="board-category">
                  <div className="category-title">Adult</div>
                  <div className="boards">
                    <a href="/s/" className="board-link">
                      /s/ - Sexy Beautiful Women
                    </a>
                    <a href="/hc/" className="board-link">
                      /hc/ - Hardcore
                    </a>
                    <a href="/hm/" className="board-link">
                      /hm/ - Handsome Men
                    </a>
                    <a href="/h/" className="board-link">
                      /h/ - Hentai
                    </a>
                    <a href="/e/" className="board-link">
                      /e/ - Ecchi
                    </a>
                    <a href="/u/" className="board-link">
                      /u/ - Yuri
                    </a>
                    <a href="/d/" className="board-link">
                      /d/ - Hentai/Alternative
                    </a>
                    <a href="/y/" className="board-link">
                      /y/ - Yaoi
                    </a>
                    <a href="/t/" className="board-link">
                      /t/ - Torrents
                    </a>
                    <a href="/hr/" className="board-link">
                      /hr/ - High Resolution
                    </a>
                    <a href="/gif/" className="board-link">
                      /gif/ - Adult GIF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-outer top-box" id="popular-threads">
            <div className="box-inner">
              <div className="boxcontent">
                <p>
                  The story goes like this: Earth is captured by a technocapital
                  singularity as renaissance rationalitization and oceanic
                  navigation lock into commoditization take-off. Logistically
                  accelerating techno-economic interactivity crumbles social
                  order in auto-sophisticating machine runaway. As markets learn
                  to manufacture intelligence, politics modernizes, upgrades
                  paranoia, and tries to get a grip.
                </p>
                <br />
              </div>
            </div>
          </div>
          <div className="yui-g">
            <div className="yui-u first"></div>
            <div className="yui-u"></div>
          </div>
        </div>
        <div id="ft">
          <br className="clear-bug" />
          <div id="copyright">
            copied from excellent href="https://github.com/smolgrrr/ourchan
            <br />
            Fuck Copyright
          </div>
        </div>
      </div>
      <div id="modal-bg" />
    </div>
  );
};

export default Home;
