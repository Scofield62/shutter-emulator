import sys
import tinytuya

deviceId = sys.argv[1]
ipAddress = sys.argv[2]
deviceKey = sys.argv[3]
controlId = sys.argv[4]
action = sys.argv[5]

d=tinytuya.OutletDevice(deviceId, ipAddress, deviceKey)
d.set_version(3.3)

payload = d.generate_payload(tinytuya.CONTROL, {controlId: action})
data = d._send_receive(payload)

print(data)

sys.stdout.flush()