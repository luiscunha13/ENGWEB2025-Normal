import json

def add_year_ids(data):
    for year_id, year in enumerate(data):
        year['_id'] = year_id
    return data

def main():
    try:
        # Load your data
        with open('dataset.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"Loaded {len(data)} years of data")  # Debug print
        
        # Process the data
        processed_data = add_year_ids(data)
        
        # Verify changes
        print("Sample year with _id:", processed_data[0].get('_id', 'NOT FOUND'))  # Debug print
        
        # Save the processed data
        with open('eurovision_data_with_year_ids.json', 'w', encoding='utf-8') as f:
            json.dump(processed_data, f, ensure_ascii=False, indent=4)
        
        print("Year IDs added successfully!")
    
    except FileNotFoundError:
        print("Error: Input file 'dataset3.json' not found")
    except json.JSONDecodeError:
        print("Error: Invalid JSON format in input file")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()