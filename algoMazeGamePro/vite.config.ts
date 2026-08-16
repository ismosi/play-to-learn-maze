import { defineConfig } from "vite";
// 使用 SWC (Super-fast Compiler) 来替代 Babel 进行快速编译。
import react from "@vitejs/plugin-react-swc";
// 用于处理和转换文件路径。
import path from "path";

export default defineConfig({
  // 项目的根路径
  base: "/algoMazeGamePro/",
  plugins: [react()],
  resolve: {
    alias: {
      // 创建别名（alias），在导入模块时可以使用简短的路径。
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
