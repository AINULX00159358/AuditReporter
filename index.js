const express = require('express')
const Prometheus = require('prom-client')
var bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


const port = 3234;

function getRand(max, min){
   return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
}

// const register = new prometheus.Registry();
// register.setDefaultLabels({
//    app: 'InvoiceMgeAudit'
// })
// prometheus.collectDefaultMetrics({ register });

const latencyHistogram = new Prometheus.Histogram({
   name: 'e2e_latency_milliseconds',
   help: 'E2E Workflow from Invoice Generation to Closed',
   labelNames: ['ID'],
   buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 10000, 50000, 100000]
})

//Prometheus.Registry.register(latencyHistogram);

//.registerMetric(latencyHistogram);


setInterval(function() { 
  // latencyHistogram.observe({ ID: 'AUDIT' }, getRand(1000, 100) );
  const nn = getRand(1000, 100);
  console.log(" auditing ", nn)
  latencyHistogram.labels('AUDIT').observe(nn);
  //Prometheus.register.getMetricsAsArray().forEach (x => console.log(x));
  //Prometheus.register.metrics().then(str => console.log(str));
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
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
