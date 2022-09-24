import React, { useContext, useMemo } from 'react'
import ReactBaseTableInfinite from 'src/components/Tables/ReactBaseTableInfinite'
import { MemberContext } from 'src/features/Telesales/pages/TelesalesOption/index'

import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

function TelesalesOptionServices(props) {
  const { ListProds, loading } = useContext(MemberContext)

  console.log(ListProds)

  const columns = useMemo(
    () => [
      {
        key: 'index',
        title: 'STT',
        dataKey: 'index',
        cellRenderer: ({ rowIndex }) => rowIndex + 1,
        width: 60,
        sortable: false,
        align: 'center'
      },
      {
        key: 'ProdTitle',
        title: 'Tên dịch vụ',
        dataKey: 'ProdTitle',
        width: 300,
        sortable: false
      },
      {
        key: 'Total',
        title: 'Tiến trình',
        dataKey: 'Total',
        cellRenderer: ({ rowData }) => (
          <div className="progress w-100" style={{ height: '13px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${(rowData.Done / rowData.Total) * 100 || 0}%` }}
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {rowData.Done} / {rowData.Total}
            </div>
          </div>
        ),
        width: 300,
        sortable: false
      },
      {
        key: 'BH_Total',
        title: 'Buổi bảo hành',
        dataKey: 'BH_Total',
        cellRenderer: ({ rowData }) =>
          rowData.BH_Total > 0 ? (
            <div className="progress w-100" style={{ height: '13px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${(rowData.BH_Done / rowData.BH_Total) * 100 || 0}%`
                }}
                aria-valuenow={75}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {rowData.BH_Done} / {rowData.BH_Total}
              </div>
            </div>
          ) : (
            'Không có bảo hành'
          ),
        width: 200,
        sortable: false
      },
      {
        key: 'action',
        title: 'Thao tác',
        dataKey: 'action',
        cellRenderer: ({ rowData }) => (
          <div className="d-flex">
            <button className="btn btn-xs btn-primary">Chi tiết</button>
          </div>
        ),
        align: 'center',
        width: 100,
        sortable: false,
        frozen: 'right'
      }
    ],
    []
  )

  return (
    <div className="h-100 p-20px">
      <ReactBaseTableInfinite
        rowKey="Ids"
        columns={columns}
        data={ListProds}
        loading={loading}
        pageCount={1}
        rowHeight={50}
      />
    </div>
  )
}

export default TelesalesOptionServices
