const express = require('express')
const Prometheus = require('prom-client')
var bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const port = 3000;

function getRand(max, min){
   return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
}


// const latencyMetrics = new Prometheus.Histogram({
//    name: 'e2e_latency_milliseconds',
//    help: 'E2E Workflow from Invoice Generation to Closed',
//    labelNames: ['ID'],
//   buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 10000, 50000, 100000]
// })

const latencyMetrics = new Prometheus.Gauge( {
  name: 'e2e_latency_milliseconds',
  help: 'E2E Workflow from Invoice Generation to Closed',
  labelNames: ['Latency']
})

setInterval(function() { 
  const nn = getRand(1000, 100);
  latencyMetrics.set(nn);
} , 2000)

console.log("ffffffffffffffffffffffffffffffffffff");

app.get('/', (req, res) => {
  res.end('OK');
 })


// Metrics endpoint
app.get('/metrics', async  (req, res) => {
  try {
    res.set('Content-Type', Prometheus.register.contentType);
		res.end(await Prometheus.register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
})

app.post('/audit', (req, res) => {
  console.log('receiving data ...');
  console.log('body is ',req.body);
  const data = req.body;
  const latency = data.ending - data.starting;
  latencyMetrics.set(latency);
  res.status(201).end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
