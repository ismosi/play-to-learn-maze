import Navbar from "../Components/homeComponents/navbar/navbar";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../Store/hooks";

function Index() {
  const navigate = useNavigate();

  const userInfo = useAppSelector((state) => state.app.userInfo);

  const handleStartGame = () => {
    if (userInfo !== null) {
      navigate("/gameDescription");
    } else {
      localStorage.setItem("redirectAfterLogin", "/gameDescription");
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar title="基于React和搜索算法的迷宫游戏" />

      <a onClick={handleStartGame}>
        {/* <img
          className={classes.homeImage}
          src="public/Images/medie_type_png/home.png"
          alt=""
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1430"
          height="650"
          viewBox="0 0 1100 1000"
          style={{ backgroundColor: "#f0f4f8" }}
        >
          {/* <!-- 标题 --> */}
          <text x="-300" y="100" font-size="40" font-weight="bold">
            MAZE EXPLORER
          </text>

          {/* <!-- 拼图式迷宫展示 --> */}
          <g
            className="maze-hover maze-float1"
            transform="translate(-150, 150)"
          >
            <rect
              x="0"
              y="0"
              width="350"
              height="350"
              fill="#e8f4f0"
              stroke="#2d6a4f"
              strokeWidth="4"
              rx="8"
              ry="8"
            />
            {/* <!-- 迷宫图案 --> */}
            <rect x="35" y="35" width="280" height="18" fill="#40916c" />
            <rect x="35" y="70" width="18" height="245" fill="#40916c" />
            <rect x="70" y="70" width="18" height="70" fill="#40916c" />
            <rect x="105" y="105" width="175" height="18" fill="#40916c" />
            <rect x="263" y="123" width="18" height="140" fill="#40916c" />
            <rect x="105" y="228" width="140" height="18" fill="#40916c" />
            <rect x="105" y="263" width="18" height="52" fill="#40916c" />
            <rect x="140" y="298" width="123" height="18" fill="#40916c" />
            {/* <!-- 入口和出口 --> */}
            <rect
              x="53"
              y="35"
              width="18"
              height="18"
              fill="#ff9e00"
              rx="4"
              ry="4"
            />
            <rect
              x="280"
              y="298"
              width="18"
              height="18"
              fill="#ff006e"
              rx="4"
              ry="4"
            />
            <text
              x="175"
              y="390"
              textAnchor="middle"
              fontFamily="'Courier New', monospace"
              fontSize="24"
              fill="#2d6a4f"
              style={{ fontWeight: "bold" }}
            >
              FOREST MAZE
            </text>
          </g>

          {/* <!-- 冰雪迷宫 --> */}
          <g className="maze-hover maze-float2" transform="translate(425, 180)">
            <rect
              x="0"
              y="0"
              width="350"
              height="350"
              fill="#f0f9ff"
              stroke="#468faf"
              strokeWidth="4"
              rx="8"
              ry="8"
            />
            {/* <!-- 迷宫图案 --> */}
            <rect x="35" y="35" width="280" height="18" fill="#a5d8ff" />
            <rect x="298" y="53" width="18" height="262" fill="#a5d8ff" />
            <rect x="35" y="70" width="245" height="18" fill="#a5d8ff" />
            <rect x="35" y="105" width="18" height="210" fill="#a5d8ff" />
            <rect x="70" y="105" width="210" height="18" fill="#a5d8ff" />
            <rect x="70" y="140" width="18" height="140" fill="#a5d8ff" />
            <rect x="105" y="140" width="175" height="18" fill="#a5d8ff" />
            <rect x="105" y="175" width="18" height="105" fill="#a5d8ff" />
            <rect x="140" y="245" width="140" height="18" fill="#a5d8ff" />
            {/* <!-- 入口和出口 --> */}
            <rect
              x="53"
              y="35"
              width="18"
              height="18"
              fill="#ff9e00"
              rx="4"
              ry="4"
            />
            <rect
              x="140"
              y="245"
              width="18"
              height="18"
              fill="#ff006e"
              rx="4"
              ry="4"
            />
            <text
              x="175"
              y="390"
              textAnchor="middle"
              fontFamily="'Courier New', monospace"
              fontSize="24"
              fill="#468faf"
              style={{ fontWeight: "bold" }}
            >
              ICE MAZE
            </text>
          </g>

          {/* <!-- 沙漠迷宫 --> */}
          <g className="maze-hover maze-float3" transform="translate(30, 575)">
            <rect
              x="0"
              y="0"
              width="350"
              height="350"
              fill="#fef6e6"
              stroke="#e76f51"
              strokeWidth="4"
              rx="8"
              ry="8"
            />
            {/* <!-- 迷宫图案 --> */}
            <rect x="35" y="35" width="18" height="280" fill="#f4a261" />
            <rect x="53" y="35" width="245" height="18" fill="#f4a261" />
            <rect x="280" y="53" width="18" height="245" fill="#f4a261" />
            <rect x="53" y="298" width="227" height="18" fill="#f4a261" />
            <rect x="70" y="70" width="193" height="18" fill="#f4a261" />
            <rect x="70" y="105" width="18" height="175" fill="#f4a261" />
            <rect x="105" y="105" width="158" height="18" fill="#f4a261" />
            <rect x="245" y="123" width="18" height="158" fill="#f4a261" />
            <rect x="105" y="263" width="140" height="18" fill="#f4a261" />
            {/* <!-- 入口和出口 --> */}
            <rect
              x="53"
              y="35"
              width="18"
              height="18"
              fill="#ff9e00"
              rx="4"
              ry="4"
            />
            <rect
              x="105"
              y="263"
              width="18"
              height="18"
              fill="#ff006e"
              rx="4"
              ry="4"
            />
            <text
              x="175"
              y="390"
              textAnchor="middle"
              fontFamily="'Courier New', monospace"
              fontSize="24"
              fill="#e76f51"
              style={{ fontWeight: "bold" }}
            >
              DESERT MAZE
            </text>
          </g>

          {/* <!-- 玩家角色 --> */}
          <g className="player" transform="translate(800, 500) scale(3.75)">
            {/* <!-- 玩家SVG代码 --> */}
            <rect width="80" height="80" fill="transparent" />
            <rect x="24" y="12" width="32" height="12" fill="#3a86ff" />
            <rect x="20" y="24" width="4" height="12" fill="#3a86ff" />
            <rect x="56" y="24" width="4" height="12" fill="#3a86ff" />
            <rect x="16" y="16" width="8" height="8" fill="#3a86ff" />
            <rect x="56" y="16" width="8" height="8" fill="#3a86ff" />
            <rect x="24" y="24" width="32" height="24" fill="#ffafcc" />
            <rect x="28" y="32" width="8" height="8" fill="#ffffff" />
            <rect x="30" y="34" width="4" height="4" fill="#000000" />
            <rect x="44" y="32" width="8" height="8" fill="#ffffff" />
            <rect x="46" y="34" width="4" height="4" fill="#000000" />
            <rect x="36" y="44" width="8" height="2" fill="#ff0a54" />
            <rect x="12" y="16" width="4" height="12" fill="#333333" />
            <rect x="64" y="16" width="4" height="12" fill="#333333" />
            <rect x="16" y="12" width="8" height="4" fill="#333333" />
            <rect x="56" y="12" width="8" height="4" fill="#333333" />
            <rect x="16" y="28" width="4" height="4" fill="#ff006e" />
            <rect x="60" y="28" width="4" height="4" fill="#ff006e" />
            <rect x="30" y="56" width="4" height="4" fill="#ff9500" />
            <rect x="34" y="52" width="4" height="4" fill="#ff9500" />
            <rect x="38" y="56" width="4" height="4" fill="#ff9500" />
            <rect x="42" y="52" width="4" height="4" fill="#ff9500" />
            <rect x="46" y="56" width="4" height="4" fill="#ff9500" />
          </g>

          {/* <!-- 艺术性"开始游戏"文字  --> */}
          <g className="start-text" transform="translate(850, 400)">
            <text
              className="text-animate1"
              x="0"
              y="0"
              fontSize="48"
              fontFamily="'Microsoft YaHei', sans-serif"
              fill="#00b894" // 更亮的绿色
              style={{ fontWeight: "bold" }}
            >
              开
            </text>
            <text
              className="text-animate2"
              x="60"
              y="0"
              fontSize="48"
              fontFamily="'Microsoft YaHei', sans-serif"
              fill="#0984e3" // 更亮的蓝色
              style={{ fontWeight: "bold" }}
            >
              始
            </text>
            <text
              className="text-animate3"
              x="120"
              y="0"
              fontSize="48"
              fontFamily="'Microsoft YaHei', sans-serif"
              fill="#ff7675" // 更亮的红色
              style={{ fontWeight: "bold" }}
            >
              游
            </text>
            <text
              className="text-animate4"
              x="180"
              y="0"
              fontSize="48"
              fontFamily="'Microsoft YaHei', sans-serif"
              fill="#fdcb6e" // 更亮的橙色
              style={{ fontWeight: "bold" }}
            >
              戏
            </text>
          </g>

          {/* <!-- 装饰性像素元素 --> */}
          <rect
            x="950"
            y="100"
            width="15"
            height="15"
            fill="#ff006e"
            rx="3"
            ry="3"
            style={{ animation: "floatPixel1 3s ease-in-out infinite" }}
          />
          <rect
            x="980"
            y="130"
            width="15"
            height="15"
            fill="#ff9e00"
            rx="3"
            ry="3"
            style={{ animation: "floatPixel2 3.5s ease-in-out infinite" }}
          />
          <rect
            x="1010"
            y="100"
            width="15"
            height="15"
            fill="#3a86ff"
            rx="3"
            ry="3"
            style={{ animation: "floatPixel3 4s ease-in-out infinite" }}
          />
          <rect
            x="1040"
            y="130"
            width="15"
            height="15"
            fill="#ff9500"
            rx="3"
            ry="3"
            style={{ animation: "floatPixel4 3.2s ease-in-out infinite" }}
          />

          <style>
            {`
              @keyframes floatPixel1 {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(-8px, -5px); }
              }
              @keyframes floatPixel2 {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(5px, -10px); }
              }
              @keyframes floatPixel3 {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(-6px, -8px); }
              }
              @keyframes floatPixel4 {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(7px, -6px); }
              }
              
              /* 迷宫浮动动画 */
              @keyframes mazefloat1 {
                0%, 100% { transform: translate(-150px, 150px) scale(1); }
                50% { transform: translate(-147px, 146px) scale(1); }
              }
              @keyframes mazefloat2 {
                0%, 100% { transform: translate(425px, 180px) scale(1); }
                50% { transform: translate(428px, 175px) scale(1); }
              }
              @keyframes mazefloat3 {
                0%, 100% { transform: translate(30px, 575px) scale(1); }
                50% { transform: translate(33px, 571px) scale(1); }
              }
              
              .maze-float1 {
                animation: mazefloat1 4s ease-in-out infinite;
                transition: filter 0.3s ease;
              }
              .maze-float2 {
                animation: mazefloat2 4.5s ease-in-out infinite 0.5s;
                transition: filter 0.3s ease;
              }
              .maze-float3 {
                animation: mazefloat3 5s ease-in-out infinite 1s;
                transition: filter 0.3s ease;
              }
              
              .maze-hover {
                transition: filter 0.3s ease;
              }
              .maze-hover:hover {
                filter: brightness(1.1) drop-shadow(0 0 8px rgba(0,0,0,0.2));
              }
            `}
          </style>

          <style>
            {`
              @keyframes textSequence {
                0%, 100% { 
                  filter: brightness(1);
                  transform: translateY(0);
                }
                25% { 
                  filter: brightness(1.3) drop-shadow(0 0 5px rgba(0,0,0,0.1));
                  transform: translateY(-5px);
                }
              }
              
              .text-animate1 {
                animation: textSequence 2s ease-in-out infinite;
              }
              .text-animate2 {
                animation: textSequence 2s ease-in-out infinite 0.5s;
              }
              .text-animate3 {
                animation: textSequence 2s ease-in-out infinite 1s;
              }
              .text-animate4 {
                animation: textSequence 2s ease-in-out infinite 1.5s;
              }
            `}
          </style>
        </svg>
      </a>
    </>
  );
}

export default Index;
