import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './NewTask.css'
import ICONS from '../../../../../constant/Image'
import { Form } from 'react-bootstrap'
import Button from '../../../../common/button/Button'
import { toast } from 'react-toastify/unstyled'

const NewTask = ({ setShowModal, setRefreshData }) => {
  const [taskId, setTaskId] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [completedAt, setCompletedAt] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskStatus, setTaskStatus] = useState('')
  const [taskType, setTaskType] = useState('')
  const modalRoot = document.body

  const handleClickClose = () => {
    setShowModal(false)
  }

  const [plantData, setPlantData] = useState([])
  const handleFetchDataPlant = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task`,
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
        `${import.meta.env.VITE_REACT_APP_END_POINT}/task`,
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
    const plantingLocation = {
      taskId: taskId,
      createdAt: createdAt,
      completedAt: completedAt,
      taskDescription: taskDescription,
      taskType: taskType,
      taskStatus: taskStatus,
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
      showToastMessageFail('Plant can not be added!')
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
            NEW PLANT
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
          <Form.Group>
            <Form.Label className="text-label-login">Is Harvest</Form.Label>
            <Form.Check
              type="checkbox"
              className="input-login input-addition"
              checked={isHarvest}
              onChange={(e) => setIsHarvest(e.target.checked)}
              label="Harvest"
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
