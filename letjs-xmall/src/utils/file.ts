/* 通用文件处理util */

// 通用路径替换，便于统一修改
export function replaceDevPath(path = '') {
  return path.replace('../../assets/', '/src/assets/')
}

// 从列表里随机挑选一条
export function selectRandom(list: Array<any> = []) {
  const randomNumer = Math.random() * list.length
  return list[Math.floor(randomNumer)]
}
