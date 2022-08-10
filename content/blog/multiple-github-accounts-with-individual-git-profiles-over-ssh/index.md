---
path: multiple-github-accounts-and-profiles-over-ssh
date: 2022-08-10T18:46:33.797Z
title: Multiple Github accounts with individual git profiles over SSH
description: Sometimes you have a need to connect to multiple Github accounts
  from the same machine which means possibly switching your git config and the
  SSH key you use with git. We can modify our ssh and git config to make this as
  easy as possible and not have to think about it.
---
Connecting to multiple Github accounts from your machine is one of those things you don't really think about until you need it. Perhaps you have a work account and a personal account that you don't want to mix. Maybe you're using a separate account to commit to certain open source projects to keep your personal details private. There are many reasons why but very little information on how. 

You have your work SSH key how do you get it so that your personal projects can use a different SSH key and never shall the two accounts cross!

Thankfully it's actually incredibly easy. I'll share below how I have this setup now to manage working on certain projects with independent configs.

## Setup multiple gitconfig's

First off let's tackle the issue of your gitconfig and separating your identities, open up you gitconfig

`vi ~/.gitconfig`

It should look something like the following

```bash
[user]
        email = example@example.com
        name = Dan Purdy
[init]
        defaultBranch = main
[core]
        excludesFile = /Users/dan/.gitignore
[pull]
        rebase = true
```

When you commit in git, your gitconfig will determine the details assigned to your commits. What happens though if we want to commit to certain projects with our work email address? Let's create a new gitconfig for your work profile and ensure git uses that.

`vi ~/.gitconfig-work`

add the following with your details

```bash
[user]
        email = example@work-email.com
        name = Dan Purdy
[init]
        defaultBranch = main
[core]
        excludesFile = /Users/dan/.gitignore
[pull]
        rebase = true
```

next create a personal gitconfig

`vi ~/.gitconfig-personal`

Copy the contents again as above but this time add your personal name / email address.

Finally let's update your main gitconfig to tell git which profile to use. For this step you can arrange your projects however you like but i have a work folder and a personal folder that I keep all of my repositories in which you can see defined on line 1 and 4. Make sure to update as required for your directory structure.

```bash
[includeIf "gitdir:~/workspace/personal/"]
        path = ~/.gitconfig-personal

[includeIf "gitdir:~/workspace/work/"]
        path = ~/.gitconfig-work
```

What we've done here is told git that if the gitdir or repo that we are working on currently lives within our personal directory then user our personal config, similarly if we're working within our work directory then use our work gitconfig. 

Great! Simple to setup and easy to maintain and extend as and when you need it. Next we'll tackle the independent SSH keys for these accounts.

## Setup multiple SSH Keys

Firstly I'll assume you have no ssh keys setup at all. Follow the Github documentation on setting these up [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent), name one key personal-github and the other work-github. You can change these names as you see fit, just make sure you can differentiate between them.

Next you'll want to visit your personal Github account and go to your [Github SSH keys](https://github.com/settings/keys) settings where you'll add your `personal-github.pub` key, save that. Logout of your personal Github account and repeat the same step with your work account but this time you'll add your `work-github.pub` key. 

Now comes the part where we tell your machine which ssh key to use and for what projects.

`vi ~/.ssh/config`

If you followed the steps for setting up your Github keys you should see something like the following

```bash
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/personal-github
```

The important part here is the host - basically this config is saying use this personal-github key for any host that you wish to connect via ssh to which in our case would mean you'd only be able to connect to your personal github account.

Update your ssh config file with the following

```bash
# personal
Host github.com
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/personal-github

# work
Host work.github.com
  HostName github.com
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/work-github
```

So we've now setup our ssh config to get our ssh-agent to use our `personal-github` key for `github.com` and our `work-github` key for `work.github.com` but also that `work.github.com` should just resolve to `github.com`, but why?

Well now we can update our work project remotes to `work.github.com` and when you fetch/push/pull/clone etc with any of your work repos you can just substitute `github.com` with `work.github.com` and your ssh-agent will use your work ssh key! Voila!

## Setting up an existing repository to use our work key

Visit one of your work repositories on your machine and run the following

`git remote -v`

you should see something similar to 

```bash
origin	git@github.com:MyWorkProfile/my-repo.git (fetch)
origin	git@github.com:MyWorkProfile/my-repo.git (push)
```

Right now if you were to perform a git action to interact with the remote you would be using your `personal-github` key as the domain is set to `github.com`.

Use the following command to update your remote url to `work.github.com`

`git remote set-url origin git@work.github.com:MyCompany/my-repo.git`

now running `git remote -v` you will see the following

```bash
origin	git@work.github.com:MyWorkProfile/my-repo.git (fetch)
origin	git@work.github.com:MyWorkProfile/my-repo.git (push)
```

And there you go - this repo will now be using your work-github key and able to interact with your company account and if it's within your work directory as we setup above it will also be using your work email address and profile details.

Leave any of your personal repositories alone as the git@github.com host and your personal key will be used for these.