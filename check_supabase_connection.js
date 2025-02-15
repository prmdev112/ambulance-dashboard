import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkConnection() {
  try {
    const { data, error } = await supabase.from("user_profiles").select("*").limit(1)
    if (error) throw error
    console.log("Supabase connection successful")
    console.log("Sample data from user_profiles:", data)
  } catch (error) {
    console.error("Error connecting to Supabase:", error.message)
  }
}

async function listTables() {
  try {
    const { data, error } = await supabase.rpc("list_tables")
    if (error) throw error
    console.log("Tables in the database:")
    data.forEach((table) => {
      console.log(`- ${table}`)
    })
  } catch (error) {
    console.error("Error listing tables:", error.message)
  }
}

async function main() {
  await checkConnection()
  await listTables()
}

main()

