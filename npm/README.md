## [tc-util](https://github.com/theajack/util) 

Building a wheel, common tools and methods

### 0. Module

1. byte
2. constant
3. cookie
4. datetime
5. dom
6. extend
7. gbk
8. is
9. lib
10. math
11. polyfill
12. storage
13. tool
14. event

### 1. Installation and use

#### 1.1 npm

```
npm i tc-util
```

Full reference

```js
import tcUtil from'tc-util';
```

On-demand introduction

```js
import tcMath from'tc-util/math';
import {formatDate} from'tc-util/datetime';
```

#### 1.2 cdn introduction

Full reference

```html
<script src="https://cdn.jsdelivr.net/npm/tc-util/tc-util.min.js"></script>
<script>
    console.log(tcUtil);
</script>
```

On-demand introduction

```html
<script src="https://cdn.jsdelivr.net/npm/tc-util/math.js"></script>
<script>
    console.log(tcMath);
</script>
```

### 2. api

#### 2.1. byte

0. stringToBytes
1. stringToGbkBytes
2. bytesToString
3. bytesToNumber

#### 2.2. constant

0. TYPE
1. UINT_TYPE
2. VERSION
3. COMPARE_RESULT

#### 2.3. cookie

0. getCookie
1. setCookie
2. removeCookie

#### 2.4. datetime

0. getDaysInMonth
1. getFirstDayWeekInMonth
2. formatTime
3. formatDate
4. timeToJson
5. dateToJson
6. timeToDate
7. dateToTime
8. nowTime
9. nowDate
10. msToSecond
11. secondToMs
12. minuteToMs
13. hourToMs

#### 2.5. dom

0. $: Please refer to [easy-dom-util](https://github.com/theajack/easy-dom)
1. registDisableContextMenu
2. disableDefaultEvent
3. onPageShowHide

#### 2.6. extend

0. String
1. Array
2. Number
3. Function
4. Object
5. Json

#### 2.7. gbk

0. encodeGBK
1. decodeGBK

#### 2.8. is

0. isUndf
1. isFunc
2. isObject
3. isJson
4. isJsonOrArray
5. isNumber
6. isNull
7. isBool
8. isString
9. isType
10. isArray
11. isPC
12. isMobile
13. isIOS
14. isAndroid
15. isWX
16. isQQ
17. isTenVideo
18. isWxMiniProgram
19. isIOSWx
20. isIPAddress
21. isInited

#### 2.9. lib

0. creatEventReady
1. createDotAnimation
2. createState
3. createStatus

#### 2.10. math

0. countDistance
1. countDistanceByDiff
2. countSumOfSquare
3. countValueByRateAndRange
4. circleToRect
5. isPointInRect
6. isPointInCircle
7. countPosDiffByStep

#### 2.11. polyfill

0. keys
1. values
2. assign

#### 2.12. storage

0. getStorage
1. setStorage
2. removeStorage

#### 2.13. tool

**tcUtil._**

0. getUrlParam
1. parseUrlParam
2. copy
3. type
4. random
5. download
6. execute
7. importScript
8. readFile
9. mapArray
10. mapJson
11. parseJSON
12. pick
13. pickAttr
14. pickTo
15. removeRedundantAttrInObject
16. getUUID
17. boolPipe
18. throttle
19. countImgSize
20. compareVersion
21. versionToArray

#### 2.14. event

Please refer to [tc-event](https://github.com/theajack/tc-event)