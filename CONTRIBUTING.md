# Contributing

This is a [Next.js](https://nextjs.org/) project.

## Getting Started

There are a few ways to start developing:

1. Develop in Docker
2. Develop natively
3. Hybrid Development (a mix of native and Docker)
4. Develop in a Codespace

It is recommended to develop in Docker, as developing natively requires more setup.
There is also hybrid development, which can offer the performance of native development while making it easier to set up a database instance.

## Develop in Docker

### Requirements

-   [Docker](https://www.docker.com)
-   [Git](https://git-scm.com/)
-   [VSCode](https://code.visualstudio.com/) (optional but recommended; used for dev containers)
-   [GitHub Desktop](https://desktop.github.com/) (optional but recommended; excellent GUI for Git)

First, head over to [Docker's site](https://www.docker.com/get-started/) and download the installer for your system.
Proceed to run it and follow the instructions.
Depending on your system, you may need to install additional software or change system settings to allow Docker to run.

_Optional:_ Install VSCode and/or GitHub Desktop

Fork the repository and clone it to your machine.
This can be done via the `git clone` command or GitHub desktop (Click `Open with GitHub Desktop` from the `Code` dropdown on the GitHub page)

Open the project in the IDE of your choice.

If using VSCode, then install the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension if not already installed.
This will allow you to easily start a container in VSCode.
Just open the command palette (`F1`/`Ctrl+Shift+P`) and run `Reopen in Container`.
(You can also click the `><` button in the bottom left corner to see this option)

If your editor doesn't support the dev container standard, you can use the [dev container CLI](https://github.com/devcontainers/cli).
Otherwise, you can run `docker compose up dev` to run the dev environment.
Note that if you run it directly from Docker, you will have to configure Git from inside the container in order for it to work properly (setup username + email and run `git lfs install`).

_Optional:_ Run `pnpm prepare` to setup githooks for checking the linting and formatting.
When you try to make a commit, it will first check if the code is properly linted and formatted, and if not, return an error.
This will make using Git on the host machine not work properly without NodeJS installed natively, so you will need to use Git from inside the dev container.
You can still use GitHub Desktop to check the status of commits.

If you do not setup githooks, you won't get reminders to lint and format, and will need to remember to do so before committing.

You can fix errors by calling one of:

-   `turbo fix`
-   `pnpm fix`
-   `npm run fix`

(You can also use `fix:lint` and `fix:format` to fix an individual one)

To simply check, call one of:

-   `turbo check`
-   `pnpm check`
-   `npm run check`

(You can also use `check:lint` and `check:format` to check an individual one)

(If you need to recreate the database and file server, say for editing the demo data or schema, you can run `./clean_docker.sh` and rebuild the dev container)

Continue to "Running NextJS".

## Develop natively

### Requirements

-   [Git](https://git-scm.com/)
-   [Git LFS](https://git-lfs.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [NodeJS v20 LTS](https://nodejs.org)
-   [pnpm](https://pnpm.io/) (optional but recommended; makes NodeJS projects take up less space)
-   [turborepo](https://turbo.build/repo) (optional for now; used for ordering build scripts and caching)
-   [GitHub Desktop](https://desktop.github.com/) (optional but recommended; excellent GUI for Git)

Before setting up the project, make sure you have Git and Git LFS installed.
After installing Git LFS, make sure it is setup for your user account by running `git lfs install`.

First make sure you have the LTS version of NodeJS.
You can get the installer from [NodeJS's site](https://nodejs.org).

You will also need to install [PostgreSQL](https://www.postgresql.org/download/) and set it up.

_Optional:_ Install [pgAdmin](https://www.pgadmin.org/) to help manage the database.

_Optional:_ If you want to have multiple versions of NodeJS, then you want a NodeJS version manager.
NodeJS doesn't provide this, so you would need to find an unofficial one (NVM is a popular option).

_Optional:_ Depending on your editor, you can install the [Prettier plugin](https://prettier.io/docs/en/editors).
This will make sure the entire team uses the same code style.

Ensure pnpm is installed to share dependencies across projects.
Just run `corepack enable` to enable pnpm on your system (the project specifies the version to use, so there is no need to prepare it).

_Optional:_ Install turborepo to cache tasks.
As of writing, turborepo isn't being used, but when the project grows, this will make development faster.
Just run `pnpm install turbo --global`.

Fork the repository and clone it to your machine.
This can be done via the `git clone` command or GitHub desktop (Click `Open with GitHub Desktop` from the `Code` dropdown on the GitHub page)

Run `pnpm install` to install the dependencies.

Then run `pnpm prepare` or `npm run prepare` to setup githooks for checking the linting and formatting.

To lint and format, you can call one of:

-   `turbo fix`
-   `pnpm fix`
-   `npm run fix`

(You can also use `fix:lint` and `fix:format` to fix an individual one)

To simply check, call one of:

-   `turbo check`
-   `pnpm check`
-   `npm run check`

(You can also use `check:lint` and `check:format` to check an individual one)

Continue to "Running NextJS".

## Hybrid Development

If, for some reason, you are having trouble with Docker's performance (E.g. the filesystem can be slower on some platforms),
and don't want to go through the trouble of setting up a database, you can run the database in Docker and the dev server natively.

To do this, install Docker and NodeJS, as well as any extra software you would like, just as described in the previous sections (except for Postgres and pgAdmin).

Fork and clone the repository.
Run `pnpm install` to install the dependencies.
Then run `pnpm prepare` or `npm run prepare` to setup githooks for checking the linting and formatting.

Then, run the database software by calling `docker compose up db`.
You can also run the admin tool by calling `docker compose up db_gui`.

Continue to "Running NextJS".

## Develop in Codespace

To run in a Codespace, simply open it (on GitHub, click `Code > Codespaces > Create Codespace`).

When you start the dev server, the Codespace will automatically forward port 3000.
If it doesn't, you can go to the port tab to manually forward port 3000 and open it up in your browser.
(You can also forward port 4000 here to access pgAdmin)

Continue to "Running NextJS".

## Running NextJS

To run the development server, run one of:

-   `turbo dev`
-   `pnpm dev`
-   `npm run dev`

Open up http://localhost:3000 in your browser to see the site.

## Managing Postgres

When you run the dev container, an instance of pgAdmin, a management tool for Postgres, is also started.

You can go to http://localhost:4000 in your browser to see the management dashboard.

To sign in, you can use the credentials `admin@example.org` (username) and `example` (password).
This may be changed in the future in favor of an `.env` file.

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

## Git Troubleshooting

When developing in a container, you may run into some issues with Git.

Git won't work from the host with githooks enabled unless you set up NodeJS on the host machine.
Instead, you will need to use commands or VSCode's GUI to interact with Git.

If you get an error when trying to commit about missing a username and/or email, it means you need to set those on your host.
This can be done by installing GitHub Desktop or using the following commands:

-   `git config --global user.name <USERNAME>`
-   `git config --global user.email <EMAIL>` (If you want a private email, check for the generated email under your GitHub account)

If you get an error about missing credentials, it means you weren't signed in on the host.
You can use GitHub Desktop, GitHub CLI or another credential manager to set up the credentials.

Make sure to rebuild the dev container after reconfiguring.

If you want a GUI, VSCode provides built-in tools for source control and extensions as well.

### Using Git outside of a container

If you have NodeJS installed, it is possible to use Git with githooks outside of the container.

Just know, it may mean calling `pnpm install` (pnpm will make this faster) when switching between the two, since Next.js uses native tooling.

You may also have to install `lint-staged` on the host: `pnpm install -g lint-staged`.

On Windows, make sure Git's bash is being used and not some other installation, like from MinGW or WSL.
You can put `C:/Program Files/Git/bin` first in the path to ensure this.

### Terminal Commands

-   Stage all changes: `git add .`
-   Commit all changes: `git commit -m "<YOUR MESSAGE>"`
-   Push commits: `git push`

### Issues with githooks

On Windows the executable bit of scripts in `.husky/` won't get set, causing issues when running on Linux.
If Git doesn't execute the githook, it's likely because of that.
This can be fixed by running `chmod ug+x .husky/*`.
