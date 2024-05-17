# Setup

1. Download `k6` tool locally from https://k6.io/docs/get-started/installation/
2. Once k6 is installed and ready to run:
   a. We need to setup the rudder-server locally with `npx ts-node src/index.ts`. This command needs to be executed from the root of `rudder-transformer` in a separate window.
   b. Once the server is up and ready, execute the loadtest using, `k6 run loadtest.js`
3. The outcome should be somewhat in following format:

```
     ✓ 200OK output

     █ setup

     checks.........................: 100.00% ✓ 11       ✗ 0
     data_received..................: 35 kB   3.5 kB/s
     data_sent......................: 33 kB   3.3 kB/s
     http_req_blocked...............: avg=1.09ms   min=431µs   med=831µs  max=3ms     p(90)=1.92ms p(95)=2.46ms
     http_req_connecting............: avg=943.36µs min=278µs   med=721µs  max=2.79ms  p(90)=1.8ms  p(95)=2.3ms
   ✓ http_req_duration..............: avg=6.46ms   min=1.95ms  med=3.75ms max=28.66ms p(90)=7.3ms  p(95)=17.98ms
       { expected_response:true }...: avg=6.46ms   min=1.95ms  med=3.75ms max=28.66ms p(90)=7.3ms  p(95)=17.98ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 11
     http_req_receiving.............: avg=94.54µs  min=55µs    med=88µs   max=183µs   p(90)=117µs  p(95)=149.99µs
     http_req_sending...............: avg=176.18µs min=46µs    med=137µs  max=390µs   p(90)=385µs  p(95)=387.5µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s     max=0s      p(90)=0s     p(95)=0s
     http_req_waiting...............: avg=6.19ms   min=1.84ms  med=3.43ms max=28.52ms p(90)=7.08ms p(95)=17.8ms
     http_reqs......................: 11      1.098727/s
     iteration_duration.............: avg=7.83ms   min=25.83µs med=6.23ms max=29.6ms  p(90)=9.01ms p(95)=18.29ms
     iterations.....................: 11      1.098727/s
     vus............................: 100     min=100    max=100
     vus_max........................: 100     min=100    max=100
```

The http_req_duration section should give us the actual result. In above section, it took p(95) `17.95ms` for the batch to be validated.

4. The above test result is for a batch validation of 1 event. This can be changed by changing `batchSize` variable in file `loadtest.js`
