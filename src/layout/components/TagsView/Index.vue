<template>
  <section class="tagr">
    <div class="tagr-left">
      <div class="left-left">
        <svg-icon class="tagr-icon" icon-class="svg-tagr-leftArrow" />
        <div class="line"><span></span></div>
        <svg-icon
          class="tagr-icon refresh-icon"
          icon-class="svg-tagr-refresh"
          @click="refreshSelectedTag(route)"
        ></svg-icon>
      </div>
      <div
        v-if="isShowTagScroll"
        :class="offLeftTy === 1 ? 'disabled' : ''"
        class="left-right"
      >
        <svg-icon
          class="tagr-icon-arrow"
          icon-class="svg-tagr-left"
          @click="onScroll('left')"
        />
      </div>
    </div>
    <div
      ref="midBox"
      class="tagr-midder"
      :style="{ marginLeft: isShowTagScroll ? '88px' : '68px' }"
      @scroll="scrollObesrver"
    >
      <div ref="tagrView" class="tagr-scroll">
        <router-link
          v-for="tag in visitedViews"
          ref="tagLists"
          :key="tag.path"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          class="tags-view-item"
        >
          <div
            class="ant-tabs-tab"
            :class="isActive(tag) ? 'ant-tabs-tab-active' : ''"
          >
            <div class="ant-tabs-tab-unclosable">
              <svg-icon
                class="tagr-view-icon"
                icon-class="svg-tagr-basic"
              ></svg-icon>
              <span class="tabTitle___3lACA ant-dropdown-trigger">
                {{ tag.title }}
              </span>
              <svg-icon
                v-if="tag.path !== '/workspace'"
                class="tagr-view-icon-close"
                icon-class="svg-tagr-close"
                :style="{ display: isActive(tag) ? 'inline-block' : 'none' }"
                @click.prevent.stop="closeSelectedTag(tag)"
              />
            </div>
          </div>
        </router-link>
        <!-- 详情 -->
        <router-link
          v-for="tag in kCahrtViews"
          ref="tagLists"
          :key="tag.path"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
          class="tags-view-item"
        >
          <div
            class="ant-tabs-tab"
            :class="isActiveKchart(tag) ? 'ant-tabs-tab-active' : ''"
          >
            <div class="ant-tabs-tab-unclosable">
              <svg-icon
                class="tagr-view-icon"
                icon-class="svg-tagr-stock"
              ></svg-icon>
              <el-tooltip
                v-if="tag.title.length > 8"
                effect="dark"
                :content="tag.title"
                placement="bottom"
              >
                <span class="tabTitle___3lACA ant-dropdown-trigger chart_view">
                  {{ tag.title }}
                </span>
              </el-tooltip>
              <span v-else class="tabTitle___3lACA ant-dropdown-trigger">
                {{ tag.title }}
              </span>
              <svg-icon
                class="tagr-view-icon-close"
                icon-class="svg-tagr-close"
                :style="{
                  display: isActiveKchart(tag) ? 'inline-block' : 'none',
                }"
                @click.prevent.stop="closeSelectedTag(tag)"
              />
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div
      v-if="isShowTagScroll"
      :class="offLeftTy === 2 ? 'disabled' : ''"
      class="tagr-right"
    >
      <svg-icon
        class="tagr-icon-arrow"
        icon-class="svg-tagr-right"
        @click="onScroll('right')"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import store from '@/store'
import {
  watch,
  nextTick,
  computed,
  reactive,
  onMounted,
  onUnmounted,
  ref,
} from 'vue'
import { RouteLocationNormalized, useRoute, useRouter } from 'vue-router'
// import { closeTagType } from '@/typings/layout/sidebar'

import { deepClone } from '@/utils/public'
import {
  SliberT,
  doneType,
  scrollStatus,
} from '@/layout/components/TagsView/const'
import { getMarketSnapshotDetail } from '@/api/market/quotation'
// import path from 'path'
// const visible = ref<boolean>()
const affixTags = reactive({
  list: [],
})
const midBox = ref<HTMLElement>(null)
const tagrView = ref<HTMLElement>(null)
const tagLists = ref(null)
const offLeftTy = ref<number>(4)
const tagViewOffSet = ref<number>(0) //滚动条偏移量
const clientParams = ref<IntersectionObserver>()

// 路由
const route = useRoute()
const router = useRouter()
const visitedViews = computed(() => store.state.tagr.visitedViews)
const routes = computed(() => store.state.permisstion.routes)
const kCahrtViews = computed(() => store.state.tagr.kChartView)
const tradingViews = computed(() => store.state.tagr.tradingView)
const isShowTagScroll = ref<boolean>(false)

