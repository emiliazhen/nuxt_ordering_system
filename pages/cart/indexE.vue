<template>
  <div class="container">
    <div class="main">
      <div class="chooseBar tl">
        <el-select v-model="compnyChoose" placeholder="请选择" size="mini">
          <el-option
            v-for="item in compnyList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-radio-group v-model="cateChoose" size="mini" @change="changeCate">
          <el-radio-button label="0">素金</el-radio-button>
          <el-radio-button label="1">镶嵌</el-radio-button>
          <el-radio-button label="2">K金</el-radio-button>
          <el-radio-button label="3">其他</el-radio-button>
        </el-radio-group>
      </div>
      <div id="subOutputRank-print" class="wrapper">
        <no-ssr>
          <HotTable :root="root" :settings="hotSettings" ref="Htable"></HotTable>
        </no-ssr>
      </div>
      <div class="bottomBtn tl">
        <el-button type="primary" round @click="goOrder">立即下单</el-button>
        <el-button round @click="printPage">打印</el-button>
        <!-- <el-button round @click="exportExcel">导出</el-button> -->
        <el-button round @click="downExc">导出</el-button>
        <el-button @click="showData">显示数据</el-button>
        (已选择2种不同规格商品，共100件，共1000.0克)
      </div>
    </div>
  </div>
</template>

