# Contributing

This is a [Next.js](https://nextjs.org/) project.

## Getting Started

There are a few ways to start developing:

1. Develop in Docker
2. Develop natively
3. Develop in codespaces (not covered)

It is recommended to develop in Docker, as developing natively requires more setup.

(Optional) Depending on your editor, you can install the [Prettier plugin](https://prettier.io/docs/en/editors).
This will make sure the entire team uses the same code style.

## Develop in Docker

### Requirements

-   [Docker](https://www.docker.com)
-   [git](https://git-scm.com/)
-   [VSCode](https://code.visualstudio.com/) (optional but recommended; used for dev containers)
-   [GitHub Desktop](https://desktop.github.com/) (optional but recommended; excellent GUI for git)

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

Inside the container, run one of:

-   `turbo prepare`
-   `pnpm prepare`
-   `npm run prepare`

This will setup githooks for linting.

Continue to "Running NextJS".

## Develop natively

### Requirements

-   [git](https://git-scm.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [NodeJS v20 LTS](https://nodejs.org)
-   [pnpm](https://pnpm.io/) (optional but recommended; makes NodeJS projects take up less space)
-   [turborepo](https://turbo.build/repo) (optional for now; used for ordering build scripts and caching)
-   [GitHub Desktop](https://desktop.github.com/) (optional but recommended; excellent GUI for git)

First make sure you have the LTS version of NodeJS.
You can get the installer from [NodeJS's site](https://nodejs.org).

You will also need to install [PostgreSQL](https://www.postgresql.org/download/).

Optional: Install [pgAdmin](https://www.pgadmin.org/) to help manage the database.

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

Run `pnpm install` or `npm install` to install the dependencies.

Run one of:

-   `turbo prepare`
-   `pnpm prepare`
-   `npm run prepare`

This will setup githooks for linting.

Continue to "Running NextJS".

## Running NextJS

To run the development server, run one of:

-   `turbo dev`
-   `pnpm dev`
-   `npm run dev`

Open up http://localhost:3000 in your browser to see the site.

## Testing on Mobile

The method for testing on mobile depends on your network and how you are developing.

If your network is unusual (like subnets or privacy rules), then you may not be able to connect directly and may have to use a port forwarding service.

### To connect directly

First, find your internal IP address.

-   On Windows, this can be done via the `ipconfig` command; just find your primary adapter and the IPv4 address for it.
-   On MacOS and Linux, this can be done via the `ifconfig` command (`ifconfig | grep "inet " | grep -v 127.0.0.1` may make this easier); then just look for an IPv4 address.

Alternatively, you can look in your system's internet settings for it.

Next, make sure the mobile device you are testing on is connected to the same network and has data disabled.

Then, simply navigate to the IP address (with the port 3000, so something like `198.168.0.1:3000`) in a browser and voila, you can now test the site on your phone.

### To connect via a port-forwarding service

If you are developing natively and with VSCode, you can use [VSCode's built-in port-forwarding service](https://code.visualstudio.com/docs/editor/port-forwarding).

However, if you are using Docker, VSCode's built-in port-forwarding won't work, since, as of writing, it doesn't support forwarding remote connections.

Instead, you can use another popular service: [ngrok](https://ngrok.com/).

Sign-up on their site, then [download](https://ngrok.com/download) and install the application.

Once installed, login with a token from the dashboard: `ngrok config add-authtoken <TOKEN>`.

Finally, you can forward the application by running: `ngrok http 3000`.
You will then see a line called "Forwarding", which will have the remote URL you can use to view on mobile.
(This URL can be quite long, so I recommend opening it on your computer and sending it to your device via the browser; most browsers have a send-to-device option when you right-click a page)

## Issues with Git

When developing in a container, using GitHub desktop from the host might have issues when running the precommit checks.

Instead, use the terminal in the container to commit files: `git commit -m "<YOUR MESSAGE>"`
