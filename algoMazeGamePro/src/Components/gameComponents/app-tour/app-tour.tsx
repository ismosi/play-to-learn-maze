import Joyride, { CallBackProps, STATUS } from "react-joyride";

import { useEffect, useState, useRef } from "react";

import classes from "./app-tour.module.scss";

import { Step } from "react-joyride";

import { useAppSelector } from "@/Store/hooks";

// import Avatar from "@/Views/Player/Avatar/index";
import Player1 from "@/Views/Game/Player/1Player";
import Player2 from "@/Views/Game/Player/2Player";
import Player3 from "@/Views/Game/Player/3Player";

import moveGif from "../../../../public/Videos/medie-type-gif/move.gif";
import skillGif from "../../../../public/Videos/medie-type-gif/skill.gif";
import slowGif from "../../../../public/Videos/medie-type-gif/slow.gif";
import clearGif from "../../../../public/Videos/medie-type-gif/clear.gif";
import diyGif from "../../../../public/Videos/medie-type-gif/diy.gif";

function AppTour() {
  const gameNumber = useAppSelector((state) => state.app.gameNumber);
  const scene = useAppSelector((state) => state.app.scene);
  const player = useAppSelector((state) => state.app.player);
  const algo = useAppSelector((state) => state.app.algo);

  const characters = [
    {
      name: "探险家奈雅",
      description:
        "奈雅是一位充满好奇心的算法探险家，她有着标志性的蓝色头发和时尚的耳机。作为一名计算机科学天才，能够凭借惊人的直觉在迷宫的每一个可能路径中寻找最佳解决方案。",
      com: <Player1 />,
    },
    {
      name: "守护骑士阿凌",
      description:
        "阿凌是迷宫世界中的守护骑士，橙色的短发下是一双洞察一切的眼睛，总是能以最高效的方式到达目标。‘作为骑士，我不会遗漏任何一个拐角。’",
      com: <Player2 />,
    },
    {
      name: "魔法师迪尔",
      description:
        "迪尔是一位年长的魔法师，他的标志是蓝色尖顶帽和标志性的细框眼镜。他的长胡子中蕴含着多年的算法智慧。‘不是所有路径都是平等的，智者会选择总体阻力最小的道路。’",
      com: <Player3 />,
    },
  ];

  let currentPlayerCom = null;
  const currentPlayer = characters.find((item) => item.name == player);
  if (currentPlayer) currentPlayerCom = currentPlayer.com;
  else currentPlayerCom = <Player1 />;

  const algorithms = [
    {
      name: "深度优先搜索",
      description:
        "深度优先搜索是一种图遍历算法。该算法的基本思想是，从某个起点出发，沿着一个分支一直深入直到无法继续，然后回溯到上一个分支节点并继续探索。DFS可以通过递归或栈来实现，它通常用于在一个节点或状态空间中查找目标节点或探索路径。DFS被广泛应用于迷宫生成、搜索问题、路径优化等领域。在迷宫生成中，DFS可以构建具有较高复杂性和迷宫感的迷宫结构。通过递归或栈来沿着路径不断深入，每当无法继续时回溯到上一个节点，进而选择另一个路径。该方法适合用来生成具有较强探索性和一定难度的迷宫，玩家需要通过探索和回溯来寻找出路。DFS生成的迷宫具有较强的纵深感，路径可能较为复杂，且会频繁出现死胡同。由于算法在生成过程中不断深入某一方向，通常会导致迷宫结构中存在很多曲折和难度较高的部分，这也增加了迷宫的挑战性。DFS的迷宫有时显得较为封闭，使得玩家需要通过大量的试探才能找到合适的路径。",
    },
    {
      name: "广度优先搜索",
      description:
        "广度优先搜索（BFS）是一种图遍历算法，它的基本思想是从起始节点开始，逐层探索每个节点的邻居节点，直到找到目标节点为止。BFS能够保证找到从起点到终点的最短路径，因此在路径寻找、最短路径问题以及地图生成等领域有广泛应用。BFS在迷宫生成中的作用通常是在已生成的迷宫中寻找从起点到终点的最短路径，也可以通过BFS来生成一种较为规则、均匀的迷宫布局。与DFS不同，BFS在生成过程中更加注重层次的扩展，生成的迷宫较为直线，路径清晰，并且更容易找到出路。BFS生成的迷宫通常具有均匀的通道分布，其最大的特点是，生成的迷宫不会出现难以通过的死胡同或复杂布局，能够保证玩家在迷宫中不容易迷失方向。BFS生成的迷宫通常具有均匀的通道分布，路径较为平坦，适合用来设计较为简单、易通行的迷宫。其最大的特点是，生成的迷宫不会出现难以通过的死胡同或复杂布局，能够保证玩家在迷宫中不容易迷失方向。",
    },
    {
      name: "Prim算法",
      description:
        "Prim算法是一种经典的贪心算法，用于生成最小生成树（MST），它通过不断选择最小边来扩展生成树，直到所有节点都被连接。Prim算法广泛应用于图的连接问题、网络设计等领域，并且被证明是一种高效的生成最小生成树的方式。在迷宫生成中，Prim算法能够生成连通且无环的路径结构。通过从一个初始节点开始，选择与当前树连接的最小边，逐步生成迷宫的通道。由于Prim算法的逐步扩展特性，生成的迷宫通常具有较为规则且连续的通道。Prim算法生成的迷宫具有较强的结构化特点，路径间有着较为明显的连通性。由于算法的贪心策略，生成的迷宫中通常会有一个主干道，其他分支会逐步从主干道扩展出来。这种结构适合设计具有明确路径的游戏地图。Prim算法适用于那些需要具有明显主干道和较少死胡同的迷宫设计。它能够在生成的过程中确保各个区域的连通性，从而避免产生孤立区域。可以确保玩家不会被困住，同时保持一定的挑战性。",
    },
    {
      name: "Kruskal算法",
      description:
        "Kruskal算法是另一种经典的生成最小生成树（MST）的贪心算法。与Prim算法不同，Kruskal算法从所有的边开始，按权重从小到大选择边进行合并，直到所有节点都被连接。Kruskal算法适合用于稀疏图，时间复杂度为O(E log E)。在迷宫生成中，Kruskal算法通过随机选择边并将其添加到生成的树中，能够创建一个复杂且具有一定随机性的迷宫。算法的每一步都可以通过选择一条最短边，保证生成的迷宫在拓扑结构上既复杂又不容易出现过多的死胡同。Kruskal算法生成的迷宫通常更加不规则，路径之间较为交错，增加了迷宫的复杂度。与Prim算法生成的规则迷宫不同，Kruskal算法的迷宫设计常常带有随机性，给玩家带来更高的挑战感。生成的迷宫可能包含多个分支和有趣的死胡同，增加了解谜的难度。Kruskal算法生成的迷宫通常更加不规则，路径之间较为交错，增加了迷宫的复杂度。与Prim算法生成的规则迷宫不同，Kruskal算法的迷宫设计常常带有随机性，",
    },
    {
      name: "递归分割",
      description:
        "使用递归分割方法生成迷宫:递归分割算法是一种利用递归方式将空间分割为多个区域的迷宫生成方法。该算法将地图空间分成若干小块，每次分割都创建一条墙壁，然后在每个小块中递归执行相同的操作。递归分割通常用于二维网格地图的生成，尤其适合用于创建具有强烈格子化结构的迷宫。递归分割算法通过将地图分割成多个子区域，逐步生成迷宫的墙壁和通道，最终形成一个完整的迷宫。每次分割时，算法会确保所有的分割都产生合法的墙壁和通道，从而使迷宫具有适当的结构和可探索性。递归分割生成的迷宫通常具有较为规则的结构，墙壁和通道的分布有明显的网格化特征。虽然该算法生成的迷宫较为规整，但其简单的递归分割方法也能创造出多样的迷宫结构，适合用于需要细致设计的场景。递归分割非常适合于需要经典迷宫设计的游戏。它能够快速创建规则的迷宫布局，适合用于传统迷宫游戏或需要大量探索的关卡设计。",
    },
    {
      name: "随机Prim",
      description:
        "使用随机化的Prim算法生成迷宫：随机Prim算法是基于Prim算法的变种，它通过随机化路径的选择来增加迷宫生成的不可预测性。与传统的Prim算法相比，随机Prim算法每次选择连接当前树的边时，采取随机选择的方式，从而避免生成规则的迷宫结构。随机Prim算法在迷宫生成中的作用是通过随机选择边来生成具有不规则布局的迷宫。由于算法的随机性，生成的迷宫更具探索性，玩家需要通过多次尝试和推理才能找到通往终点的路径。随机Prim生成的迷宫更加随机和复杂，路径分布不再均匀，且常常带有较强的曲折性。与传统Prim算法相比，随机化的过程增加了迷宫的挑战性，使得迷宫更加难以预测。随机Prim非常适合用于那些需要随机性和不确定性的迷宫设计。特别是在冒险类或解谜类游戏中，使用随机Prim可以增加游戏的可玩性和探索性，给玩家带来更多的挑战。",
    },
    {
      name: "Wilson算法",
      description:
        "使用Wilson的循环擦除算法生成迷宫：Wilson算法是基于随机游走的迷宫生成算法，由David Wilson于1996年提出。该算法通过从一个随机节点开始，使用随机游走来生成迷宫路径，直到回到起点或连接到已有的迷宫结构中。Wilson算法的核心在于通过随机游走来创建迷宫结构，而这种结构往往具有较强的随机性和不可预测性。生成的迷宫有时会出现很长的随机路径或复杂的通道布局。Wilson算法生成的迷宫通常较为随机，路径和通道布局充满变化。由于采用随机游走的策略，生成的迷宫常常带有很强的不可预测性，使得玩家在迷宫中体验到更高的探索性和挑战性。Wilson算法适合用于那些需要随机性和独特迷宫布局的游戏设计。特别是那些需要丰富关卡和探索机制的游戏，Wilson算法能够提供更加复杂和具有挑战性的地图结构。",
    },
    {
      name: "递归回溯",
      description:
        "使用递归回溯方法生成迷宫：递归回溯是一种常用的算法技术，广泛应用于图遍历、迷宫生成和求解组合问题。其基本思路是从起点出发，沿着一条路径不断前进，直到遇到障碍或结束条件。然后回溯到上一个分支，选择不同的路径继续探索。在迷宫生成中，递归回溯算法能够生成结构复杂的迷宫。通过从起点开始，算法逐步深入每一个可能的路径，一旦遇到死胡同就回溯并选择另一条路径继续。这个过程不断循环，直到整个迷宫被完整生成。递归回溯生成的迷宫具有很强的随机性，通常生成的迷宫既有深度又复杂，适合用于生成挑战性强的迷宫地图。由于算法的回溯特性，迷宫中的路径设计往往比较难以预测，因此游戏的探索性较强。递归回溯适用于那些需要复杂结构和多重路径的迷宫游戏，特别是那些玩家需要深入探索和回溯的解谜类游戏。",
    },
    {
      name: "Aldous-Broder",
      description:
        "使用Aldous-Broder随机游走算法生成迷宫:Aldous-Broder算法是一种基于随机游走的迷宫生成算法，它通过从一个随机节点开始，进行随机游走并不断访问未访问过的节点，直到形成一个连通的迷宫。Aldous-Broder算法最初用于最小生成树的生成。Aldous-Broder算法通过随机游走逐步生成迷宫，生成的迷宫具有较强的随机性和不规则性。这个算法的特色在于，它不仅仅关注生成的路径，还包括路径之间的连接性，生成的迷宫通常具有较好的连通性。Aldous-Broder算法生成的迷宫有着较强的随机性，路径较长且分布不规则，增加了迷宫的难度和探索性。该算法生成的迷宫适合那些需要高随机性和复杂布局的游戏。Aldous-Broder算法适用于那些需要不规则、随机化迷宫布局的游戏，能够为玩家提供高度不确定的探索体验。",
    },
  ];

  let currentAlgoDes = null;
  const currentAlgo = algorithms.find((item) => item.name == algo);
  if (currentAlgo) currentAlgoDes = currentAlgo?.description;
  else currentAlgoDes = algorithms[0].description;

  const [inProgress, setInProgress] = useState(false);

  const handleClickStart = (event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    setInProgress(true);
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(data.status)) {
      setInProgress(false);
    }
  };

  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
    } else {
      handleClickStart();
    }
  }, []);

  const tourSteps: Step[] = [
    {
      content: (
        <>
          <h2 style={{ margin: "0", whiteSpace: "pre-wrap" }}>
            第{gameNumber}关 {algo}: {scene}
          </h2>
          <br />
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
            }}
          >
            {currentPlayerCom}
          </div>

          <p style={{ fontSize: "14px", textAlign: "left" }}>
            玩法介绍:本关系统自动采用玩家选择的算法生成地图，玩家可以通过键盘“⬆️
            ⬇️ ⬅️ ➡️”在已生成的地图上移动所学角色。抵达迷宫的出口即可通关。
          </p>
          <img
            style={{
              width: "50%",
              height: "auto", // 确保高度自适应
              aspectRatio: "1 / 1",
              objectFit: "cover", // 防止图片变形
            }}
            src={moveGif}
            alt=""
          />
        </>
      ),
      locale: { skip: <strong aria-label="skip">SKIP</strong> },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <>
          <h4 style={{ fontSize: "14px", textAlign: "left" }}>
            这是该角色的特定技能，可以用来开挂，让你更快更不费力的找到迷宫的出口，点击该按钮的右上角可以查看技能内部所属搜索算法的详细介绍哦。
          </h4>
          <img
            style={{
              width: "50%",
              height: "auto", // 确保高度自适应
              aspectRatio: "1 / 1",
              objectFit: "cover", // 防止图片变形
            }}
            src={skillGif}
            alt=""
          />
        </>
      ),
      target: "#skillEye",
    },
    {
      content: (
        <h4 style={{ fontSize: "14px", textAlign: "left" }}>
          这是针对该角色特定技能的加持辅助性节能，你很快会发现，前一个节能只能开挂3s,如果你想更久的开挂，请使用冻结技能。同样的，你也可以点击该按钮的右上角查看详情。
        </h4>
      ),
      target: "#skillSnow",
    },
    {
      content: (
        <h4 style={{ fontSize: "14px", textAlign: "left" }}>
          想知道在这一关你的表现如何吗？看这里，你就知道本次游戏通关可以了解到哪些指标，比如本次通关玩家花费的总时间和总步数。
        </h4>
      ),
      target: ".path-info",
    },
    {
      content: (
        <>
          <h4 style={{ fontSize: "14px", textAlign: "left" }}>
            正所谓知己知彼，百战不殆，如果只是凭感觉去尝试可能的出口路径那太low了，想了解算法是怎么生成地图的吗？很简单！✨答案就在这里，你可以选择光速✨版，也可以选择🐌版，不同的选择会控制不同的迷宫生成的速度，我相信，当复杂庞大的迷宫以🐌般的速度建设时，你肯定会说，“Wow,原来这么复杂迷宫是这么生成的！”
          </h4>
          <img
            style={{
              width: "50%",
              height: "auto", // 确保高度自适应
              aspectRatio: "1 / 1",
              objectFit: "cover", // 防止图片变形
            }}
            src={slowGif}
            alt=""
          />
        </>
      ),
      target: "#speed-select",
    },
    {
      content: (
        <>
          <h4 style={{ fontSize: "14px", textAlign: "left" }}>
            很快，当你发现你对生成迷宫的流程已胸有成足但不小心玩了🐌版速度的时候，你无法中断这个宇宙级慢速的过程，你可能会很抓狂很想中断这么慢的进度。记住，这时候刷新按钮可以帮助到你。
          </h4>
          <img
            style={{
              width: "50%",
              height: "auto", // 确保高度自适应
              aspectRatio: "1 / 1",
              objectFit: "cover", // 防止图片变形
            }}
            src={clearGif}
            alt=""
          />
        </>
      ),
      target: "#refresh",
    },
    {
      content: (
        <h4 style={{ fontSize: "14px", textAlign: "left" }}>
          记得，点击BGM按钮，让史诗级的冒险音乐为你的探险之旅添上一抹神秘色彩！
        </h4>
      ),
      target: "#audioPlay",
    },
    {
      content: (
        <>
          <h4>⭐️ 隐藏玩法 ⭐️</h4>
          <br />
          <p
            style={{
              fontSize: "14px",
              whiteSpace: "pre-wrap",
              textAlign: "left",
            }}
          >
            {`玩家抵达终点之后开启无尽 diy 模式！！玩家此时可以随意点击☝️或者拖动～任意数量的地图单元达到清除或添加墙壁的神奇效果✨。\n\n如果你意识到此时搭配玩家具备的特定技能，相信你就可以很快掌握玩家技能的终极奥秘。千万不要忘记，入口和出口也是可以拖动的奥。`}
          </p>
          <img
            style={{
              width: "50%",
              height: "auto", // 确保高度自适应
              aspectRatio: "1 / 1",
              objectFit: "cover", // 防止图片变形
            }}
            src={diyGif}
            alt=""
          />
        </>
      ),
      locale: { skip: <strong aria-label="skip">SKIP</strong> },
      placement: "center",
      target: "body",
    },
  ];

  return (
    <>
      <div className="hidden">
        <Joyride
          callback={handleJoyrideCallback}
          continuous
          hideCloseButton
          run={inProgress}
          showProgress
          showSkipButton
          steps={tourSteps}
          styles={{
            options: {
              zIndex: 100,
              width: "400px",
              primaryColor: "#b4c8f0",
              backgroundColor: "#fff",
              textColor: "#333",
              arrowColor: "#fff",
            },
          }}
        />
      </div>
      <div className={classes.tourWrapper}>
        <button
          className={`${classes.tour} ${!inProgress ? classes.tourPulse : ""}`}
          onClick={handleClickStart}
          disabled={inProgress}
        >
          游戏指南
        </button>
      </div>
    </>
  );
}

export default AppTour;
