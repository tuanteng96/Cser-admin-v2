import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import telesalesApi from 'src/api/telesales.api'
import ReactBaseTableInfinite from 'src/components/Tables/ReactBaseTableInfinite'
import Sidebar from './components/Sidebar'
import { Overlay } from 'react-bootstrap'

import moment from 'moment'
import 'moment/locale/vi'
import SelectStaffs from 'src/components/Selects/SelectStaffs'
moment.locale('vi')

const EditableCell = ({ rowData, container }) => {
  const [Editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('Nguyễn Tài Tuấn')
  const target = useRef(null)

  const handleClick = () => {
    setEditing(true)
  }

  const handleHide = () => {
    setEditing(false)
  }

  return (
    <div
      className="h-100 d-flex align-items-center"
      ref={target}
      onClick={() => handleClick()}
    >
      {!Editing && value}
      {Editing && target && (
        <Overlay
          target={target.current}
          show={Editing}
          placement="right"
          //container={container}
          onHide={handleHide}
          rootClose
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                position: 'absolute',
                width: 220,
                ...props.style
              }}
            >
              <SelectStaffs
                isLoading={loading}
                className="select-control"
                //menuPosition="fixed"
                name="filter.tele_user_id"
                //menuIsOpen={true}
                onChange={otp => {
                  setLoading(true)
                  //setFieldValue('filter.tele_user_id', otp, false)
                }}
                // value={values.filter.tele_user_id}
                isClearable={true}
              />
            </div>
          )}
        </Overlay>
      )}
    </div>
  )
}

