const http = require('http');
const crypto = require('crypto')

export default async () => {
  const srv = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  })

  srv.on('upgrade', (req, socket, head) => {
    console.log('upgrade')
    const { headers = {} } = req
    const { 
      'sec-websocket-key': secWebsocketKey,
      'sec-websocket-protocol': secWebsocketProtocol,
    } = headers

    const secWebSocketAccept = crypto
      .createHash('sha1')
      .update(`${secWebsocketKey}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`, 'binary')
      .digest('base64')

    const responseHeaders = [
      'HTTP/1.1 101 Web Socket Protocol Handshake',
      'Upgrade: WebSocket',
      'Connection: Upgrade',
      'Sec-WebSocket-Accept: ' + secWebSocketAccept,
    ]

    if(secWebsocketProtocol.split(',').includes('json')){
      responseHeaders.push(`Sec-WebSocket-Protocol: json`);
    }

    socket.write(`${responseHeaders.join('\r\n')}\r\n\r\n`);

    socket.on('data', function (buffer) {
      let response = ''
      for(var k = 0; k < (4096 * 2 * 2 * 2); k++){
        response += '1'
      }
      socket.write(constructReply([response])); 

      console.log('recieved: ', parseMessage(buffer))
    })
  });


function constructReply (data) {
  const json = JSON.stringify(data)
  const jsonByteLength = Buffer.byteLength(json);
  const lengthByteCount = jsonByteLength < 126 ? 0 : 2; 
  const payloadLength = lengthByteCount === 0 ? jsonByteLength : 126; 
  const buffer = Buffer.alloc(2 + lengthByteCount + jsonByteLength); 

  buffer.writeUInt8(0b10000001, 0); 
  buffer.writeUInt8(payloadLength, 1); 

  let payloadOffset = 2; 
  if (lengthByteCount > 0) { 
    buffer.writeUInt16BE(jsonByteLength, 2); 
    payloadOffset += lengthByteCount; 
  }
  buffer.write(json, payloadOffset); 
  return buffer;
}

const hexadecimalDigits = {
  '0000':  '%x0',
  '0001':  '%x1',
  '0010':  '%x2',
  '0011':  '%x3',
  '0100':  '%x4',
  '0101':  '%x5',
  '0110':  '%x6',
  '0111':  '%x7',
  '1000':  '%x8',
  '1001':  '%x9',
  '1010':  '%xA',
  '1011':  '%xB',
  '1100':  '%xC',
  '1101':  '%xD',
  '1110':  '%xE',
  '1111':  '%xF',
}

const opCodeValues = {
  '%x0': 'continuation frame',
  '%x1': 'text frame',
  '%x2': 'binary frame',
  '%x3': 'non-control frame',
  '%x4': 'non-control frame',
  '%x5': 'non-control frame',
  '%x6': 'non-control frame',
  '%x7': 'non-control frame',
  '%x8': 'connection close',
  '%x9': 'ping',
  '%xA': 'pong',
  '%xB': 'control frame',
  '%xC': 'control frame',
  '%xD': 'control frame',
  '%xE': 'control frame',
  '%xF': 'control frame',
}

// https://tools.ietf.org/html/rfc6455#section-5.2
function parseMessage (buffer) {
  let i = 0
  const ABNF = {}
  while (i >= 0) {
    try {
      const thisByte = buffer.readUInt8(i)
      const byteBinary = "0".repeat(8 - thisByte.toString(2).length) + thisByte.toString(2)
      switch (i) {
        case 0:
          ABNF['FIN'] = byteBinary[0]
          ABNF['RSV1'] = byteBinary[1]
          ABNF['RSV2'] = byteBinary[2]
          ABNF['RSV3'] = byteBinary[3]
          ABNF['opcode'] = opCodeValues[hexadecimalDigits[byteBinary.substr(-4)]]
        break;

        case 1: 
          ABNF['MASK'] = byteBinary[0]
          ABNF['Payload len'] = parseInt(byteBinary.substr(-7), 2)
        break;

        case 2:
          if(ABNF['Payload len'] <= 125) {
            if(ABNF['MASK'] == 1) {
              ABNF['Masking-key'] = byteBinary
            }
          }
        break;

        case 3:
          if(ABNF['Payload len'] <= 125) {
            if(ABNF['MASK'] == 1) {
              ABNF['Masking-key'] += byteBinary
            }
          }
        break;

        case 4:
          if(ABNF['Payload len'] <= 125) {
            if(ABNF['MASK'] == 1) {
              ABNF['Masking-key'] += byteBinary
            }
          }
        break;

        case 5:
          if(ABNF['Payload len'] <= 125) {
            if(ABNF['MASK'] == 1) {
              ABNF['Masking-key'] += byteBinary
            }
          }
        break;

        default:
          if(ABNF['Payload len'] <= 125) {
            if(ABNF['MASK'] == 1) {
              ABNF['Payload Data'] = (!ABNF['Payload Data']) 
                ? byteBinary 
                : (ABNF['Payload Data'] + byteBinary)
            }
          }
        break;
      }

      i++
    } catch(e) {
      i = -1
    }
  }

  const data = Buffer.alloc(ABNF['Payload len']);
  for (let i = 0; i < ABNF['Payload len']; i++) {
    const j = i % 4
    const pre_mask = ABNF['Masking-key'].substring(8 * j, (8 * j) + 8)
    const mask = parseInt(pre_mask, 2)
    const pre_source = ABNF['Payload Data'].substring(8 * i, (8 * i) + 8)
    const source = parseInt(pre_source, 2)
    data.writeUInt8(mask ^ source, i); 
  }

  try {
    return JSON.parse(data.toString('utf8'))
  } catch(e) {
    console.log(e);
    return false
  }

}
  srv.listen(8080);

  console.log('server')  
}
