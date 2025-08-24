import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginSuccess() {
    const navigate = useNavigate()
    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            const accessToken = params.get("token")

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const response = await axios.get("/api/auth/me", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },
                    });

                    if (response.data.success) {
                        navigate("/")
                    }
                } catch (error) {
                    console.error("Error fetching user: ", error)
                }
            }
        }
        handleAuth()
    }, [navigate])

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