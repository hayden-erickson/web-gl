const conn = `ws://localhost:8080/echo`;
const ws = new WebSocket(conn);

ws.onopen = function() {
  console.log('OPEN');
};

ws.onclose = function() {
  console.log('CLOSE');
};

ws.onmessage = function(evt: MessageEvent) {
  console.log(JSON.parse(evt.data));
};

ws.onerror = function(evt: Event) {
  console.log('ERROR: ');
  console.log(evt);
};

interface UploadSinoRequest {
  total: number;
  theta: number;
  sino_row: number[];
}

export function send(req: UploadSinoRequest) {
  ws.send(JSON.stringify(req));
}
