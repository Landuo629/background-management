<template>
  <header>
    <sl-from v-model="queryForm" :option="option" />
  </header>
</template>

<script>
import minix from "@/utils/minix";
import slFrom from "./modules/sl-from.vue";
export default {
  name: "NewList",
  components: {
    slFrom,
  },
  mixins: [minix],
  data() {
    return {
      queryForm: {
        input: "",
        select: "",
        datePicker: [],
      },
      option: [
        {
          label: "输入框",
          prop: "input",
          component: "input",
          attrs: {
            type: "number",
            clearable: true,
            disabled: false,
            placeholder: "请输入数据呀",
          },
        },
        {
          label: "下拉框",
          prop: "select",
          component: "select",
          attrs: {},
          optionList: [
            {
              value: "选项1",
              label: "黄金糕",
            },
            {
              value: "选项2",
              label: "双皮奶",
            },
            {
              value: "选项3",
              label: "蚵仔煎",
            },
            {
              value: "选项4",
              label: "龙须面",
            },
            {
              value: "选项5",
              label: "北京烤鸭",
            },
          ],
        },
        {
          label: "日期选择框",
          prop: "datePicker",
          component: "date-picker",
          attrs: {
            clearable: true,
            type: "daterange",
          },
        },
      ],
    };
  },
};
</script>