const isActive = (value) => {
  return value.path === route.path
}
const isActiveKchart = (routeInfo) => {
  return (
    routeInfo.params.code === route.params.code && route.name === 'quotedPrice'
  )
}

/**
 * 初始化标签
 */
const intiTags = () => {
  affixTags.list = filterAffixTags(routes)
  for (const tag of affixTags.list) {
    tag.name && store.dispatch('tagr/addVisitedView', tag)
  }
}

onMounted(() => {
  intiTags()
  addTagrView()
  scrollObesrver()
})

/**
 * 监听可视是否在可视范围
 * @param type
 * @param typeMethods
 */
const clientType = (type, typeMethods: string) => {
  clientParams.value = new IntersectionObserver((nodes) => {
    const tag = nodes[0]
    if (typeMethods !== 'add') {
      tag.isIntersecting ? onScroll('sTo', 'last') : onScroll('sTo')
      return
    }
    onScroll('sTo')
  })
  clientParams.value && clientParams.value.observe(type)
}

/**
 * 关闭标签
 */
const closeSelectedTag = (val) => {
  console.log('关闭标签', val)

  if (val && val.name === 'tradingCreate' && isActive(val)) {
    // const obj: closeTagType = {
    //   fullPath: val.fullPath,
    //   name: val.name,
    //   path: val.path,
    //   title: val.title,
    //   time: new Date().getTime(),
    //   closeFlag: true,
    // }
    // if (val.path && val.name) {
    //   store.commit('strategy/CHANGE_TAGVIEW_ClOSE', obj, { root: true })
    // }
    return
  } else {
    if (val.name === 'quotedPrice') {
      store.dispatch('tagr/delView', val).then(({ kChartView }) => {
        if (isActiveKchart(val)) {
          toLastView(kChartView, val)
        }
      })
    } else if (val.name === 'tradingDetail') {
      // store.dispatch('tagr/delView', val).then(({ tradingView }) => {
      // if (isTradingActive(val)) {
      //   toLastView(tradingView, val)
      // }
      // })
    } else {
      store.dispatch('tagr/delView', val).then(({ visitedViews }) => {
        if (isActive(val)) {
          toLastView(visitedViews, val)
        }
      })
    }
  }
}

