from app.supabase_client import supabase

def create_chat(title):

    data = supabase.table(
        "chats"
    ).insert({

        "title": title

    }).execute()

    return data.data


def get_chats():

    data = supabase.table(
        "chats"
    ).select("*").execute()

    return data.data