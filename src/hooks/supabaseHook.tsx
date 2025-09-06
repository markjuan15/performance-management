import { supabase } from "../component/mainComponent/credentials/components/supabaseClient";

const data = await supabase.auth.getSession()

const session = data?.data?.session?.user

export default session