import sys
import tinytuya

deviceId = sys.argv[1]
ipAddress = sys.argv[2]
deviceKey = sys.argv[3]

"d=tinytuya.OutletDevice('8418473734ab9516a360', '192.168.1.173', 'c06045916d938216')"
d=tinytuya.OutletDevice(deviceId, ipAddress, deviceKey)
d.set_version(3.3)

data = d.status()
print(data)

sys.stdout.flush()