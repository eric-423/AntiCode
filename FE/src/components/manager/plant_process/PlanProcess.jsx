/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from 'react'
import './PlantProcess.css'
import Table from './table/Table'
import ToolBar from './tool_bar/ToolBar'
import LOCALSTORAGE from "../../../constant/localStorage";
import useLocalStorage from "use-local-storage";

const PlanProcess = () => {
    const [refreshData, setRefreshData] = useState(true)
    const [auth, setAuth] = useLocalStorage(LOCALSTORAGE.ACCOUNT_LOGIN_INFORMATION, '');
    const [token, setToken] = useState('');


    const [showModalCreatePlantProcess, setShowModalCreatePlantProcess] = useState(false)
    const [plantData, setPlantData] = useState([]);
    const [plantSelectId, setPlantSelectId] = useState('');

    const [plantMedium, setPlantMedium] = useState([])
    const [plantMediumSelectId, setPlantMediumSelectId] = useState('')
    const [plantPot, setPlantPot] = useState([])
    const [plantPotSelectId, setPlantPotSelectId] = useState('')
    const [plantChemical, setPlantChemical] = useState([])
    const [selectedPlantChemical, setSelectedPlantChemical] = useState('')
    const [plantWater, setPlantWater] = useState([])
    const [selectedPlantWater, setSelectedPlantWater] = useState('')
    const [farmingEquipment, setFarmingEquipment] = useState([])
    const [selectedFarmingEquipment, setSelectedFarmingEquipment] = useState('')
    const [nameProcess, setNameProcess] = useState('')
    const [descriptionProcess, setDescriptionProcess] = useState('')
    const [mediumWeight, setMediumWeight] = useState(0)
    const [chemicalVolumn, setChemicalVolumn] = useState(0)
    const [waterVolumn, setWaterVolumn] = useState(0)
    const [itemUpdateId, setItemUpdateId] = useState(0)

    useEffect(() => {
        setToken(atob(auth));
    }, [auth])

    useEffect(() => {
        fetchPlantData();
        fetchPlantMedium();
        fetchPlantPot();
        fetchPlantChemical();
        fetchPlantWater();
        fetchPlantEquipment();
    }, [])


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

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json()
            setPlantData(data.data);
        } catch (error) {
            console.log("Lỗi khi fetch data:", error.message)
        }
    }

    const fetchPlantMedium = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-medium`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            setPlantMedium(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPlantPot = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/plant-pot`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response) {
                const data = await response.json()
                setPlantPot(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPlantChemical = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/chemical`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response) {
                const data = await response.json()
                setPlantChemical(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchPlantWater = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/water`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response) {
                const data = await response.json()
                setPlantWater(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetchPlantEquipment = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/farming-equipment`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response) {
                const data = await response.json()
                setFarmingEquipment(data)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleCreatePlantProcess = async () => {
        const body = {
            plantId: plantSelectId,
            name: nameProcess,
            description: descriptionProcess,
            plantingMediumId: plantMediumSelectId,
            plantPotId: plantPotSelectId,
            chemicalId: selectedPlantChemical,
            waterId: selectedPlantWater,
            farmingEquipmentId: selectedFarmingEquipment,
            mediumWeight: mediumWeight,
            chemicalVolumn: chemicalVolumn,
            waterVolumn: waterVolumn,
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/planting-process`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            if (response.ok) {
                setShowModalCreatePlantProcess(false)
                setRefreshData(prev => !prev)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const listTitle = [
        {
            name: "ID.",
            column: 0.1,
        },
        {
            name: "Plant Process",
            column: 0.5,
        },
        {
            name: "Created At",
            column: 0.5
        },
        {
            name: "Medium",
            column: 0.5,
        },
        {
            name: "Plant Pot",
            column: 0.5,
        },
        {
            name: "Water",
            column: 0.5,
        },
        {
            name: "Chemical",
            column: 0.5,
        },
        {
            name: "Equipment",
            column: 0.5,
        },
        {
            name: "Description",
            column: 0.5,
        },
    ];
    const [listItems, setListItems] = useState([]);

    const handleFetchPlantProcessData = useCallback(async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_REACT_APP_END_POINT}/planting-process?page=0&size=100`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                }
            )

            if (response.ok) {
                const data = await response.json()
                setListItems(data.content)
                console.log(data.content)

            }
        } catch (error) {
            console.log(error)
        }
    }, [token])

    useEffect(() => {
        if (refreshData) {
            handleFetchPlantProcessData()
            setRefreshData(false)
        }
    }, [refreshData, handleFetchPlantProcessData])


    const handleUpdateProcess = async () => {
        const body = {
            plantId: plantSelectId,
            name: nameProcess,
            description: descriptionProcess,
            plantingMediumId: plantMediumSelectId,
            plantPotId: plantPotSelectId,
            chemicalId: selectedPlantChemical,
            waterId: selectedPlantWater,
            farmingEquipmentId: selectedFarmingEquipment,
            mediumWeight: mediumWeight,
            chemicalVolumn: chemicalVolumn,
            waterVolumn: waterVolumn,
        }


        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_END_POINT}/planting-process/${itemUpdateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(body)
            })

            if (response.ok) {
                setShowModalDetail(!showModalDetail)
                setRefreshData(prev => !prev)
            }
        } catch (error) {
            console.log(error)
        }

    }
    const [showModalDetail, setShowModalDetail] = useState(false)


    return (
        <div className='plant-process-container'>

            <ToolBar
                setShowModalCreatePlantProcess={setShowModalCreatePlantProcess}
                showModalCreatePlantProcess={showModalCreatePlantProcess}
                onClose={handleCloseModalCreatePlantProcess}
                handleCreatePlantProcess={handleCreatePlantProcess}
                handleShowModalCreatePlantProcess={handleShowModalCreatePlantProcess}
                plantData={plantData}
                plantMedium={plantMedium}
                setPlantMediumSelectId={setPlantMediumSelectId}
                plantPot={plantPot}
                setPlantPotSelectId={setPlantPotSelectId}
                plantChemical={plantChemical}
                setSelectedPlantChemical={setSelectedPlantChemical}
                plantWater={plantWater}
                setSelectedPlantWater={setSelectedPlantWater}
                farmingEquipment={farmingEquipment}
                setSelectedFarmingEquipment={setSelectedFarmingEquipment}
                setNameProcess={setNameProcess}
                setDescriptionProcess={setDescriptionProcess}
                setPlantSelectId={setPlantSelectId}
                setMediumWeight={setMediumWeight}
                setChemicalVolumn={setChemicalVolumn}
                setWaterVolumn={setWaterVolumn} />



            <Table
                listItems={listItems}
                listTitle={listTitle}
                handleUpdateProcess={handleUpdateProcess}
                setItemUpdateId={setItemUpdateId}
                setShowModalDetail={setShowModalDetail}
                showModalDetail={showModalDetail}
                plantData={plantData}
                plantMedium={plantMedium}
                setPlantMediumSelectId={setPlantMediumSelectId}
                plantPot={plantPot}
                setPlantPotSelectId={setPlantPotSelectId}
                plantChemical={plantChemical}
                setSelectedPlantChemical={setSelectedPlantChemical}
                plantWater={plantWater}
                setSelectedPlantWater={setSelectedPlantWater}
                farmingEquipment={farmingEquipment}
                setSelectedFarmingEquipment={setSelectedFarmingEquipment}
                setNameProcess={setNameProcess}
                setDescriptionProcess={setDescriptionProcess}
                setPlantSelectId={setPlantSelectId}
                setMediumWeight={setMediumWeight}
                setChemicalVolumn={setChemicalVolumn}
                setWaterVolumn={setWaterVolumn}
            />

        </div>
    )
}




export default PlanProcess