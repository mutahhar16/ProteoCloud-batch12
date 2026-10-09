# ProteoCloud Institute

A React + TypeScript + Vite frontend for protein visualization, cardiac ECG simulation, and cloud-storage UI demonstrations.

## Requirements

- Node.js 22 LTS recommended (Vite 8 requires a recent supported Node release)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (the project configures port 3000).

## Build and check

```bash
npm run build
npm run lint
npm run preview
```

The production build is written to `dist/`.

## Deploy to AWS Amplify Hosting

1. Push this project to a GitHub repository owned by the project owner.
2. In the owner's AWS account, open **AWS Amplify** and choose **New app → Host web app**.
3. Connect GitHub, authorize the intended repository, and select the deployment branch (usually `main`).
4. Amplify should detect `amplify.yml`; confirm the build output directory is `dist` and deploy.
5. Open the Amplify-provided HTTPS URL and test the main sections.

The `amplify.yml` file configures dependency installation, `npm run build`, and publishing `dist/`.

## Important: AWS integration status

The current S3 and GitHub controls in the UI are demonstration/mock flows. They update frontend state and do not perform real AWS S3 API calls, upload objects to S3, or push commits to GitHub. Do not enter AWS access keys or GitHub tokens into the webpage. Real storage integration needs a secure design, typically Cognito or another identity provider plus a backend/API or tightly scoped presigned upload URLs.

## Environment variables

`.env.example` is a template only. Do not commit real secrets. Vite-exposed variables are bundled into browser code, so never put AWS secret access keys or private API credentials in `VITE_*` variables.
