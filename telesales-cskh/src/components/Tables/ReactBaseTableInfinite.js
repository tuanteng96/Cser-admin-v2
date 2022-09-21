import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Table from 'react-base-table'
import Text from 'react-texty'
import 'react-texty/styles.css'

ReactBaseTableInfinite.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool
}

function ReactBaseTableInfinite({
  columns,
  data,
  onPagesChange,
  loading,
  filters,
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
    <div className="w-100 h-100 overflow-hidden" ref={refElm}>
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
        emptyRenderer={() => !loading && 'Trống.'}
        rowRenderer={rowRenderer}
        components={{ TableCell, TableHeaderCell }}
        ignoreFunctionInColumnCompare={false}
      />
    </div>
  )
}

export default ReactBaseTableInfinite
