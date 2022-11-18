<template>
  <div>
    <sl-table :data="tableData" :column="column">
      <el-table-column fixed="right" align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </sl-table>
  </div>
</template>

<script>
import slTable from "./sl-talbe";
export default {
  name: "NewTable",
  components: { slTable },
  data() {
    return {
      tableData: [
        {
          nickName: 1,
        },
      ],
      column: [
        {
          prop: "nickName",
          label: "昵称",
          minWidth: "150",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    edit(row) {
      console.log(row);
    },
  },
};
</script>

<style lang="scss" scoped></style>
