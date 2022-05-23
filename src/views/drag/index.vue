<template>
  <div class="drag">
    <a href="https://juejin.cn/post/6844904150350692366" style="color:blue">vuedraggable文档</a>
    <draggable
      v-model="bannerList"
      animation="1000"
    >
      <el-card v-for="(item, index) in dragList" :key="item.id" class="item">
        {{ index + 1 }}
      </el-card>
    </draggable>
    <div style="margin-top:20px">表格拖拽</div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        min-width="180"
        resizable
      />
      <el-table-column
        prop="name"
        label="姓名"
        min-width="180"
        resizable
      />
      <el-table-column
        prop="address"
        label="地址"
        min-width="180"
        resizable
      />
    </el-table>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'Drag',
  components: {
    draggable
  },
  data() {
    return {
      dragList: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card{
  width: 70%;
  height: 100px;
  margin-top: 20px;
  cursor: pointer;
}
</style>
