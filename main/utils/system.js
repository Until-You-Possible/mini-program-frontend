import { promisic } from "./utils"
import { px2rpx } from "../miniprogram_npm/lin-ui/utils/util";


const getWindowSize = async () => {
  const res = await promisic(wx.getSystemInfo)();
  return {
    windowHeight : res.windowHeight,
    windowWidth  : res.windowWidth,
    screenWidth  : res.screenWidth,
    screenHeight : res.screenHeight
  }
}

const getWindowHeightRpx = async () =>  {
  const  res = await getWindowSize()
  return px2rpx(res.windowHeight)
}

export {
  getWindowSize,
  getWindowHeightRpx
}