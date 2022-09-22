import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import telesalesApi from 'src/api/telesales.api'
import { AssetsHelpers } from 'src/helpers/AssetsHelpers'
import { PriceHelper } from 'src/helpers/PriceHelper'
import SelectProgress from 'src/components/Selects/SelectProgress'

import moment from 'moment'
import 'moment/locale/vi'

moment.locale('vi')

function TelesalesDetail(props) {
  let { MemberID } = useParams()

  const [MemberCurrent, setMemberCurrent] = useState(null)
  const [loadingMember, setLoadingMember] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    getMemberTelesales()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MemberID])

  const getMemberTelesales = () => {
    telesalesApi
      .getMemberIDTelesales(MemberID)
      .then(({ data }) => {
        if (data.error) {
          navigate('/danh-sach')
        } else {
          setMemberCurrent(data.member)
          setLoadingMember(false)
        }
      })
      .catch(error => console.log(error))
  }
  console.log(MemberCurrent)
  return (
    <div className="d-flex h-100 telesales-list">
      {/* <div className="mb-15px">
        <div className="container-fluid">
          <div className="bg-white rounded-sm">
            <div className="d-flex align-items-center px-15px py-15px">
              <div className="flex-fill d-flex align-items-center">
                <div
                  className="w-40px h-40px border rounded-circle cursor-pointer position-relative"
                  onClick={() => navigate('/danh-sach')}
                >
                  <i className="fa-regular fa-chevrons-left position-absolute left-12px top-14px"></i>
                </div>
                <div className="rounded-circle overflow-hidden w-60px shadow ml-12px">
                  <img
                    className="w-100"
                    src="https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/users/300_1.jpg"
                    alt=""
                  />
                </div>
                <div className="pl-15px">
                  <div className="mb-2px">
                    <div className="text-uppercase fw-600 font-size-lg">
                      {MemberCurrent?.FullName} - {MemberCurrent?.MobilePhone}
                    </div>
                  </div>
                  <div className="member-topay">
                    <ul className="d-flex p-0 m-0 breadcrumb-solid">
                      <li>
                        Ví
                        <span className="font-number pl-5px fw-600">
                          {PriceHelper.formatVND(
                            MemberCurrent?.Present?.nap_vi
                          )}
                        </span>
                      </li>
                      <li>
                        Thẻ tiền
                        <span className="font-number pl-5px fw-600">
                          {PriceHelper.formatVND(
                            MemberCurrent?.Present?.the_tien_kha_dung
                          )}
                        </span>
                      </li>
                      <li>
                        Đã chi tiêu
                        <span className="font-number pl-5px fw-600">
                          {PriceHelper.formatVND(
                            MemberCurrent?.Present?.da_chi_tieu
                          )}
                        </span>
                      </li>
                      <li>
                        Công nợ
                        <span className="font-number pl-5px fw-600">
                          {PriceHelper.formatVND(MemberCurrent?.Present?.no)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <button className="w-45px h-45px rounded-circle btn btn-success shadow mx-4px p-0 position-relative">
                  <img
                    className="w-25px position-absolute top-10px left-8px"
                    src={AssetsHelpers.toAbsoluteUrl(
                      '/_assets/images/icon-call.png'
                    )}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="telesales-list__sidebar bg-white">
        <div className="border-bottom px-20px py-15px text-uppercase fw-600 font-size-lg d-flex align-items-center">
          <div
            className="w-40px h-40px border rounded-circle cursor-pointer position-relative mr-10px"
            onClick={() => navigate('/danh-sach')}
          >
            <i className="fa-regular fa-arrow-left position-absolute left-12px top-12px"></i>
          </div>
          Thông tin khách hàng
        </div>
        <div className="p-20px">
          <div className="d-flex justify-content-center">
            <div className="w-85px position-relative">
              <img
                className="w-100 rounded-sm shadow"
                src="https://preview.keenthemes.com/metronic/theme/html/demo1/dist/assets/media/users/300_1.jpg"
                alt=""
              />
            </div>
            <div className="flex-fill pl-15px">
              <div className="text-capitalize fw-700 font-size-md mb-3px line-height-sm">
                {MemberCurrent?.FullName}
              </div>
              <div className="font-number fw-600 font-size-base">
                {MemberCurrent?.MobilePhone}
              </div>
              <div className="btn btn-sm btn-primary mr-2 py-6px px-3 px-xxl-3 fw-500 mt-8px">
                <i className="fa-solid fa-phone pr-5px"></i> 
                Gọi điện
              </div>
            </div>
          </div>
          <div className="mt-20px">
            <div className="d-flex justify-content-between mb-8px">
              <div className="font-label">Cơ sở</div>
              <div className="fw-600">
                {MemberCurrent?.ByStock?.Title || 'Chưa có'}
              </div>
            </div>
            <div className="d-flex justify-content-between mb-8px">
              <div className="font-label">Loại</div>
              <div className="fw-600">Khách hàng thân thiết</div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="font-label">Sinh nhật</div>
              <div className="fw-600 font-number">
                {moment().format('DD-MM-YYYY')}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap px-10px border-top pt-10px">
          <div className="w-50 p-8px">
            <div className="border rounded-sm d-flex align-items-center flex-column px-10px py-15px">
              <div className="text-uppercase font-size-min fw-700 text-muted">
                Ví điện tử
              </div>
              <div className="font-number font-size-md fw-600 mt-3px">
                {PriceHelper.formatVND(MemberCurrent?.Present?.nap_vi)}
              </div>
            </div>
          </div>
          <div className="w-50 p-8px">
            <div className="border rounded-sm d-flex align-items-center flex-column px-10px py-15px">
              <div className="text-uppercase font-size-min fw-700 text-muted">
                Thẻ tiền
              </div>
              <div className="font-number font-size-md fw-600 mt-3px">
                {PriceHelper.formatVND(
                  MemberCurrent?.Present?.the_tien_kha_dung
                )}
              </div>
            </div>
          </div>
          <div className="w-50 p-8px">
            <div className="border rounded-sm d-flex align-items-center flex-column px-10px py-15px">
              <div className="text-uppercase font-size-min fw-700 text-muted">
                Đã chi tiêu
              </div>
              <div className="font-number font-size-md fw-600 mt-3px">
                {PriceHelper.formatVND(MemberCurrent?.Present?.da_chi_tieu)}
              </div>
            </div>
          </div>
          <div className="w-50 p-8px">
            <div className="border rounded-sm d-flex align-items-center flex-column px-10px py-15px">
              <div className="text-uppercase font-size-min fw-700 text-muted">
                Công nợ
              </div>
              <div className="font-number font-size-md fw-600 mt-3px">
                {PriceHelper.formatVND(MemberCurrent?.Present?.no)}
              </div>
            </div>
          </div>
        </div>
        <div className="pl-15px pr-15px pb-15px pt-8px">
          <textarea
            className="w-100 form-control form-control-solid p-12px"
            rows="6"
            placeholder="Nhập ghi chú"
          ></textarea>
        </div>
      </div>
      <div className="telesales-list__content flex-fill d-flex flex-column bg-white border-left">
        <div className="telesales-detail-head border-bottom px-20px d-flex align-items-center justify-content-center">
            <SelectProgress 
              isMulti
              className="w-100"
              placeholder="Chọn Tags khách hàng"
            />
        </div>
        <div className="d-flex telesales-detail-body">
            <div className="w-425px border-right p-20px">
              <div className="border-bottom pb-15px mb-15px">
                <div className="text-uppercase d-flex justify-content-between align-items-center">
                  <span className="fw-600">SP khách hàng quan tâm</span>
                  <button className="btn btn-xs btn-success">Thêm mới</button>
                </div>
              </div>
              <div className="border-bottom pb-15px mb-15px">
                <div className="text-uppercase d-flex justify-content-between align-items-center">
                  <span className="fw-600">Đặt lịch khách hàng</span>
                  <button className="btn btn-xs btn-success">Đặt lịch mới</button>
                </div>
              </div>
              <div>
                <div className="text-uppercase d-flex justify-content-between align-items-center">
                  <span className="fw-600">Lịch sử chăm sóc</span>
                </div>
              </div>
            </div>
            <div className="flex-fill">
              2
            </div>
        </div>
      </div>
    </div>
  )
}

export default TelesalesDetail
