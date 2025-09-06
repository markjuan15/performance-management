import { supabase } from "../component/mainComponent/credentials/components/supabaseClient"
import { useSidebarStates } from "../hooks/store";
import session from "../hooks/supabaseHook";

export default function Navbar() {
    const { toggleItemState, setDropIndex } = useSidebarStates()

    const signOut = async () => {
        await supabase.auth.signOut()
            .then(({ error }) => {
                if (!error) {
                    window.location.href = "/login"
                    toggleItemState(0)
                    setDropIndex(0)
                } else {
                    console.error('Error signing out:', error.message);
                }
            })
            .catch(err => {
                console.error('Unexpected error during sign-out:', err);
            });
    }

    return (
        <div className="bg-white w-screen h-[3rem] px-2 border-b-1 border-b-slate-200">
            <div className="flex items-center h-full w-full justify-between">
                <div className="flex items-center text-black gap-2">
                    <div className="p-1 bg-slate-200 rounded-full shadow-xl/10">
                        <img src={session?.user_metadata?.avatar_url} className="w-[1.8rem] rounded-full" alt="" />
                    </div>
                    <span className="text-[.9rem] italic">Welcome, <span className="font-semibold">{session?.user_metadata?.name}</span></span>
                </div>
                <div className="">
                    <button onClick={signOut} className="bg-blue-400 p-1 rounded-md text-white text-sm active:scale-[.9] cursor-pointer">Logout</button>
                </div>
            </div>
        </div>
    )
}