import React, {createContext, useState, useEffect} from 'react'
import api from '../../service/api'

const Context = createContext()

function AuthProvider({children}) {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

        setLoading(false)
    },[])

    function setAuthenticatedTrue() {
        setAuthenticated(true)
    }

    return (
        <Context.Provider value={authenticated, setAuthenticatedTrue}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }