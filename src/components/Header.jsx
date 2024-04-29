import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const [userData, setUserData] = useState('')
    useEffect(() => {
        updateUser()
    })
    const updateUser = () => {
        const uData = JSON.parse(localStorage.getItem('loginUser')) || null
        setUserData(uData)
    }

    const onClickLogoutHandle = () => {
        localStorage.removeItem('loginUser')
        updateUser()
    }
    return (
        <>
            <div className='p-3 bg-light'>
                <div className='container-fluid'>
                    <div className='container'>
                        <div className='d-flex justify-content-between'>
                            <div className='fs-3'>MineCart</div>
                            {userData ?
                                <div className='mt-2'>
                                    {userData.first_name} {userData.last_name} <FontAwesomeIcon icon={faSignOut} className='fs-6 ms-3 text-danger' onClick={onClickLogoutHandle} />
                                </div> :
                                <button className='btn btn-secondary' onClick={() => navigate('/login')}>Login</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header