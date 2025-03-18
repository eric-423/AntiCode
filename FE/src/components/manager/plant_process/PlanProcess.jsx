import LOCALSTORAGE from '../../../constant/localStorage';
import useLocalStorage from 'use-local-storage';
import './PlantProcess.css'
import CreatePlantProcess from './CreatePlantProcess/CreatePlantProcess';
import { useEffect, useState } from 'react';

const PlanProcess = () => {
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');
    const [showModalCreatePlantProcess, setShowModalCreatePlantProcess] = useState(false)
    const [plantData, setPlantData] = useState([]);
    const [plantSelectId, setPlantSelectId] = useState('');
    const [processDataFromPlantId, setProcessDataFromPlantId] = useState([]);

    useEffect(() => {
        setToken(atob(auth));
    }, [auth])


    useEffect(() => {
        // fetchPlantProcess()
        fetchPlantData()
    }, [])



    const fetchPlantProcess = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-process`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }



    const handleCreatePlantProcess = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: 'Plant Process'
                })
            })

        } catch (error) {
            console.log(error)
        }
    }


    const handleShowModalCreatePlantProcess = (e) => {
        e.preventDefault()
        setShowModalCreatePlantProcess(true)
    }


    const handleCloseModalCreatePlantProcess = () => {
        setShowModalCreatePlantProcess(false)
    }



    const fetchPlantData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data.data)
            setPlantData(data.data);
        } catch (error) {
            console.log(error)
        }
    }


    const handleSelectPlantId = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-process/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setProcessDataFromPlantId(data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='plant-process-container'>
            <div
                className="plant-process-button new-plant-process-button"
                onClick={(e) => handleShowModalCreatePlantProcess(e)}
            >
                Create Plant Process
            </div>
            {showModalCreatePlantProcess && (
                <CreatePlantProcess
                    plantData={plantData}
                    setShowModalCreatePlantProcess={setShowModalCreatePlantProcess}
                    onClose={handleCloseModalCreatePlantProcess}
                    handleSelectPlantId={handleSelectPlantId}
                    processDataFromPlantId={processDataFromPlantId}
                />
            )}
        </div>
    )
}

export default PlanProcess