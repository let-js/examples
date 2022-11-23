import { Production } from '@/domain/production/Production'
export type ProductionListType = {
  category?: string
  // 这里的title给展示用
  title?: string
  productions: Array<Production>
}

export type ProductionDescType = {
  type: string
  content: string
}

export type ColorsListType = {
  no: number
  name: string
  text: string
  code: string
}
