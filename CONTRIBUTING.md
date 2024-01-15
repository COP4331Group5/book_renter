# Contributing

This is a [Next.js](https://nextjs.org/) project.

## Getting Started

There are a few ways to start developing:

1. Develop in Docker
2. Develop natively
3. Develop in codespaces (not covered)

As of writing, it is fine to develop natively, since there is only the NodeJS project.
However, if parts of the project are separated into different services, Docker will make it easier to develop.

## Develop in Docker

### Requirements
- [Docker](https://www.docker.com)
- [git](https://git-scm.com/)
- [VSCode](https://code.visualstudio.com/) (optional but recommended; used for dev containers)
- [GitHub Desktop](https://desktop.github.com/) (optional but recommended; excellent GUI for git)

First, head over to [Docker's site](https://www.docker.com/get-started/) and download the installer for your system.
Proceed to run it and follow the instructions.
Depending on your system, you may need to install additional software or change system settings to allow Docker to run.

Optional: Install VSCode and GitHub Desktop

Fork the repository and clone it to your machine.
This can be done via the `git clone` command or GitHub desktop (Click `Open with GitHub Desktop` from the `Code` dropdown on the GitHub page)

Open the project in the IDE of your choice.

If using VSCode, then install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension.
This will allow you to easily start a container in VSCode.
Just open the command palette (`F1`/`Ctrl+Shift+P`) and run `Reopen in Container`.
(You can also click the `><` button in the bottom left corner to see this option)

For other editors, run `docker compose up dev` to run the development container.

Continue to "Running NextJS".

## Develop natively

### Requirements
- [git](https://git-scm.com/)
- [NodeJS v20 LTS](https://nodejs.org)
- [pnpm](https://pnpm.io/) (optional but recommended; makes NodeJS projects take up less space)
- [turborepo](https://turbo.build/repo) (optional for now; used for ordering build scripts and caching)
- [GitHub Desktop](https://desktop.github.com/) (optional but recommended; excellent GUI for git)

First make sure you have the LTS version of NodeJS.
You can get the installer from [NodeJS's site](https://nodejs.org).

Optional: If you want to have multiple versions of NodeJS, then you want a NodeJS version manager.
NodeJS doesn't provide this, so you would need to find an unofficial one (NVM is a popular option).

Optional: Install pnpm to share dependencies across projects.
For this single project, it isn't necessary, but if you ever decide to make more projects, this will help save disk space.
Just run `corepack enable` and `corepack prepare pnpm@latest --activate` to enable pnpm on your system.

Optional: Install turborepo to cache tasks.
As of writing, turborepo isn't being used, but when the project grows, this will make development faster.
Just run `npm install turbo --global` (replace with `pnpm` if installed).

Fork the repository and clone it to your machine.
This can be done via the `git clone` command or GitHub desktop (Click `Open with GitHub Desktop` from the `Code` dropdown on the GitHub page)

Continue to "Running NextJS".

## Running NextJS

To run the development server, run on of:
- `turbo dev`
- `pnpm dev`
- `npm run dev`

Open up `http://localhost:3000` in your browser to see the site.
