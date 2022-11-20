export const searchAttr = {
  data: () => ({
    formAttributes: {
      labelWidth: 'auto',
      labelSuffix: '：',
      size: 'small'
    },
    tableAttributes: {
      border: true,
      size: 'small'
    },
    tableColumnAttributes: {
      'show-overflow-tooltip': false
    },
    paginationAttributes: {
      layout: 'total, sizes, prev, pager, next, jumper',
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
      style: {
        display: 'flex',
        'justify-content': 'flex-end',
        'margin-top': '10px'
      }
    }
  })
}

export const dialogOption = {
  data: () => ({
    dialogAttributes: {
      width: '500px',
      'modal-append-to-body': false,
      'custom-class': 'dialogClass'
    },
    formAttributes: {
      labelWidth: 'auto',
      labelSuffix: '',
      size: 'small'
    }
  })
}
