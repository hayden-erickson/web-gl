import store from 'store';
import {setReconstruction} from 'store/radon/actions';
const conn = `wss://immense-ridge-35294.herokuapp.com/echo`;
const ws = new WebSocket(conn);

interface ImageResponse {
  image: Uint8ClampedArray[];
}

function str2ab(s: string) {
  var buf = new ArrayBuffer(s.length); // 1 bytes for each char
  var bufView = new Uint8ClampedArray(buf);
  for (var i = 0, strLen = s.length; i < strLen; i++) {
    bufView[i] = s.charCodeAt(i);
  }
  return bufView;
}

function deserialize(resp: string): ImageResponse {
  const json = JSON.parse(resp);

  return {
    // Golang json package serializes arrays of bytes / uint8
    // as base64 encoded string. Therefore, we first decode
    // the string from base64 to utf-8, then convert each
    // character into an number.
    image: json.image.map(atob).map(str2ab),
  };
}

ws.onopen = function() {
  console.log('OPEN');
};

ws.onclose = function() {
  console.log('CLOSE');
};

ws.onmessage = function(evt: MessageEvent) {
  const resp = deserialize(evt.data);
  store.dispatch(setReconstruction(resp.image));
};

ws.onerror = function(evt: Event) {
  console.log('ERROR: ');
  console.log(evt);
};

interface UploadSinoRequest {
  total: number;
  theta: number;
  sino_row: number[];
  filter: boolean;
}

export function send(req: UploadSinoRequest) {
  ws.send(JSON.stringify(req));
}
