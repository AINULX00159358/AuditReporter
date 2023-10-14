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
//    labelNames: ['Latency'],
//   buckets: [0.10, 1, 2, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 10000, 50000]
// })

const latencyMetrics = new Prometheus.Gauge( {
  name: 'e2e_latency_milliseconds',
  help: 'E2E Workflow from Invoice Generation to Closed',
  labelNames: ['Latency']
})

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
  const data = req.body;
  //const latency = data.maxlatency;
  //data.ending - data.starting;
   latencyMetrics.set(data.maxLatency);
  //console.log(" data ", data);
 // latencyMetrics.labels("INVOICEMGR").observe(data.maxLatency);
  res.status(201).end();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
