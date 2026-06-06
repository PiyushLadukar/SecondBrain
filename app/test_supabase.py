from supabase_client import supabase

response = supabase.table(
    "messages"
).select("*").execute()

print(response.data)