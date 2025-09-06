import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../component/mainComponent/credentials/components/supabaseClient";

const AuthContext = createContext<any>(null)

export const AuthContextProvider = ({ children }: any) => {
    const [session, setSession] = useState<any>(undefined)

    const signUp = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:5173/login-success", // adjust to your dev URL
            },
        })

        if (error) {
            console.error("there was a problem signing in: ", error)
            return { success: false, error }
        }
        return { success: true, data }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return <AuthContext.Provider value={{ session, signUp }}>{children}</AuthContext.Provider>
}

export const UserAuth = () => {
    return useContext(AuthContext)
}