const toLastView = (visitedViewsInfo, view) => {
  let latestView
  if (view.name === 'quotedPrice' && visitedViewsInfo.length === 0) {
    console.log('visitedViews.value', visitedViews)

    if (tradingViews.value.length > 0)
      latestView = tradingViews.value.slice(-1)[0]
    else latestView = visitedViews.value.slice(-1)[0]
  } else if (view.name === 'tradingDetail' && visitedViewsInfo.length === 0) {
    if (kCahrtViews.value.length > 0)
      latestView = kCahrtViews.value.slice(-1)[0]
    else latestView = visitedViews.value.slice(-1)[0]
  } else {
    latestView = visitedViews.value.slice(-1)[0]
  }
  console.log('latestView', latestView)

  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    if (view.name === 'Dashboard') {
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

/**
 * 初始加载导航页签显示
 */
const filterAffixTags = (routeIlst, basePath = '/') => {
  const oldRouteList = routeIlst.value
  let tags = []
  oldRouteList &&
    oldRouteList.forEach((route) => {
      if (route.meta && route.meta.title === '工作看板') {
        const tagPath = basePath + route.path
        console.log(tagPath)
        tags.push({
          fullPath: '/workspace',
          path: '/workspace',
          name: '工作看板',
          meta: { ...route.meta },
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, route.path)
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags]
        }
      }
    })

  return tags
}

/**
 * 新增页签
 */
const addTagrView = () => {
  const { name } = route
  console.log('name信息', name, route)
  const currentKChartList = deepClone(store.state.tagr.kCahrtView)
  console.log(currentKChartList)

  let crtIdx = -1
  if (currentKChartList && currentKChartList.length) {
    crtIdx = currentKChartList.findIndex((v) => {
      return v.params.code === store.state.tagr.lastCode
    })
  }
  console.log('找到idx', crtIdx)

  if (!name) return
  if (name === SliberT['股票详情']) {
    getMarketSnapshotDetail([route.params.code as string], false).then(
      (res) => {
        const { data } = res
        if (res.code === 200) {
          store.commit('tagr/GET_NAME', data[0][2])
          if (
            currentKChartList &&
            currentKChartList.some((v) => v.params.code === route.params.code)
          ) {
            moveToCurrentTag('there')
            return
          }
          store.dispatch('tagr/addView', route).then(() => {
            if (crtIdx < 0) moveToCurrentTag('add')
            else moveToCurrentTag('there')
          })
        }
      }
    )
  } else if (name === SliberT['TRADINGDETAIL']) {
    // console.log('1')
  } else {
    store.dispatch('tagr/addView', route).then(() => {
      moveToCurrentTag()
    })
  }
}
/**
 * 移动至当前标签
 */
const moveToCurrentTag = (typeMethods?: string) => {
  const tags = tagLists.value
  nextTick(() => {
    let clientPa = null
    for (const tag of tags) {
      if (tag.to.path === route.path) {
        if (route.path === '/quotedPrice') {
          const cIndex = tags.value.findIndex((v) =>
            v.to.query ? v.to.query.code === route.query.code : ''
          )
          if (cIndex >= 0) {
            tagViewOffSet.value = tags[cIndex].$el.offsetLeft
            clientPa = tags[cIndex].$el
          } else {
            tagViewOffSet.value = tags[tags.value.length - 1].$el.offsetLeft
            clientPa = tags[tags.value.length - 1].$el
          }
        } else {
          tagViewOffSet.value = tag.$el.offsetLeft
          clientPa = tag.$el
        }
        if (tag.to.fullPath !== route.fullPath) {
          store.dispatch('tagr/updateVisitedView', route)
        }
        break
      }
    }
    if (clientParams.value) clientParams.value.disconnect()
    clientType(clientPa, typeMethods)
  })
}
// 监听route,
watch(
  route,
  () => {
    addTagrView()
    if (route?.path === '/F10' && !route?.query?.stockCode) {
      store.dispatch('tagr/delView', route)
      router.push({ path: '/workspace' })
    }
  },
  {
    deep: true,
  }
)

// 刷新页面
const refreshSelectedTag = (val: RouteLocationNormalized) => {
  store.commit('tagr/CHANGE_SHOW_STATUS', false)
  store.dispatch('tagr/delCachedView', val).then(() => {
    const { fullPath } = val
    nextTick(() => {
      router.replace({
        path: fullPath,
        force: true,
      })
      store.dispatch('tagr/refreshCom', true)
    })
  })
}
/**
 * 滑动
 */
const onScroll = (done: string, type?: string) => {
  const scrollLeft = midBox.value?.scrollLeft ?? 0
  if (done === doneType['左点击']) {
    midBox.value.scrollTo({ left: scrollLeft - 200, behavior: 'smooth' })
  } else if (done === doneType['右点击']) {
    midBox.value.scrollTo({ left: scrollLeft + 200, behavior: 'smooth' })
  } else {
    if (type === 'last') {
      midBox.value.scrollTo({ behavior: 'smooth' })
    } else {
      midBox.value.scrollTo({ left: tagViewOffSet.value, behavior: 'smooth' })
    }
  }
}

/**
 * 观察是否在可视区
 */
const scrollObesrver = () => {
  const viewWidth = tagrView.value.offsetWidth
  const midBoxWidth = midBox.value.offsetWidth
  const scrollLeft = midBox.value.scrollLeft

  if (midBoxWidth >= viewWidth) {
    isShowTagScroll.value = false
    offLeftTy.value = scrollStatus['不显示']
  } else if (scrollLeft === 0) offLeftTy.value = scrollStatus['禁用左滑']
  else if (viewWidth === midBoxWidth + scrollLeft)
    offLeftTy.value = scrollStatus['禁用右滑']
  else {
    isShowTagScroll.value = true
    offLeftTy.value = scrollStatus['中间状态']
  }
}

/**
 * 销毁
 */
onUnmounted(() => {
  clientParams.value && clientParams.value.disconnect()
})
</script>

<style scoped lang="scss">
.tagr {
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 34px;

  // border-bottom-style: solid;
  // border-bottom-width: 1px;
  @include backgroundColor('tags_svg_bg');

  // @include borderColor('tags_b_bt_c');
  // @include borderColor('l_lb_s_v');

  .tagr-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 14px;
    vertical-align: middle;
    cursor: pointer;
    @include textColor('fc_h_v');
  }

  .refresh-icon {
    @include textColor('tags_svg_s');
  }

  .tagr-icon-arrow {
    width: 16px;
    height: 16px;
    font-size: 14px;
    cursor: pointer;
    @include textColor('tags_svg_s');
  }

  &-left {
    position: absolute;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-items: center;
    height: 33px !important;
    height: 100%;

    // border-bottom: 1px solid;
    // @include borderColor('l_lb_s_v');
    // @include borderColor('tags_b_bt_c');
    @include backgroundColor('bg_t_v');

    .left-left {
      flex: 1;
      width: 65px;
      padding-top: 5px;
      line-height: 1;
      text-align: center;
    }

    .line {
      position: relative;
      display: inline-block;
      width: 9px;
      text-align: center;
      vertical-align: middle;

      span {
        position: absolute;
        top: 50%;
        left: 4px;
        display: inline-block;
        width: 1px;
        height: 10px;
        margin-top: -50%;
        @include backgroundColor('tags_svg_l');
      }
    }

    .left-right {
      box-sizing: border-box;
      width: 20px;
      height: 100%;
      padding-top: 5px;
      padding-right: 4px;
      line-height: 28px;
      text-align: right;
      box-shadow: 5px 0 10px -4px rgb(124 138 160 / 50%);
    }
  }

  &-midder {
    flex: 1;
    padding-top: 5px;
    overflow-x: auto;
    overflow-y: hidden;
    @include noscroll;

    .tags-view-item {
      &:hover {
        .tagr-view-icon-close {
          display: inline-block !important;
        }
      }
    }

    .tagr-scroll {
      display: inline-block;
      height: 100%;
      font-size: 12px;
      white-space: nowrap;

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 4;
        width: 100%;
        height: 1px;
        content: ' ';
        transform: scale(1, 0.5);
        @include backgroundColor('l_lb_s_v');
      }

      .ant-tabs-tab {
        position: relative;
        display: inline-block;
        height: 28px;
        padding: 0 8px;
        margin: 0 4px;
        line-height: 26px;
        cursor: pointer;
        @include backgroundColor('tags_svg_item_bg');

        border-style: solid;
        border-width: 1px;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        @include backgroundColor('bg_t_v');
        @include borderColor('tags_svg_b_c');

        &:first-child {
          margin-left: 6px;
        }

        &::before {
          position: absolute;
          top: 2px;
          left: -7px;
          z-index: 2;
          width: 0;
          line-height: 27px;
          content: '';
          border-top: 25px solid transparent;
          border-right-style: solid;
          border-right-width: 6px;
          @include borderRightColor('tags_svg_b_c');
        }

        &::after {
          position: absolute;
          top: 2px;
          right: -7px;
          z-index: 0;
          content: '';
          border-top: 25px solid transparent;
          border-left-style: solid;
          border-left-width: 6px;
          @include borderLeftColor('tags_svg_b_c');
        }

        .ant-tabs-tab-unclosable {
          position: relative;
          display: flex;
          align-items: center;
          border-right: none !important;
          border-left: none !important;
          border-radius: 0 !important;

          &::before {
            position: absolute;
            top: 2px;
            left: -14px;
            z-index: 3;
            width: 0;
            line-height: 27px;
            content: '';
            border-top: 25px solid transparent !important;
            border-right-style: solid;
            border-right-width: 6px;
            @include borderRightColor('tags_svg_bg');
          }

          &::after {
            position: absolute;
            top: 2px;
            right: -14px;
            z-index: 2;
            content: '';
            border-top: 25px solid transparent !important;
            border-left-style: solid;
            border-left-width: 6px;
            @include borderLeftColor('tags_svg_bg');
          }

          .tagr-view-icon {
            width: 14px;
            height: 14px;
            margin-right: 2px;

            @include textColor('tags_svg_svg_bg');
          }

          .tagr-view-icon-close {
            width: 16px;
            height: 16px;
            margin-left: 4px;
            @include textColor('tags_svg_svg_close');
          }

          span {
            font-size: 12px;
            @include textColor('fc_c_v');
          }
        }
      }

      .ant-tabs-tab-active {
        position: relative;
        z-index: 99;
        height: 29px;
        font-weight: 600;
        border-bottom: none;
        @include textColor('fc_h_v');
        @include backgroundColor('bg_o_v');

        .ant-tabs-tab-unclosable {
          .tagr-view-icon {
            @include textColor('fc_h_v');
          }

          span {
            font-size: 12px;
            @include textColor('fc_h_v');
          }

          &::before {
            @include borderRightColor('bg_o_v');

            border-top: 26px solid transparent !important;
          }

          &::after {
            @include borderLeftColor('bg_o_v');

            border-top: 26px solid transparent !important;
          }
        }
      }
    }
  }

  &-right {
    position: absolute;
    right: 0;
    z-index: 999;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-items: center;
    width: 26px;
    height: 33px;
    padding-top: 5px;
    padding-left: 4px;
    box-shadow: -5px 0 10px -4px rgb(124 138 160 / 50%);
    @include backgroundColor('bg_t_v');
  }

  .disabled {
    svg {
      color: #3b3c4d !important;
      cursor: not-allowed;
    }
  }

  .chart_view {
    max-width: 108px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
