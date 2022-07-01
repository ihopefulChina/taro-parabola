
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

# 参数说明

| 参数             | 描述                                                         | 类型                               | 必传 | 默认值 |
| ---------------- | ------------------------------------------------------------ | ---------------------------------- | ---- | ------ |
| `cartX`          | 购物车 所在坐标的x值                                          | number                        | 是   | `screenWidth`   |
| `cartY`        | 购物车 所在坐标的y值                                          | number                         | 是   | `screenHeight - 60`   |
| `onChange`       | 点击回调方法                                                 | Function                        | 否   | `() => void`  |
| `parabolaStyle`   | 抛物线样式                                                  | React.CSSProperties                             | 否   |        |

# 使用

```jsx
import { FC, memo, useEffect, useState } from 'react'
import Parabola from 'taro-parabola'
import Taro from '@tarojs/taro'

import { View } from '@tarojs/components'

 const list = [1, 2, 3, 4, 5]
const Component: FC = () => {
  const [cartInfo, setCartInfo] = useState({} as any)

  useEffect(() => {
    Taro.nextTick(() => {
      Taro.createSelectorQuery()
        .select(`#cart`)
        .boundingClientRect(info => {
          setCartInfo(info)
        })
        .exec()
    })
  }, [])

  return (
    <>
      {list.map(item => (
        <Parabola
          cartX={cartInfo.left}
          cartY={cartInfo.top}
          parabolaStyle={{ width: '15px', height: '15px', backgroundColor: '#333' }}
          onChange={() => {}}
          key={item}
        >
          {item}
        </Parabola>
      ))}
      <View id="cart">我是购物车</View>
    </>
  )
}

const Mall = memo(Component)
export default Mall


```
