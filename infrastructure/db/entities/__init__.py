import importlib
import pathlib

# Automatically Import all the files in the module (entities) as they get added, without having to import them here manually
# Get the current directory
package_dir = pathlib.Path(__file__).parent

# Iterate over all .py files (excluding __init__.py itself)
for path in package_dir.glob("*.py"):
    if path.name == "__init__.py":
        continue
    module_name = path.stem  # file name without .py
    importlib.import_module(f".{module_name}", package=__name__)