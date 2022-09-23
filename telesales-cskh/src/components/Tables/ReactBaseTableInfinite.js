import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Table from 'react-base-table'
import Text from 'react-texty'
import 'react-texty/styles.css'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'

ReactBaseTableInfinite.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool
}

ReactBaseTableInfinite.defaultProps = {
  PageCount: 0
}

function ReactBaseTableInfinite({
  columns,
  data,
  onPagesChange,
  loading,
  pageCount,
  rowKey,
  rowRenderer,
  ...props
}) {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const refElm = useRef(null)
  const tableRef = useRef(null)

  useEffect(() => {
    setWidth(refElm?.current?.offsetWidth || 0)
    setHeight(refElm?.current?.offsetHeight || 0)
  }, [refElm])

  const TableCell = ({ className, cellData }) => (
    <Text tooltipMaxWidth={280} className={className}>
      {cellData}
    </Text>
  )

  const TableHeaderCell = ({ className, column }) => (
    <Text tooltipMaxWidth={280} className={className}>
      {column.title}
    </Text>
  )

  return (
    <div className="w-100 h-100" ref={refElm}>
      <Table
        ref={tableRef}
        {...props}
        fixed
        rowKey={rowKey}
        width={width}
        height={height}
        columns={columns}
        data={data}
        overlayRenderer={() => (
          <>
            {loading && (
              <div className="BaseTable-loading">
                <div className="spinner spinner-primary"></div>
              </div>
            )}
          </>
        )}
        emptyRenderer={() =>
          !loading && (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
              <div>
                <img
                  className="w-100 max-w-300px"
                  src={AssetsHelpers.toAbsoluteUrl(
                    '/_assets/images/data-empty.png'
                  )}
                  alt="Không có dữ liệu"
                />
                <div className="text-center font-size-base mt-15px fw-300">
                  Không có dữ liệu ...
                </div>
              </div>
            </div>
          )
        }
        rowRenderer={rowRenderer}
        components={{ TableCell, TableHeaderCell }}
        ignoreFunctionInColumnCompare={false}
      />
    </div>
  )
}

export default ReactBaseTableInfinite
