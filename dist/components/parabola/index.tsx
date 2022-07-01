// Taro 添加到购物车抛物线动画
import { memo, useMemo, useState } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

const systemInfo = Taro.getSystemInfoSync()
const { screenHeight, screenWidth } = systemInfo

interface IProps {
  /**
   * 购物车 所在坐标的x值
   * @type {number}
   */
  cardX: number
  /**
   * 购物车 所在坐标的Y值
   * @type {number}
   */
  cardY: number
  /**
   * 点击回调方法
   * @type {Function}
   */
  onChange?: () => void
  /**
   * 抛物线样式
   * @type {React.CSSProperties}
   */
  parabolaStyle?: React.CSSProperties
  /**
   * children
   * @type { React.ReactNode}
   */
  children: React.ReactNode
}
const Parabola = ({ cardX = screenWidth, cardY = screenHeight - 60, parabolaStyle, onChange, children }: IProps) => {
  const [ballX, setBallX] = useState(0)
  const [ballY, setBallY] = useState(0)
  const [showBall, setShowBall] = useState(false)
  const [animationX, setAnimationX] = useState('' as any)
  const [animationY, setAnimationY] = useState('' as any)
  const [isLoading, setIsLoading] = useState(false)
  const handleClick = event => {
    if (isLoading) {
      return
    }
    // x, y表示手指点击横纵坐标, 即小球的起始坐标
    const { x: baX, y: baY } = event.detail
    setIsLoading(true)
    createAnimation(baX, baY)
  }

  const setDelayTime = sec =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve('')
      }, sec)
    })

  // 水平动画
  const flyX = (bottomX, baX, duration = 400) => {
    const animation = Taro.createAnimation({
      duration,
      timingFunction: 'linear'
    })
    animation.translateX(bottomX - baX).step()
    return animation
  }
  // 垂直动画
  const flyY = (bottomY, baY, duration = 400) => {
    const animation = Taro.createAnimation({
      duration,
      timingFunction: 'ease-in'
    })
    animation.translateY(bottomY - baY).step()
    return animation
  }

  const createAnimation = (baX, baY) => {
    const aniX = flyX(cardX, baX) // 创建小球水平动画
    const aniY = flyY(cardY, baY) // 创建小球垂直动画
    setBallX(baX)
    setBallY(baY)
    setShowBall(true)
    setDelayTime(100)
      .then(() => {
        // 100ms延时,  确保小球已经显示
        setAnimationX(aniX.export())
        setAnimationY(aniY.export())
        // 400ms延时, 即小球的抛物线时长
        return setDelayTime(400)
      })
      .then(() => {
        setAnimationX(flyX(0, 0, 0).export())
        setAnimationY(flyY(0, 0, 0).export())
        setShowBall(false)
        setIsLoading(false)
        onChange && onChange()
      })
  }

  const style = useMemo(
    () =>
      parabolaStyle || {
        backgroundColor: '#00b9cd',
        height: '20px',
        width: '20px',
        borderRadius: '50%'
      },
    [parabolaStyle]
  )

  return (
    <>
      <View onClick={handleClick}>{children}</View>
      {showBall && (
        <View animation={animationY} style={{ position: 'fixed', top: `${ballY}px` }}>
          <View animation={animationX} style={{ ...style, position: 'fixed', left: `${ballX}px` }} />
        </View>
      )}
    </>
  )
}

export default memo(Parabola)
