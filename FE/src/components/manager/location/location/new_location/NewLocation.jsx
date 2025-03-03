import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './NewLocation.css'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const NewLocation = ({ setShowModal, setRefreshData }) => {
  const [areaId, setAreaId] = useState('')
  const [locationName, setLocationName] = useState('')
  const [locationExtend, setLocationExtend] = useState('')
  const [locationWidth, setLocationWidth] = useState('')
  const [locationLength, setLocationLength] = useState('')

  const modalRoot = document.body

  const handleClickClose = () => {
    setShowModal(false)
  }

  const [areaData, setAreaData] = useState([])
  const handleFetchDataArea = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/area`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      setAreaData(data.data)
    } catch (error) {}
  }

  useEffect(() => {
    handleFetchDataArea()
  }, [])

  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
    })
  }

  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: 'top-right',
    })
  }

  const handleOnClick = async () => {
    const location = {
      locationName: locationName,
      locationExtend: locationExtend,
      areaId: areaId,
      locationWidth: locationWidth,
      locationLength: locationLength,
    }

    if (
      !areaId ||
      !locationName ||
      !locationExtend ||
      !locationWidth ||
      !locationLength
    ) {
      showToastMessageFail('All fields are required!')
      return
    }

    const width = parseFloat(locationWidth)
    const length = parseFloat(locationLength)
    const extent = parseFloat(locationExtend)

    if (width <= 0 || length <= 0 || extent <= 0) {
      showToastMessageFail(
        'Width, Length, and Extent must be positive numbers!'
      )
      return
    }

    if (width * length > extent) {
      showToastMessageFail('Width x Length cannot exceed Location Extent!')
      return
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/location`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(location),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      if (!data) throw new Error()
      showToastMessageSuccess('Location was added!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Location can not be added!')
      setShowModal(true)
    } finally {
      setRefreshData((prev) => !prev)
    }
  }

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            NEW LOCATION
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Area</Form.Label>
            <Form.Select
              className="input-login input-addition"
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
            >
              <option value="">Select Area</option>
              {areaData.map((area) => (
                <option key={area.areaId} value={area.areaId}>
                  {area.areaName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Location Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">
              Location Extent
            </Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={locationExtend}
              onChange={(e) => setLocationExtend(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Width</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={locationWidth}
              onChange={(e) => setLocationWidth(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Length</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={locationLength}
              onChange={(e) => setLocationLength(e.target.value)}
            />
          </Form.Group>
          <Button
            text="Create Location"
            handleOnClick={handleOnClick}
            className="button-create-plant"
          />
        </Form>
        <img
          className="icon-close"
          onClick={handleClickClose}
          src={ICONS.icon_close}
          alt=""
        />
      </div>
    </div>,
    modalRoot
  )
}

export default NewLocation
