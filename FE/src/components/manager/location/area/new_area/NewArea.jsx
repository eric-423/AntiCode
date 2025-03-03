import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './NewArea.css'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const NewPlantingLocation = ({ setShowModal, setRefreshData }) => {
  const [farmId, setFarmId] = useState('')
  const [areaName, setAreaName] = useState('')
  const [areaExtend, setAreaExtend] = useState('')
  const [areaWidth, setAreaWidth] = useState('')
  const [areaLength, setAreaLength] = useState('')

  const modalRoot = document.body

  const handleClickClose = () => {
    setShowModal(false)
  }

  const [farmData, setFarmData] = useState([])
  const handleFetchDataFarm = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/farm`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      setFarmData(data.data)
    } catch (error) {}
  }

  useEffect(() => {
    handleFetchDataFarm()
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
    if (!farmId || !areaName || !areaExtend || !areaWidth || !areaLength) {
      showToastMessageFail('All fields are required!')
      return
    }

    const width = parseFloat(areaWidth)
    const length = parseFloat(areaLength)
    const extent = parseFloat(areaExtend)

    if (width <= 0 || length <= 0 || extent <= 0) {
      showToastMessageFail(
        'Width, Length, and Area Extend must be positive numbers!'
      )
      return
    }

    if (width * length > extent) {
      showToastMessageFail('Width x Length cannot exceed Area Extend!')
      return
    }

    const area = {
      areaName: areaName,
      areaExtend: areaExtend,
      farmId: farmId,
      areaWidth: areaWidth,
      areaLength: areaLength,
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/area`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(area),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      if (!data) throw new Error()
      showToastMessageSuccess('Area was added!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Area can not be added!')
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
            NEW AREA
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Farm</Form.Label>
            <Form.Select
              className="input-login input-addition"
              value={farmId}
              onChange={(e) => setFarmId(e.target.value)}
            >
              <option value="">Select Farm</option>
              {farmData.map((farm) => (
                <option key={farm.farmId} value={farm.farmId}>
                  {farm.farmName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Area Name</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Area Extend</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={areaExtend}
              onChange={(e) => setAreaExtend(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Width</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={areaWidth}
              onChange={(e) => setAreaWidth(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Length</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={areaLength}
              onChange={(e) => setAreaLength(e.target.value)}
            />
          </Form.Group>
          <Button
            text="Create Plant"
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

export default NewPlantingLocation
