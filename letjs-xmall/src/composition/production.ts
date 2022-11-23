import useLogger from '@/utils/useLogger'
import { VueLogger } from 'vue-logger-plugin'
import { Production as ProductionModel } from '@/domain/production/Production'
import * as productionService from '@/services/productionService'
import { Production } from '@/domain/production/Production'
import { useProductionStore } from '@/stores/productionStore'

const logger: VueLogger = useLogger()

// 校验逻辑可以写在composition里，针对ui统一处理
export const purchaseValidationRules = {
  size: {
    validate(value: number) {
      return value > 0
    },
    warn: '',
    text: '请选择尺寸',
  },
  color: {
    validate(value: number) {
      return value !== undefined
    },
    warn: '',
    text: '请选择颜色',
  },
  purchaseQuantity: {
    validate(value: number) {
      return value > 0
    },
    warn: '',
    text: '请选择数量',
  },
}

export function purchaseValidateItem(
  production: ProductionModel,
  purchaseErrorClass: any,
  item: string,
): boolean {
  let isValid = true
  const errorClass = 'purchase-error-class'
  const ruleKey = item as keyof typeof purchaseValidationRules
  const errorKey = item as keyof typeof purchaseErrorClass
  const productionKey = item as keyof typeof production
  const value: any = production[productionKey]
  if (!purchaseValidationRules[ruleKey].validate(value)) {
    purchaseErrorClass[errorKey] = errorClass
    purchaseValidationRules[ruleKey].warn =
      purchaseValidationRules[ruleKey].text
    isValid = false
  } else {
    purchaseErrorClass[errorKey] = ''
    purchaseValidationRules[ruleKey].warn = ''
  }
  return isValid
}

export function purchaseValidateAll(
  production: ProductionModel,
  purchaseErrorClass: object,
): boolean {
  let isValid = true
  for (const item in purchaseValidationRules) {
    if (!purchaseValidateItem(production, purchaseErrorClass, item)) {
      isValid = false
    }
  }

  // if (production.purchaseQuantity <= 0) {
  // 需要专门的抛错工具类
  // throw Error('the purchase quantity can not lower than 0')
  // }
  return isValid
}

export async function submitToBuy(production: Production): Promise<{
  productionId: number
  message: string
}> {
  const result = await productionService.submitToBuy(production)
  // 更新store，便于传递到支付页
  useProductionStore().updateProduction(production)
  logger.info('submitToBuy result: ', result)
  return result
}
