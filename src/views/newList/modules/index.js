const obj = [
  {
    label: 'label', // 输入框的label，支持中英文
    prop: 'prop', // 查询列表的字段
    component: 'input', // elementUI 组件的名字，不带 el-
    attrs: { // elementUI 的属性
      type: 'number',
      clearable: true,
      disabled: false,
      placeholder: '请输入数据呀'
    }
  }
]
