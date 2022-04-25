import pandas as pd

read_file = pd.read_csv (r'data\Wisconsin Folksongs (geotagging)\WiscFolkSong.txt')
read_file.to_csv (r'data\converted.csv', index=None)

#man this way is not gonna work probably