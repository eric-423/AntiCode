import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './NewPlantingLocation.css'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const NewPlantingLocation = ({ setShowModal, setRefreshData }) => {
  const [locationId, setLocationId] = useState('')
  const [plantId, setPlantId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const modalRoot = document.body

  const handleClickClose = () => {
    setShowModal(false)
  }

  const [plantData, setPlantData] = useState([])
  const handleFetchDataPlant = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/plant`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      setPlantData(data.data)
    } catch (error) {}
  }

  useEffect(() => {
    handleFetchDataPlant()
  }, [])

  const [locationData, setLocationData] = useState([])
  const handleFetchDataLocation = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/location/available`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      setLocationData(data.data)
    } catch (error) {}
  }

  useEffect(() => {
    handleFetchDataLocation()
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
    if (!locationId || !plantId || !startDate || !endDate) {
      showToastMessageFail('Please fill in all fields!')
      return
    }

    const today = new Date().toISOString().split('T')[0]

    if (startDate < today) {
      showToastMessageFail('Start date cannot be in the past!')
      return
    }

    if (endDate <= startDate) {
      showToastMessageFail('End date must be after start date!')
      return
    }

    const plantingLocation = {
      locationId: locationId,
      startDate: startDate,
      endDate: endDate,
      harvest: false,
      plantId: plantId,
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/planting-location`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(plantingLocation),
        }
      )
      if (!response.ok) throw new Error()
      const data = await response.json()
      if (!data) throw new Error()
      showToastMessageSuccess('Plant was added!')
      setShowModal(false)
    } catch (error) {
      showToastMessageFail('Plant Location can not be added!')
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
            NEW PLANTING LOCATION
          </h4>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Location</Form.Label>
            <Form.Select
              className="input-login input-addition"
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
            >
              <option value="">Select Location</option>
              {locationData.map((location) => (
                <option key={location.locationId} value={location.locationId}>
                  {location.locationName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="group-3-column-create-plant">
            <Form.Label className="text-label-login">Plant</Form.Label>
            <Form.Select
              className="input-login input-addition"
              value={plantId}
              onChange={(e) => setPlantId(e.target.value)}
            >
              <option value="">Select Plant</option>
              {plantData.map((plant) => (
                <option key={plant.plantId} value={plant.plantId}>
                  {plant.plantName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">Start Date</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-label-login">End Date</Form.Label>
            <Form.Control
              className="input-login input-addition"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
          <Button
            text="Create"
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