function TelesalesList(props) {
  const { UserID, rightsSum } = useSelector(({ auth }) => ({
    UserID: auth?.User?.ID || '',
    rightsSum: auth?.Info?.rightsSum || null
  }))
  const [ListTelesales, setListTelesales] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageCount, setPageCount] = useState(0)
  const [PageTotal, setPageTotal] = useState(0)

  const [filters, setFilters] = useState({
    filter: {
      tele_process: '', //Đang tiếp cận,Đặt lịch thành công
      tele_user_id: rightsSum?.tele && rightsSum?.teleAdv ? UserID : '',
      wishlist: '', // id,id san_pham
      birthDateFrom: '', //31/12
      birthDateTo: '', //31/12
      bookDateFrom: '', // dd/mm/yyyy
      bookDateTo: '', // dd/mm/yyyy
      last_used: '',
      remains: '', //
      key: ''
    },
    pi: 1,
    ps: 20
  })

  useEffect(() => {
    getListTelesales()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const getListTelesales = () => {
    setLoading(true)
    const newFilter = {
      ...filters,
      filter: {
        ...filters.filter,
        tele_user_id: filters.filter.tele_user_id
          ? filters.filter.tele_user_id.values
          : '',
        tele_process: filters.filter.tele_process
          ? filters.filter.tele_process.map(process => process.value).join(',')
          : '',
        wishlist: filters.filter.wishlist
          ? filters.filter.wishlist.map(wish => wish.value).join(',')
          : '',
        birthDateFrom: filters.filter.birthDateFrom
          ? moment(filters.filter.birthDateFrom).format('DD/MM')
          : '',
        birthDateTo: filters.filter.birthDateTo
          ? moment(filters.filter.birthDateTo).format('DD/MM')
          : '',
        bookDateFrom: filters.filter.bookDateFrom
          ? moment(filters.filter.bookDateFrom).format('DD/MM/YYYY')
          : '',
        bookDateTo: filters.filter.bookDateTo
          ? moment(filters.filter.bookDateTo).format('DD/MM/YYYY')
          : ''
      }
    }
    telesalesApi
      .getListMemberTelesales(newFilter)
      .then(({ data }) => {
        if (data.error) {
          // Xử lí lỗi
        } else {
          const { List, PCount, Total } = {
            List: data?.data || [],
            Pcount: data?.pCount || 0,
            Total: data?.total || 0
          }
          if (filters.pi > 1) {
            setListTelesales(prevState => [...prevState, ...List])
          } else {
            setListTelesales(List)
          }
          setPageCount(PCount)
          setPageTotal(Total)
          setLoading(false)
        }
      })
      .catch(error => console.log(error))
  }

  const columns = useMemo(
    () => [
      {
        key: 'index',
        title: 'STT',
        dataKey: 'index',
        cellRenderer: ({ rowIndex }) => rowIndex + 1,
        width: 60,
        sortable: false,
        align: 'center',
        frozen: 'left'
      },
      {
        key: 'FullName',
        title: 'Họ và tên',
        dataKey: 'FullName',
        width: 250,
        sortable: false,
        frozen: 'left'
      },
      {
        key: 'ByStock.Title',
        title: 'Cơ sở',
        dataKey: 'ByStock.Title',
        width: 250,
        sortable: false
      },
      {
        key: 'Staffs',
        title: 'Nhân viên phụ trách',
        dataKey: 'Staffs',
        width: 250,
        sortable: false,
        cellRenderer: ({ rowData, container }) => (
          <EditableCell rowData={rowData} container={container} />
        )
      },
      {
        key: 'TeleTags',
        title: 'Trạng thái',
        dataKey: 'TeleTags',
        width: 200,
        sortable: false
      },
      {
        key: 'Contact',
        title: 'Liên hệ gần nhất',
        dataKey: 'Contact',
        width: 250,
        sortable: false
      },
      {
        key: 'TeleNote',
        title: 'Ghi chú',
        dataKey: 'TeleNote',
        width: 353,
        sortable: false
      },
      {
        key: 'action',
        title: 'Thao tác',
        dataKey: 'action',
        cellRenderer: ({ rowData }) => (
          <div className="d-flex">
            <button
              className="w-38px h-38px rounded-circle btn btn-success shadow mx-4px"
              style={{ transform: 'rotate(-25deg)' }}
            >
              <i className="fa-sharp fa-solid fa-phone-volume text-white"></i>
            </button>
            <Link
              className="w-38px h-38px rounded-circle d-flex align-items-center justify-content-center text-none btn btn-primary shadow mx-4px"
              to={`/danh-sach/${rowData.ID}`}
            >
              <i className="fa-regular fa-arrow-right pt-2px"></i>
            </Link>
          </div>
        ),
        align: 'center',
        width: 130,
        sortable: false,
        frozen: 'right'
      }
    ],
    []
  )

  const handleEndReached = () => {
    if (ListTelesales.length > PageTotal) {
      return
    }
    setFilters(prevState => ({ ...prevState, pi: prevState.pi + 1 }))
  }

  const onFilter = values => {
    setFilters(prevState => ({ ...prevState, ...values, pi: 1 }))
  }

  return (
    <div className="d-flex h-100 telesales-list">
      <Sidebar filters={filters} loading={loading} onSubmit={onFilter} />
      <div className="telesales-list__content flex-fill px-30px pb-30px d-flex flex-column">
        <div className="border-bottom py-15px text-uppercase fw-600 font-size-lg">
          Danh sách khách hàng -{' '}
          <span className="text-danger">{PageTotal}</span>
          <span className="pl-5px font-label text-muted font-size-sm text-none">
            khách hàng
          </span>
        </div>
        <div className="flex-grow-1">
          <ReactBaseTableInfinite
            rowKey="ID"
            filters={filters}
            columns={columns}
            data={ListTelesales}
            loading={loading}
            pageCount={PageCount}
            onEndReachedThreshold={300}
            onEndReached={handleEndReached}
            rowHeight={60}
            onScroll={() => document.body.click()}
            //onPagesChange={onPagesChange}
            //rowRenderer={rowRenderer}
          />
        </div>
      </div>
    </div>
  )
}

export default TelesalesList
