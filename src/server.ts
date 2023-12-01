// NOTE: DO NOT TOUCH THIS CODE!
import express, { Request, Response } from 'express';

const app = express();
const PORT = 8080;

// Hardcoded candidate data
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Result {
  id: number;
  percentile_score: number
  skill_id: number;
  user_id: number;
}

const users: Record<number, User> = {
  1: { id: 1, first_name: "Ariel", last_name: "Grimes", email: "ariel.grimes.355@spottedzebra.co.uk" },
  2: { id: 2, first_name: "Perla", last_name: "Moen", email: "perla.moen.271@spottedzebra.co.uk" },
  3: { id: 3, first_name: "Santo", last_name: "Murray", email: "santo.murray.1270@spottedzebra.co.uk" },
  4: { id: 4, first_name: "Kevin", last_name: "Littel", email: "kevin.littel.319@spottedzebra.co.uk", },
  5: { id: 5, first_name: "Derick", last_name: "Howell", email: "derick.howell.1288@spottedzebra.co.uk" },
  6: { id: 6, first_name: "Rocky", last_name: "Waelchi", email: "rocky.waelchi.1626@spottedzebra.co.uk" },
  7: { id: 7, first_name: "Cletus", last_name: "Upton", email: "cletus.upton.1760@spottedzebra.co.uk" },
  8: { id: 8, first_name: "Fred", last_name: "McGlynn", email: "fred.mcglynn.386@spottedzebra.co.uk" },
  9: { id: 9, first_name: "Coreen", last_name: "Lindgren", email: "coreen.lindgren.1323@spottedzebra.co.uk" },
  10: { id: 10, first_name: "Leo", last_name: "Jakubowski", email: "leo.jakubowski.1385@spottedzebra.co.uk" },
  11: { id: 11, first_name: "Ferdinand", last_name: "Cummerata", email: "ferdinand.cummerata.768@spottedzebra.co.uk" }
};

const skills: Record<number, Skill> = {
  1: { id: 1, name: "Makes things happen" },
  2: { id: 2, name: "Develops expertise" },
  3: { id: 3, name: "Analyses information" }
}

const results: Record<number, Result> = {
  1: { id: 1, percentile_score: 0.25512958, skill_id: 1, user_id: 1 },
  2: { id: 2, percentile_score: 0.19011813, skill_id: 3, user_id: 1 },
  3: { id: 3, percentile_score: 0.2730345, skill_id: 1, user_id: 4 },
  4: { id: 4, percentile_score: 0.5737756, skill_id: 2, user_id: 3 },
  5: { id: 5, percentile_score: 4.0075004e-2, skill_id: 3, user_id: 2 },
  6: { id: 6, percentile_score: 0.9304826, skill_id: 3, user_id: 3 },
  7: { id: 7, percentile_score: 0.84468013, skill_id: 3, user_id: 4 },
  8: { id: 8, percentile_score: 0.64928436, skill_id: 3, user_id: 7 },
  9: { id: 9, percentile_score: 0.44219416, skill_id: 1, user_id: 3 },
  10: { id: 10, percentile_score: 0.61482215, skill_id: 2, user_id: 7 },
  11: { id: 11, percentile_score: 0.7999629, skill_id: 2, user_id: 1 },
  12: { id: 12, percentile_score: 0.2829247, skill_id: 3, user_id: 5 },
  13: { id: 13, percentile_score: 1.6765058e-2, skill_id: 3, user_id: 11 }
}

// Simulate delay and error rate
const simulateDelayAndError = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject('Error occurred');
      } else {
        resolve();
      }
    }, 2000);
  });
};

app.get('/users', (req: Request, res: Response) => {
  res.json(Object.values(users));
});

app.get('/users/:userId', (req: Request, res: Response) => {
  const user = users[Number(req.params.userId)];
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/skills', (req: Request, res: Response) => {
  res.json(Object.values(skills));
});

app.get('/skills/:skillId', async (req: Request, res: Response) => {
  const skill = skills[Number(req.params.skillId)] || [];
  if (skill) {
    res.json(skill);
  } else {
    res.status(404).send('Skill not found');
  }
});

app.get('/results', async (req: Request, res: Response) => {
  try {
    await simulateDelayAndError();
    let userId = req.query.user_id;
    let skillId = req.query.skill_id;
    let filteredResults = Object.values(results);

    if (userId) {
      filteredResults = filteredResults.filter(result => result.user_id == Number(userId));
    }
    if (skillId) {
      filteredResults = filteredResults.filter(result => result.skill_id == Number(skillId));
    }

    res.json(filteredResults);
  } catch (error) {
    res.status(408).send('RequestTimeOut');
  }
});


app.get('/results/:resultId', async (req: Request, res: Response) => {
  try {
    await simulateDelayAndError();
    const result = results[Number(req.params.resultId)];
    if (result) {
      res.json(result);
    } else {
      res.status(404).send('Result not found');
    }
  } catch (error) {
    res.status(408).send('RequestTimeOut');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
