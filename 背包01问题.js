/**
 * 问题描述：现有n件物品和一个容量为c的背包。第i件物品的重量是重量为w[i]，价值是v[i]。已知对于一件物品必须选择取（用1表示）或者不取（用0表示），且每件物品只能被取一次（这就是“0-1”的含义）。求放置哪些物品进背包，可使这些物品的重量总和不超过背包容量，且价值总和最大。
 * 问题具现化：假设编号分别为a,b,c,d,e的五件物品，重量分别是2,2,6,5,4，价值分别是6,3,5,4,6，现在有一个承重为10的背包，如何装入物品具有最大价值？
 * 求F[i,j]的最大值
 */

function packageMaxValue(weight, value, size) {
  let maxtrix = []
  for (let i = 0; i < size; i++) { // 列出0-size重量合情况
    maxtrix[i] = [] // 将maxtrix初始化为二维数组
    for (let j = 0; j < weight.length; j++) { // 遍历每件物品
      if (i === 0) { // 背包容量为0
        maxtrix[i][j] = 0
        continue
      }
      if (i < weight[j]) { // 物品重量比背包容量大，值取上一次比对的值
        maxtrix[i][j] = maxtrix[i][j - 1] || 0
        continue
      }
      // 对每一项考虑带与不带 i为重量 j为物品
      // 不带：F[i,j-1] 从剩下的物品中找出最大值
      // 带：F[i-w[j],j-1] + value[j] 去掉所带物品的价值，求剩下物品的最大值
      // 求带与不带的最大值
      // 物品数量递增 从下到上 从左到右
      maxtrix[i][j] = Math.max((maxtrix[i - weight[j]][j - 1] || 0) + value[j], maxtrix[i][j - 1] || 0)
    }
  }
  return maxtrix
}

let weight = [4, 5, 6, 2, 2]
let value = [6, 4, 5, 3, 6]

console.log(packageMaxValue(weight, value, 10))