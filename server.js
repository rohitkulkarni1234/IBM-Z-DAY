const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static HTML and CSS files
app.use(express.static('public'));

// Sample data for stress level to mental health condition mapping
const mentalHealthConditions = [
    { minStress: 60, maxStress: 80, condition: 'Normal Stress Level' },
    { minStress: 81, maxStress: 100, condition: 'Mild Stress - Consider Relaxation Techniques' },
    { minStress: 101, maxStress: 120, condition: 'Moderate Stress - You Might Be Experiencing Anxiety' },
    { minStress: 121, maxStress: 140, condition: 'High Stress - Consult a Therapist' },
    { minStress: 141, maxStress: 200, condition: 'Severe Stress - Immediate Medical Attention Required' }
];

// Handle form submission
app.post('/submit', (req, res) => {
    const { sleep,physicalActivity,socialSupport,stressLevel } = req.body;

    // Find mental health condition based on stress level
    const stress = parseInt(stressLevel);
    const condition = mentalHealthConditions.find(c => stress >= c.minStress && stress <= c.maxStress);

    if (condition) {
        return res.json({
            message: 'Form submitted successfully!',
            possibleCondition: condition.condition
        });
    } else {
        return res.json({
            message: 'Form submitted, but stress level is out of range.',
            possibleCondition: 'Unknown Stress Level'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});