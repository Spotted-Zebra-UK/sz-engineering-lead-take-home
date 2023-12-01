# Engineering Lead Take-Home Assignment

## Overview

Welcome to the Spotted Zebra Engineering Lead take-home assignment. This task is designed to assess your technical skills, problem-solving abilities, and decision-making process in a real-world context.

## Objective
Your primary goal is to refactor and optimize a Backend-for-Frontend (BFF) service (`service.ts`). The BFF is currently set up to aggregate data from a backend service, but faces performance issues and reliability concerns.

The backend service has known issues, particularly with the `/results` endpoint:
- It fails approximately 30% of the time.
- Response times average around 2000 ms.

Your task is to refactor `service.ts` to ensure that the frontend can receive a response in less than 300 ms, while handling the backend's unreliability and performance issues.

## Time Frame
You have up to three hours to complete this assignment.

## Requirements
- **GitHub Repository:** [Spotted Zebra Engineering Lead Take-Home](https://github.com/Spotted-Zebra-UK/sz-engineering-lead-take-home.git)
- **Technologies:** Node.js, TypeScript, Yarn, Axios
- Ensure Node.js and Yarn are installed on your system.

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Spotted-Zebra-UK/sz-engineering-lead-take-home.git
   cd sz-engineering-lead-take-home
   ```

2. **Install Dependencies:**
   ```bash
   yarn install
   ```

## Running the Service
1. **Start the BFF Service:**
   ```bash
   yarn start
   ```

2. **Local Server (Optional):**
   A `server.ts` file is provided for local testing. It simulates the backend and can be used for further experimentation.

## Assignment Instructions
- **Refactor `service.ts`:** Make any changes you deem necessary to optimize performance and error handling.
- **Frontend Response Time:** Ensure the frontend receives responses in under 300 ms.
- **Code Quality:** Focus on making the outcome of `service.ts` production-ready. Clean, efficient, and maintainable code is crucial.
- **Freedom to Redesign:** Feel free to redesign and rewrite any part of `service.ts`, including endpoints and schemas.
- **Do Not Alter `server.ts`:** Changes to `server.ts` are not allowed in your final submission. It is provided for local testing only.

## Additional Deliverables
Along with your refactored code, include a `README.md` file with the following:
- **Improvements:** Detail any additional improvements you would have made with more time, ordered by importance.
- **Detailed Explanation:** Provide a thorough explanation of your changes and decision-making process.

## Submission
Submit your solution as instructed by the hiring team. Include the additional `README.md` file with your submission.
