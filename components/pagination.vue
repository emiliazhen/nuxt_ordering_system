<template>
  <div class="pagination" v-if="total > 0">
    <div class="dropdown">
      <span>{{size}} 条/页<i></i></span>
      <ul class="dropdown-list">
        <li><a href="javascript:;" v-for="(item,index) in sizes" :key="index" @click="pgSizeChange(item)">{{item}} 条/页</a></li>
      </ul>
    </div>
    <span class="txt-count">每页{{$props.size}}条 共{{total}}条</span>
    <a href="javascript:;" @click="pgChange(1)">首页</a>
    <a href="javascript:;" @click="pg!==1?pgChange(pg - 1):''" :class="{disabled:pg==1}">上一页</a>
    <!-- <template v-if="pgCount > max && pg > max / 2 + 1">
      <a href="javascript:;" @click="pgChange(1)" :class="{active:pg == 1}">1</a>
      <span>...</span>
    </template> -->
    <!-- <template v-for="p in pages">
      <a href="javascript:;" :key="p" @click="pgChange(p)" :class="{'active':pg==p}">{{ p }}</a>
    </template> -->
    <!-- <template v-if="pgCount > max && pg < pgCount - max / 2">
      <span>...</span>
      <a href="javascript:;" @click="pgChange(pgCount)" :class="{active:pg == pgCount}">{{ pgCount }}</a>
    </template> -->
    <input type="number" class="current" min="1" :max="pgCount" @keyup="change" v-model="num" @keydown.enter="pgChange(num)">
    <span class="txt">/ {{pgCount}} </span>
    <!-- <a href="javascript:;" @click="pgChange(num)" class="go" data-type="go">GO</a> -->
    <a href="javascript:;" @click="pg!==pgCount?pgChange(pg - 0 + 1):''" :class="{disabled:pg==pgCount}">下一页</a>
    <a href="javascript:;" @click="pgChange(pgCount)">尾页</a>
  </div>
</template>

<script>
export default {
  props: ['pg', 'total', 'size'],
  data () {
    return {
      path: '',
      pgCount: 1,
      start: 1,
      end: 1,
      max: 9,
      pages: [],
      num: 1,
      sizes: [10, 20, 50, 100]
    }
  },
  methods: {
    init () {
      let vm = this
      // 计算总页数
      vm.pgCount = Math.ceil(vm.total / vm.size)
      if (vm.pg > vm.pgCount && vm.pgCount !== 0) {
        vm.pg = vm.pgCount
      }
      if (vm.pgCount <= vm.max) {
        vm.start = 1
        vm.end = vm.pgCount + 1
      } else {
        // 计算显示的页码
        if (vm.pg < vm.max / 2 + 1) {
          vm.start = 1
          vm.end = vm.max
        } else if (vm.pg > vm.pgCount - vm.max / 2) {
          vm.start = vm.pgCount - vm.max + 2
          vm.end = vm.pgCount + 1
        } else {
          vm.start = vm.pg - (vm.max - 3) / 2
          vm.end = parseInt(vm.pg) + (vm.max - 1) / 2
        }
      }
      vm.pages = []
      // 显示页码
      for (let i = vm.start; i < vm.end; i++) {
        vm.pages.push(i)
      }
      vm.num = parseInt(vm.pg) + 1 > vm.pgCount ? vm.pgCount : parseInt(vm.pg) + 1
    },
    change () {
      if (!/\d+/.test(this.num) || this.num === 0) {
        this.num = this.pg + 1
      } else if (this.num > this.pgCount) {
        this.num = this.pgCount
      }
    },
    pgChange (val) {
      if (!val) {
        val = this.pg === this.pgCount ? this.pgCount : this.pg + 1
      }
      this.$emit('PageIndexChange', val)
    },
    pgSizeChange (val) {
      this.$emit('PageSizeChange', val)
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    pg: 'init',
    size: 'init',
    total: 'init'
  }
}
</script>
