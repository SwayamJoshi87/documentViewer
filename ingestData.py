import os
import re
import psycopg2  # You need to install psycopg2 to interact with PostgreSQL

# Regular expression to extract the numbering from the page names
page_pattern = re.compile(r'_(\d+)\.png$')

# Function to connect to the database
def connect_db():
    conn = psycopg2.connect(
        dbname="verceldb",
        user="default",
        password="CS7VOWs9tMXA",
        host="ep-quiet-voice-a4m7jszf.us-east-1.aws.neon.tech",  # or your db host
        port="5432"  # or your db port
    )
    return conn

# Function to insert folder data into the database
def insert_folder(cursor, folder_name, folder_title, folder_path):
    cursor.execute(
        "INSERT INTO dr_folders (folder_name, folder_title, folder_path) VALUES (%s, %s, %s) RETURNING id",
        (folder_name, folder_title, folder_path)
    )
    return cursor.fetchone()[0]

# Function to insert document data into the database
def insert_document(cursor, folder_id, document_name, document_title, document_path):
    cursor.execute(
        "INSERT INTO dr_documents (folder_id, document_name, document_title, document_path) VALUES (%s, %s, %s, %s) RETURNING id",
        (folder_id, document_name, document_title, document_path)
    )
    return cursor.fetchone()[0]

# Function to insert page data into the database
def insert_page(cursor, document_id, page_name, page_title, page_path):
    cursor.execute(
        "INSERT INTO dr_pages (document_id, page_name, page_title, page_path) VALUES (%s, %s, %s, %s) RETURNING id",
        (document_id, page_name, page_title, page_path)
    )
    return cursor.fetchone()[0]

# Function to print folder, document, and page data with custom paths and sequential page names
def process_and_insert_data(cursor, root_folder):
    for folder in os.listdir(root_folder):
        folder_path = os.path.join(root_folder, folder)

        if os.path.isdir(folder_path):
            folder_match = re.match(r'(\d+)-(.+)', folder)
            folder_name = folder_match.group(2) if folder_match else folder
            folder_num = folder_match.group(1) if folder_match else 'Unknown'
            folder_title = f"F{folder_num}"
            folder_db_path = f"/{folder}"
            
            # Insert folder into the database
            folder_id = insert_folder(cursor, folder_name, folder_title, folder_db_path)

            for document in os.listdir(folder_path):
                document_path = os.path.join(folder_path, document)

                if os.path.isdir(document_path):
                    doc_match = re.match(r'(\d+)-(.+)', document)
                    document_name = doc_match.group(2) if doc_match else document
                    doc_num = doc_match.group(1) if doc_match else 'Unknown'
                    document_title = f"{folder_title}.D{doc_num}"
                    document_db_path = f"/{folder}/{document}"

                    # Insert document into the database
                    document_id = insert_document(cursor, folder_id, document_name, document_title, document_db_path)

                    pages = []
                    for page in os.listdir(document_path):
                        page_match = page_pattern.search(page)
                        if page_match:
                            pages.append(page)

                    pages.sort()

                    for i, page_file in enumerate(pages, start=1):
                        page_title = str(i)
                        page_name = f"{document_title}.P{page_title}"
                        page_db_path = f"/{folder}/{document}/{page_file}"

                        # Insert page into the database
                        insert_page(cursor, document_id, page_name, page_title, page_db_path)

# Main execution
def main():
    # Get the current working directory
    root_folder = os.path.join(os.getcwd(), 'public', 'books')
    print(f"Processing data in: {root_folder}")

    # Connect to the database
    conn = connect_db()
    cursor = conn.cursor()

    try:
        # Process the folder structure and insert data into the database
        process_and_insert_data(cursor, root_folder)
        
        # Commit the transaction
        conn.commit()
    except Exception as e:
        print(f"An error occurred: {e}")
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    main()
