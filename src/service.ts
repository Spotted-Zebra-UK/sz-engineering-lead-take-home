import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const PORT = 8081;

const skillWeights: Record<string, number> = {
    'Makes things happen': 2,
    'Develops expertise': 1.5,
    'Analyses information': 3,
};

app.get('/candidate-report/:candidateId', async (req: Request, res: Response) => {
    try {
        const candidateResponse = await axios.get(`https://180c-2a01-4b00-899f-9f00-3922-d130-56f1-bf85.ngrok-free.app/users/${req.params.candidateId}`);
        const candidateData = candidateResponse.data;
        const candidate = {
            id: candidateData.id,
            name: `${candidateData.first_name} ${candidateData.last_name}`,
            email: candidateData.email
        };

        const resultsResponse = await axios.get(`https://180c-2a01-4b00-899f-9f00-3922-d130-56f1-bf85.ngrok-free.app/results?user_id=${req.params.candidateId}`);
        const results = resultsResponse.data;

        let skills = Array<any>();
        let weightedScoreTotal = 0;
        let weightSum = 0;

        for (const result of results) {
            const skillResponse = await axios.get(`https://180c-2a01-4b00-899f-9f00-3922-d130-56f1-bf85.ngrok-free.app/skills/${result.skill_id}`);
            const skill = skillResponse.data;
            const weight = skillWeights[skill.name] || 1;

            weightedScoreTotal += result.percentile_score * weight;
            weightSum += weight;

            skills.push({ 
                id: skill.id, 
                name: skill.name, 
                score: result.percentile_score 
            });
        }

        const totalScore = weightSum > 0 ? weightedScoreTotal / weightSum : 0;

        const report = {
            candidate,
            skills,
            totalScore
        };

        res.send(report);
    } catch (error) {
        res.status(500).send('Error fetching candidate report');
    }
});

app.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
});
