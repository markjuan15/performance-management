import { useForm } from "react-hook-form";
import { MdOutlinePassword } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import TextInput from "../../../inputs/textInput";
import PasswordInput from "../../../inputs/passwordInput";
import { useLogin } from "../../../hooks/getInfoHook";
import { supabase } from "./components/supabaseClient"
import google from "../../../assets/google.png"

export default function Login() {

    const signUp = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:5173/login-success",
                queryParams: {
                    prompt: "select_account",
                }
            },
        })
    }

    const { mutate: regUser, isSuccess: createIsSuccess, isLoading: isLoadingDone } = useLogin()

    type FormValues = {
        username: string,
        password: string,
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const getRegData = (data: any) => {
        regUser(data)
        if (isLoadingDone) if (createIsSuccess) reset();
    }
    const username = register("username")
    const password = register("password")

    return (
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center w-screen h-screen gap-10 md:gap-11 lg:gap-28 p-4 bg-slate-100">
            <div className="flex items-center md:items-start lg:items-start just justify-center md:justify-start lg:justify-start flex-col">
                <span className="text-5xl font-bold text-[#2474eb]">futabook</span>
                <span className="text-xl text-center md:text-left lg:text-left font-medium text-[#1c1e21] w-[300px]">Connect with friends and the world around you on Futabook.</span>
            </div>
            <div className="w-[22rem] h-fit bg-white border border-[#efefef] rounded-md drop-shadow-2xl p-4">
                <div className="flex flex-col gap-2">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(getRegData)}>
                        <div className="flex flex-col gap-3">
                            <TextInput register={username} errrMessage={errors.username?.message} label={"Username"} icon={<FaUserAlt className="text-slate-500 text-lg" />} />
                            <PasswordInput label={"Password"} register={password} errrMessage={errors.password?.message} icon={<MdOutlinePassword className="text-slate-500 text-lg" />} />
                        </div>
                        <button type="submit" className="bg-[#0866ff] rounded h-10 w-full text-white font-medium">Log In</button>
                    </form>
                    <div className="flex flex-col items-center justify-center gap-1">
                        <button onClick={signUp} className="flex items-center justify-center gap-3 cursor-pointer focus:ring-2 focus:ring-blue-300 bg-[#ffffff] rounded h-10 w-full text-black font-normal border border-gray-300">
                            <img src={google} className="w-6" alt="" />
                            <span className="">Sign in with Google</span>
                        </button>
                        <a className="text-sm text-[#0866ff] hover:underline">Forgot password?</a>
                    </div>
                    <div className="w-full bg-slate-300 p-[.05rem] my-2"></div>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center">
                            <a href="/register">
                                <div className="flex items-center justify-center bg-[#00a400] rounded-md h-10 w-52 text-white font-medium">
                                    <span className="">Create new account</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}