import sys
import json
import os


def serialize_to_json(input_path):
    # Check if the file exists
    if not os.path.exists(input_path):
        print(f"Error: File '{input_path}' not found.")
        return

    # Check if the file has a .py extension
    # if not input_path.endswith(".py"):
    #     print("Error: Input file must have a .py extension.")
    #     return

    # Derive output file path
    output_path = input_path[:-3] + ".json"

    # Read serialized python dict from file
    try:
        with open(input_path, "r") as f:
            serialized_data = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # Deserialize and convert to JSON
    try:
        python_dict = eval(serialized_data)
        json_data = json.dumps(python_dict, indent=4)
    except Exception as e:
        print(f"Error converting to JSON: {e}")
        return

    # Write JSON to output file
    try:
        with open(output_path, "w") as f:
            f.write(json_data)
        print(f"Conversion successful. JSON file saved as '{output_path}'.")
    except Exception as e:
        print(f"Error writing JSON file: {e}")


if __name__ == "__main__":
    # Check if a single argument (input file path) is provided
    if len(sys.argv) != 2:
        print("Usage: python script_name.py input_file.py")
    else:
        input_path = sys.argv[1]
        serialize_to_json(input_path)
