import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // vus: 10,
  // duration: '30s',
  stages: [
    { duration: '30s', target: 20, rate: 200 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const res = http.get(`http://localhost:3001/products/${Math.floor(Math.random() * 1000 + 1)}`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}
