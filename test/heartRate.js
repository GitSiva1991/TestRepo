const fs = require('fs');
describe('Calculate the HeartRate Measurements For Each day', () => {
    it('Collect and calculate the HeartRate Measurements', () => {
        

// Load data from JSON file
const rawData = fs.readFileSync('C:/Users/Gangadhar/Downloads/TestScript/heartRate.json');
const data = JSON.parse(rawData);

// Group measurements by date
const measurementsByDate = {};

data.forEach(entry => {
    const date = entry.start_time.substring(0, 10); // Extract date part
    if (!measurementsByDate[date]) {
        measurementsByDate[date] = [];
    }
    measurementsByDate[date].push({
        bpm: entry.bpm,
        end_time: entry.end_time
    });
});

// Calculate statistics for each day
const outputData = [];
for (const date in measurementsByDate) {
    const measurements = measurementsByDate[date].map(entry => entry.bpm);
    const minBpm = Math.min(...measurements);
    const maxBpm = Math.max(...measurements);
    const medianBpm = median(measurements);
    const lastMeasureDate = measurementsByDate[date][measurementsByDate[date].length - 1].end_time;

    outputData.push({
        "Date": date,
        "Min BPM": minBpm,
        "Max BPM": maxBpm,
        "Median BPM": medianBpm,
        "Last Measure Date": lastMeasureDate
    });
}

// Write output to JSON file
fs.writeFileSync('output.json', JSON.stringify(outputData, null, 2));

console.log("Output has been written to 'output.json'.");

// Median function
function median(values) {
    values.sort((a, b) => a - b);
    const half = Math.floor(values.length / 2);
    if (values.length % 2 === 0) {
        return (values[half - 1] + values[half]) / 2.0;
    } else {
        return values[half];
    }
}

    })
})