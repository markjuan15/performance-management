import { useNavigate } from "react-router-dom"
import { supabase } from "./mainComponent/credentials/components/supabaseClient"
import { useSaveUser } from "../hooks/getInfoHook"
import { useEffect } from "react"

export default function LoginSuccess() {
    const navigate = useNavigate()
    const { mutate: saveUser } = useSaveUser()

    useEffect(() => {
        const handleAuth = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();

            if (session) {
                saveUser(JSON.stringify(session))
            } else {
                navigate("/login")
            }
        }
        handleAuth()
    }, [])

    return (
        <main className="flex h-screen justify-center items-center bg-slate-100">
            <div className="text-center">
                {/* <p className="text-base font-semibold text-indigo-600">404</p> */}
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Logging in using google account</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">Yehey, you have successfuly loged in.</p>
            </div>
        </main>
    )
}