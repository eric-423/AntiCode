import React, { useEffect, useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const UpdatePlantingLocation = ({ setShowModal, setRefreshData }) => {
  const [farmId, setFarmId] = useState('')
  const [areaName, setAreaName] = useState('')
  const [areaExtent, setAreaExtent] = useState('')
  const [areaWidth, setAreaWidth] = useState('')
  const [areaLength, setAreaLength] = useState('')

  const [areaData, setAreaData] = useState(null)
  const [farmData, setFarmData] = useState([])
  const [locationData, setLocationData] = useState([])

  const modalRoot = document.body

  const handleClickClose = () => {
    setShowModal(false)
  }

  const showToastMessageFail = (message) => {
    toast.error(message, {
      position: 'top-right',
    })
  }

  const showToastMessageSuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
    })
  }

  const handleOnClick = async () => {
    if (!farmId || !areaName || !areaExtent || !areaWidth || !areaLength) {
      showToastMessageFail('All fields are required!')
      return
    }

    const width = parseFloat(areaWidth)
    const length = parseFloat(areaLength)
    const extent = parseFloat(areaExtent)

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
      areaExtend: areaExtent,
      areaWidth: areaWidth,
      areaLength: areaLength,
      farmId: farmId,
    }
    try {
      const id = JSON.parse(localStorage.getItem('manager_area_selected'))
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/area/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(area),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      console.log(data)
      console.log(JSON.stringify(area))

      if (!data) throw new Error()
      showToastMessageSuccess('Area was updated!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Area can not be updated!')
      setShowModal(true)
    } finally {
      setRefreshData((prev) => !prev)
    }
  }

  const fetchData = useCallback(async (url, setState) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Failed to fetch data')
      const data = await response.json()
      setState(data.data)
    } catch (error) {
      console.error(error.message)
    }
  }, [])

  useEffect(() => {
    const fetchArea = async () => {
      const id =
        JSON.parse(localStorage.getItem('manager_area_selected')) || null
      if (!id) return

      const url = `${import.meta.env.VITE_REACT_APP_END_POINT}/area/${id}`
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        const data = result.data
        console.log(data)

        setAreaData(data)
        setFarmId(data.farm.farmId)
        setAreaName(data.areaName)
        setAreaExtent(data.areaExtend)
        setAreaWidth(data.areaWidth)
        setAreaLength(data.areaLength)
      }
    }

    fetchArea()
  }, [])

  useEffect(() => {
    const farmUrl = `${import.meta.env.VITE_REACT_APP_END_POINT}/farm`

    fetchData(farmUrl, setFarmData)
  }, [fetchData])

  return ReactDOM.createPortal(
    <div className="modal-create-plant-container">
      <div className="modal-create-plant">
        <Form className="form-addition-plant-type form-create-plant">
          <h4 className="addition-plant-type-h4 group-3-column-create-plant">
            UPDATE AREA
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
            <Form.Label className="text-label-login">Area Extent</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="number"
              value={areaExtent}
              onChange={(e) => setAreaExtent(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Width</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={areaWidth}
              onChange={(e) => setAreaWidth(e.target.value)}
              label="Harvest"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Length</Form.Label>
            <Form.Control
              type="number"
              className="input-login input-addition"
              value={areaLength}
              onChange={(e) => setAreaLength(e.target.value)}
              label="Harvest"
            />
          </Form.Group>
          <Button
            text="Update Area"
            className="button-create-plant"
            handleOnClick={handleOnClick}
          />
        </Form>
        <img
          className="icon-close"
          onClick={handleClickClose}
          src={ICONS.icon_close}
          alt="Close"
        />
      </div>
    </div>,
    modalRoot
  )
}

export default UpdatePlantingLocation
