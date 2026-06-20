from supabase_client import supabase

def save_memory(key, value):

    return supabase.table(
        "memories"
    ).insert({
        "key": key,
        "value": value
    }).execute()


def get_memory(key):

    data = supabase.table(
        "memories"
    ).select("*").eq(
        "key",
        key
    ).execute()

    return data.data