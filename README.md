
# taro-parabola

基于Taro3、React的H5和微信小程序添加到购物车抛物线动画组件


![](https://ihopefulchina.github.io/post-images/1656646769406.gif)


# 安装
```bash
npm install taro-parabola
````

# 导入组件

```js
import Parabola from 'taro-parabola'
```
init
# 参数说明

| 参数             | 描述                                                         | 类型                               | 必传 | 默认值 |
| ---------------- | ------------------------------------------------------------ | ---------------------------------- | ---- | ------ |
| `cardX`          | 购物车 所在坐标的x值                                          | number                        | 是   | `screenWidth`   |
| `columns`        | 购物车 所在坐标的y值                                          | number                         | 是   | `screenHeight - 60`   |
| `onChange`       | 点击回调方法                                                 | Function                        | 否   | `() => void`  |
| `parabolaStyle`   | 抛物线样式                                                  | React.CSSProperties                             | 否   |        |

# 使用

```jsx
import { FC, memo, useEffect, useState } from 'react'
import Parabola from 'taro-parabola'
import Taro from '@tarojs/taro'

import { View } from '@tarojs/components'

const Component: FC = () => {
  const list = [1, 2, 3, 4, 5]

  const [cardInfo, setCardInfo] = useState({} as any)

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select(`#card`)
        .boundingClientRect(info => {
          setCardInfo(info)
        })
        .exec()
    })
  }, [])

  return (
    <>
      {list.map(item => (
        <Parabola
          cardX={cardInfo.left}
          cardY={cardInfo.top}
          parabolaStyle={{ width: '15px', height: '15px', backgroundColor: '#333' }}
          onChange={() => {}}
          key={item}
        >
          {item}
        </Parabola>
      ))}
      <View id="card">我是购物车</View>
    </>
  )
}

const Mall = memo(Component)
export default Mall


```