<script>
// import HotTable from '@handsontable/vue'
let HotTable = null
let Handsontable = null
if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  HotTable = require('@handsontable/vue')
  Handsontable =require('handsontable')
}
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { Message, MessageBox } from 'element-ui'
import mtExcelutl from '~/utils/celTools'
// excel-rendersConfig
const controlRender = function (instance, td, row, col, prop, value, cellProperties) {
  var escaped = Handsontable.helper.stringify(value), addUpBtn,addDownBtn, detBtn, copyBtn
  addUpBtn = document.createElement('span')
  addUpBtn.className = 'icon-inset-row-f'
  addUpBtn.title = '向上插入'
  addDownBtn = document.createElement('span')
  addDownBtn.className = 'icon-inset-row-b'
  addDownBtn.title = '向下插入'
  detBtn = document.createElement('span')
  detBtn.className = 'icon-delete-row'
  detBtn.title = '删除此行'
  copyBtn = document.createElement('span')
  copyBtn.className = 'icon-copy'
  copyBtn.title = '复制此行'
  Handsontable.dom.addEvent(addUpBtn,'click',function (e) {
    // prevent selection quirk
    e.preventDefault()
    MessageBox.prompt('请输入行数', '向上插入空白行', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[1-9]\d*$/,
      inputErrorMessage: '输入数据格式不正确'
    }).then(({ value }) => {
      instance.alter('insert_row', row, value)
    }).catch(() => {
      Message('取消插入数据')
    })
  })
  Handsontable.dom.addEvent(addDownBtn,'click',function (e) {
    // prevent selection quirk
    e.preventDefault()
    MessageBox.prompt('请输入行数', '向下插入空白行', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[1-9]\d*$/,
      inputErrorMessage: '输入数据格式不正确'
    }).then(({ value }) => {
      instance.alter('insert_row', row + 1, value)
    }).catch(() => {
      Message('取消插入数据')
    })
  })
  Handsontable.dom.addEvent(detBtn,'click',function (e) {
    // prevent selection quirk
    e.preventDefault()
    MessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      instance.alter('remove_row', row)
    }).catch(() => {
      Message('取消删除数据')
    })
  })
  Handsontable.dom.addEvent(copyBtn,'click',function (e) {
    // prevent selection quirk
    e.preventDefault()
    // TODO: ,,,
    // console.log(instance.getDataAtRow(row))
    let tempData = instance.getDataAtRow(row)
    let copyRowData = {}
    copyRowData.imgUrl = tempData[2]
    copyRowData.name = tempData[3]
    console.log(JSON.stringify(copyRowData))
    instance.alter('insert_row', row + 1, 1, JSON.stringify(copyRowData))
  })
  Handsontable.dom.empty(td)
  td.appendChild(addUpBtn)
  td.appendChild(addDownBtn)
  td.appendChild(detBtn)
  td.appendChild(copyBtn)
  td.className = 'htControl htMiddle htCenter'
  return td
}
const imgRander = function (instance, td, row, col, prop, value, cellProperties) {
  var escaped = Handsontable.helper.stringify(value), img, link
  if (!escaped) {
    link = document.createElement('a')
    link.innerText = '上传'
    Handsontable.dom.addEvent(link, 'mousedown', function (e) {
      // prevent selection quirk
      e.preventDefault()
    })
    // TODO: ...
    Handsontable.dom.empty(td)
    td.appendChild(link)
    return td
  }
  if (escaped.indexOf('http') === 0) {
    img = document.createElement('IMG')
    img.src = value
    img.style.height = '50px'
    Handsontable.dom.addEvent(img, 'mousedown', function (e) {
      // prevent selection quirk
      e.preventDefault()
    })
    Handsontable.dom.empty(td)
    td.appendChild(img)
    return td
  }
  else {
    Handsontable.renderers.TextRenderer.apply(this, arguments)
  }
}
const maxWeightRander = function (instance, td, row, column, prop, value, cellProperties){
  let minWeight = Math.floor(instance.getDataAtRowProp(row, 'minWeight') * 1000) / 1000
  if(minWeight > value) {
    value = minWeight
    instance.setDataAtRowProp(row,'maxWeight',value,instance.getDataAtRow(row))
    Handsontable.renderers.NumericRenderer.apply(this, arguments)
  }else{
    Handsontable.renderers.TextRenderer.apply(this, arguments)
  }
}
const countRander = function (instance, td, row, column, prop, value, cellProperties){
  var escaped = Handsontable.helper.stringify(value)
  td.className = 'htMiddle htCenter'
  if (escaped) {
    if(/^\d+(\.\d+)?$/.test(escaped)) {
      value = Math.floor(escaped)
      td.innerText = value
      return td
      // instance.setDataAtRowProp(row,'count',value,instance.getDataAtRow(row))
    } else {
      td.innerText = null
    }
    return td
  }
  else {
    Handsontable.renderers.TextRenderer.apply(this, arguments)
  }
}
const pevWeightRander = function (instance, td, row, column, prop, value, cellProperties) {
  let minWeight = Math.floor(instance.getDataAtRowProp(row, 'minWeight') * 1000) / 1000
  let maxWeight = Math.floor(instance.getDataAtRowProp(row, 'maxWeight') * 1000) / 1000
  if(minWeight && maxWeight) {
    value = (minWeight + maxWeight) / 2
    td.innerText = value
    td.className = 'htMiddle htCenter'
    td.style.color = '#555'
    return td
  } else {
    Handsontable.renderers.NumericRenderer.apply(this, arguments)
  }
}
const totalWeightRander = function (instance, td, row, column, prop, value, cellProperties) {
  let minWeight = Math.floor(instance.getDataAtRowProp(row, 'minWeight') * 1000) / 1000
  let maxWeight = Math.floor(instance.getDataAtRowProp(row, 'maxWeight') * 1000) / 1000
  let count = Math.floor(instance.getDataAtRowProp(row, 'count'))
  if(minWeight && count && maxWeight) {
    value = (minWeight + maxWeight) / 2 * count
    td.innerText = Number(value.toString().match(/^\d+(?:\.\d{0,3})?/))
    td.className = 'htMiddle htCenter'
    td.style.color = '#555'
    return td
  } else {
    Handsontable.renderers.NumericRenderer.apply(this, arguments)
  }
}
const filterVal = {
  // <=====值转化
  'pwd': function (value) {
    return '假装 被加密了'
  },
  'sex': function (key) {
    key = { '男': 0, '女': 1, '': 0, undefined: 0 }[key]
    return key ? key : 0
  }
}
export default {
  data: function () {
    return {
      root: 'test-hot',
      hotSettings: {
        data: [
          // 数据
        ],
        startRows: 1,
        // 行列范围
        startCols: 1,
        minRows: 10,
        // 最小行列
        minCols: 15,
        maxRows: 500,
        // 最大行列
        maxCols: 15,
        rowHeaders: true,
        // 行表头
        colWidths: [20,65,60,100,48,50,90,45,45,45,45,45,120],
        minSpareCols: 0,
        // 列留白
        minSpareRows: 1,
        // 行留白
        currentRowClassName: 'currentRow',
        // 为选中行添加类名，可以更改样式
        currentColClassName: 'currentCol',
        // 为选中列添加类名
        autoWrapRow: true,
        // 自动换行
        contextMenu: {
          // 自定义右键菜单，可汉化，默认布尔值
          items: {
            'row_above': {
              name: '上方插入一行'
            },
            'row_below': {
              name: '下方插入一行'
            },
            'col_left': {
              name: '左方插入列'
            },
            'col_right': {
              name: '右方插入列'
            },
            'hsep1': '---------',
            // 提供分隔线
            'remove_row': {
              name: '删除行'
            },
            'remove_col': {
              name: '删除列'
            },
            'make_read_only': {
              name: '只读'
            },
            'borders': {
              name: '表格线'
            },
            'commentsAddEdit': {
              name: '添加备注'
            },
            'commentsRemove': {
              name: '取消备注'
            },
            'freeze_column': {
              name: '固定列'
            },
            'unfreeze_column': {
              name: '取消列固定'
            },
            'hsep2': '---------'
          }
        },
        // 右键效果
        fillHandle: true,
        // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        fixedColumnsLeft: 0,
        // 固定左边列数
        fixedRowsTop: 0,
        // 固定上边列数
        //  mergeCells: [   
        // 合并
        //    {row: 1, col: 1, rowspan: 3, colspan: 3}, 
        //    指定合并，从（1,1）开始行3列3合并成一格
        //    {row: 3, col: 4, rowspan: 2, colspan: 2}
        //  ],
        columns: [
          // 添加每一列的数据类型和一些配置
          {
            data: 'choose',
            type: 'checkbox',
            className: 'htMiddle htCenter'
          },
          {
            title: '操作',
            data: 'cId',
            readOnly: true,
            renderer: controlRender
          },
          {
            data: 'imgUrl',
            title: '图片',
            readOnly: true,
            renderer: imgRander
          },
          {
            data: 'name',
            title: '名称',
            type: 'text',
            className: 'htMiddle htCenter'
          },
          {
            data: 'cId',
            title: '供应商款号',
            type: 'numeric',
            className: 'htMiddle htCenter'
          },
          //  {
          //   data: 'color',
          //   type: 'autocomplete',
          //   title: '成色',
          //   strict: true,
          //   allowInvalid: true,
          //   source: ['白色','黑色','灰色','蓝色','紫色']
          // },
          {
            data: 'color',
            type: 'dropdown',
            title: '成色',
            allowInvalid: false,
            source: ['白色','黑色','灰色','蓝色','紫色'],
            className: 'htMiddle htCenter'
          },
          {
            data: 'wordIn',
            title: '字印',
            type: 'text',
            className: 'htMiddle htCenter'
          },
          {
            data: 'minWeight',
            title: '最低克重',
            type: 'text',
            className: 'htMiddle htCenter'
          },
          {
            data: 'maxWeight',
            title: '最高克重',
            type: 'numeric',
            className: 'htMiddle htCenter',
            renderer: maxWeightRander
          },
          {
            data: 'count',
            title: '数量',
            type: 'numeric',
            renderer: countRander
          },
          {
            data: 'pevWeight',
            title: '平均克重',
            type: 'numeric',
            readOnly: true,
            renderer: pevWeightRander
          },
          {
            data: 'totalWeight',
            title: '总重',
            type: 'numeric',
            readOnly: true,
            className: 'htMiddle htCenter',
            renderer: totalWeightRander
          },
          {
            data: 'descript',
            title: '规格描述',
            type: 'text',
            className: 'htMiddle htLeft'
          }
          // { type: 'numeric',
          // 指定的数据格式
          //   format: '$ 0,0.00'},  
          // {type: 'checkbox'}  //多选框
        ],
        manualColumnFreeze: true,
        // 手动固定列
        manualColumnMove: false,
        // 手动移动列
        manualRowMove: true,
        // 手动移动行
        manualColumnResize: true,
        // 手工更改列距
        manualRowResize: true,
        // 手动更改行距
        comments: true,
        // 添加注释
        cell: [
          {row: 1, col: 1, className: 'htRight htMiddle'}
        ],
        // cells: function (row, column, prop) {
        //   const cellProperties = {}
        //   const visualRowIndex = this.instance.toVisualRow(row)
        //   const visualColIndex = this.instance.toVisualColumn(column)
        //   if (visualColIndex === 10 && prop === 'pevWeight') {
        //     const value = 1
        //     this.instance.setDataAtRowProp(row,'pevWeight',value,this.instance.getDataAtRow(row))
        //   }
        //   return cellProperties
        // },
        // columnSummary: [
        //   {
        //     ranges: [
        //       [0, 4], [6], [8, 9]
        //     ],
        //     destinationRow: 2,
        //     destinationColumn: 3,
        //     reversedRowCoords: true,
        //     type: 'sum',
        //     forceNumeric: true
        //   }
        // ],
        // columnSummary: function() {
        //   var configArray = [];
        //   var summaryTypes = ['sum', 'min', 'max', 'count', 'average'];
        //   for (var i = 0; i < 5; i++) {
        //     configArray.push({
        //       sourceColumn: i,
        //       destinationRow: 0,
        //       destinationColumn: i,
        //       type: 'average',
        //       forceNumeric: true
        //     });
        //   }
        //   return configArray;
        // },
        customBorders: [],
        // 添加边框
        columnSorting: true,
        // 排序
        stretchH: 'all'
        // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
      },
      compnyList: [
        {
          value: '0',
          label: 'A公司'
        }, {
          value: '1',
          label: 'B公司'
        }, {
          value: '2',
          label: 'C公司'
        }, {
          value: '3',
          label: 'D公司'
        }, {
          value: '4',
          label: 'E公司'
        }
      ],
      compnyChoose: '0',
      cateChoose: '0',
      allData: {
        '0': [{
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 0.1,
          maxWeight: 1.0,
          count: 1,
          pevWeight: 2,
          totalWeight: 1,
          descript: 'this is ..',
          choose: true
        },{
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 0.1,
          maxWeight: 1.0,
          count: 1,
          pevWeight: 2,
          totalWeight: 1,
          descript: 'this is ..',
          choose: true
        }],
        '1': [{
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 11,
          maxWeight: 22,
          count: 100,
          pevWeight: 2,
          totalWeight: 1,
          descript: 'AAAA',
          choose: false
        }],
        '2': [{
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 11,
          maxWeight: 22,
          count: 100,
          pevWeight: 2,
          totalWeight: 1,
          descript: 'AAAA',
          choose: false
        }],
        '3': [{
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 11,
          maxWeight: 22,
          count: 100,
          pevWeight: 2,
          totalWeight: 1,
          descript: 'AAAA',
          choose: false
        }]
      }
    }
  },
  // name: 'SampleApp',
  components: {
    HotTable
  },
  beforeMount () {
    this.initTableData('0')
  },
  methods: {
    initTableData (v) {
      const data = {
        '0': {
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 0.1,
          maxWeight: 1.0,
          count: 1,
          pevWeight: 2,
          totalWeight: 1,
          descript: 'this is ..',
          choose: true
        },
        '1': {
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 141,
          maxWeight: 224,
          count: 1040,
          pevWeight: 2,
          totalWeight: 13,
          descript: 'AAAA',
          choose: false
        },
        '2': {
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx',
          minWeight: 112,
          maxWeight: 222,
          count: 100,
          pevWeight: 22,
          totalWeight: 12,
          descript: 'AAAA',
          choose: false
        },
        '3': {
          num: 1,
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534761258643&di=1315610293e25cf5a14c9263568cb493&imgtype=0&src=http%3A%2F%2Fwww.lgstatic.com%2Fthumbnail_300x300%2Fimage1%2FM00%2F3B%2F88%2FCgo8PFWwrL-AAkNOAAAmq7vfN-Q344.jpg%3Fcc%3D0.15560518018901348',
          name: 'AU999项链',
          cId: 11,
          color: '白色',
          wordIn: 'xxx45',
          minWeight: 121,
          maxWeight: 223,
          count: 100,
          pevWeight: 21,
          totalWeight: 12,
          descript: 'AAAA',
          choose: false
        }
      }
      this.hotSettings.data = data[v]
      // if (v === '1'){
      //   this.hotSettings.columns
      // }
    },
    changeCate (v) {
      this.initTableData(v)
    },
    showData () {
      var tmp = []
      this.$refs.Htable.table.getSourceData().forEach(function (value, index, array) {
        var t = new Object()
        for (var k in value) {
          // <====将xlsx数据转为实际需要的值
          t[k] = filterVal[k] ? filterVal[k](value[k]) : value[k]
        }
        tmp.push(t)
      })
      // alert(JSON.stringify(tmp))
      console.log(tmp)
      return tmp
    },
    // exportExcel () {
    //   var wb = XLSX.utils.table_to_book(document.querySelector('#test-hot'))
    //   var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
    //   try {
    //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `导出表${new Date()}.xlsx`)
    //   } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
    //   return wbout
    // },
    downExc (v) {
      // var d = mtExcelutl.Object.copyJson(this.$refs.Htable.table.getSourceData());
      // <=====读取handsontable的数据
      var d = mtExcelutl.Object.copyJson(this.allData)
      // <=====读取handsontable的数据
      console.log(d)
      if(v){
        const xHreds = [{
          '选择': 'choose',
          '图片': 'imgUrl',
          '名称': 'name',
          '供应商款号': 'cId',
          '字印': 'wordIn',
          '最低克重': 'minWeight',
          '最高克重': 'maxWeight',
          '数量': 'count',
          '平均克重': 'pevWeight',
          '总重': 'totalWeight',
          '规格描述': 'descript'
        },{
          '选择': 'choose',
          '图片': 'imgUrl',
          '名称': 'name',
          '供应商款号': 'cId',
          '字印': 'wordIn',
          '最低克重': 'minWeight',
          '最高克重': 'maxWeight',
          '数量': 'count',
          '平均克重': 'pevWeight',
          '总重': 'totalWeight',
          '规格描述': 'descript'
        },
        {
          '选择': 'choose',
          '图片': 'imgUrl',
          '名称': 'name',
          '供应商款号': 'cId',
          '字印': 'wordIn',
          '最低克重': 'minWeight',
          '最高克重': 'maxWeight',
          '数量': 'count',
          '平均克重': 'pevWeight',
          '总重': 'totalWeight',
          '规格描述': 'descript'
        },{
          '选择': 'choose',
          '图片': 'imgUrl',
          '名称': 'name',
          '供应商款号': 'cId',
          '字印': 'wordIn',
          '最低克重': 'minWeight',
          '最高克重': 'maxWeight',
          '数量': 'count',
          '平均克重': 'pevWeight',
          '总重': 'totalWeight',
          '规格描述': 'descript'
        }]
        for (let i in xHreds){
          d[i].unshift(mtExcelutl.Object.reverse(xHreds[i]))
          // <====追加到列头
        }
      }
      mtExcelutl.XLSX.onExport(d)
      // <====导出
    },
    printPage () {
      let subOutputRankPrint = document.getElementById('subOutputRank-print')
      console.log(subOutputRankPrint.innerHTML)
      let newContent =subOutputRankPrint.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      document.body.innerHTML = oldContent
      return false
    },
    goOrder () {
      this.$router.push('/order')
    }
  }
}
</script>

<style lang="scss" scoped>
.handsontable .currentRow {
  background-color: #E7E8EF;
}

.handsontable .currentCol {
  background-color: #F9F9FB;
}
#subOutputRank-print{
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  height: 600px;
}
#test-hot {
  width: 100%;
  height: 100%;
  /deep/ .htControl{
    span{
      cursor: pointer;
      font-size: 14px;
      padding: 0 3px;
      color: #555;
      &:hover{
        color: #007ed5;
        font-size: 16px;
      }
    }
  }
}
.chooseBar{
  background-color: #fff;
  line-height: 40px;
  margin:10px 0;
  padding-left: 3px;
  .el-select{
    margin-right: 10px;
  }
  /deep/ .el-radio-button__inner{
    border: none;
    border-radius: 4px;
  }
}
.bottomBtn{
  margin:10px 0;
}
</style>


