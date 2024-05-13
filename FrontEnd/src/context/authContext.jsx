import { createContext, useState, useMemo, useContext } from 'react'

//* CREO EL CONTEXTO
const AuthContext = createContext();

//* FUNCION QUE PROVEE EL CONTEXTO
export const AuthContextProvider = ({ children }) => {

    //! estado del user con inicializacion en lazy
    const [ user, setUser ] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
        /* if(user){
            user = JSON.parse(user)
        } else {
            user = null
        } */
    })

        //! estado allUser - con la info del lcoalStorage del register
        const [ allUser, setAllUser ] = useState({
            data:{
                confirmationCode: "",
                user: {
                    email: "",
                    password: "",
                }
            }
        })

        //! funcion puente - por si se pierde la info del register, por problemas de asincronia
        const bridgeData = (state) => {
            const data = localStorage.getItem('data');
            const dataJson = JSON.parse(data);
            switch (state) {
                case "ALLUSER":
                    setAllUser(dataJson);
                    localStorage.removeItem('data')
                    break;

                default:
                    break;
            }
        }

    //! funciones login y logout
    const login = (data) => {
        localStorage.setItem('user', data);
        const parseUser = JSON.stringify(data);
        setUser(parseUser)
    }

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null)
        //<Navigate to='/login'>
    }

    //! constante que memoriza los datos del contexto
    const value = useMemo(() => ({
        user,
        setUser,
        login,
        logout,
        allUser,
        setAllUser,
        bridgeData,
    }), [user, allUser])

    //! esta funcion devuelve el contexto para usar en main
    return <AuthContext.Provider value={value}> { children } </AuthContext.Provider>
}

//* USAMOS EL CONTEXTO
export const useAuth = () => useContext(AuthContext);