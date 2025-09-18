import os
# to rename the images in a folder in a sequential manner
folder = r"C:\Users\jaip7\Downloads\fences"

extensions = (".jpg", ".jpeg", ".png", ".bmp", ".tif", ".tiff")

files = [f for f in os.listdir(folder) if f.lower().endswith(extensions)]
files.sort()

for idx, filename in enumerate(files, start=1):
    ext = os.path.splitext(filename)[1].lower() 
    new_name = f"fence_{idx:03d}{ext}"
    old_path = os.path.join(folder, filename)
    new_path = os.path.join(folder, new_name)
    os.rename(old_path, new_path)
    

print("Renaming complete!")
