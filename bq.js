// Imports the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

// Your Google Cloud Platform project ID
const projectId = 'perfect-garden-208210';

// Creates a client
const bigquery = new BigQuery({
  projectId: projectId,
});

// The name for the new dataset
const datasetName = 'ec2';


// Creates the new dataset
bigquery.tables.list(datasetName)
