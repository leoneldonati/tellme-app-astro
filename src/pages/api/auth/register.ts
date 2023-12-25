import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const form = await request.formData();
    const email =  form?.get("email")?.toString();
    const password =  form?.get("password")?.toString();

    if (!email || !password) return new Response("Debes ingresar todos los datos", { status: 400 });

    const {error} = await supabase.auth.signUp({ email, password })

    if (error) return new Response(`Ha habido un error: ${error}`, {status: 400})

    return redirect('/signin')
  } catch (e: any) {
    return new Response(e);
  }
};
