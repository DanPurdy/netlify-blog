---
path: using-private-github-packages-in-github-workflows
date: 2021-01-31T14:59:49.781Z
title: Using private Github packages in Github workflows
description: A quick look at how to use private packages publishd to the Github
  package registry in Github workflows
---
In 2019 Github launched their package registry as an alternative to current package registries such as [NPM](https://www.npmjs.com/) for JavaScript and RubyGems for... Ruby...

Github packages allows you to publish private or public packages for free. In this article we're going to be looking at the private packages for JavaScript side of things and how you can use them in your other project workflows and the current downsides you may encounter. Github packages alongside the recent addition of Github Workflows means you can now manage the code repository, build your packages and publish all within the same ecosystem without need for any third party CI system or package registry, and the best part - it's free, well until you burn past the limits that Github sets, at the time of writing the Github free tier allowed

* Unlimited public/private repositories
* 2,000 Actions minutes/month (private repositories, public is free and unlimited)
* 500MB of GitHub Packages storage (again for private, public is free and unlimited)

That is more than enough to get you going on some of your projects whereas NPM will cost you $7/month for private packages, which is still cheaper than some of the previous options you had for hosting private packages such as Gemfury.

## How to install a Github hosted package in your project

Adding the ability for your project to use public Github packages is incredibly easy. First you'll need to create a `.npmrc` file at the same level as your package.json, in it you'll need to add the URL for your package requests to be routed to

```
//npm.pkg.github.com/:_authToken=${GITHUB_PKG_AUTH_TOKEN}

registry=https://npm.pkg.github.com/OWNER
```

The first line above is required to authenticate you, we'll look at this next but just know that for all public and private pacakges you'll need to use a Github personal access token to authenticate. This will allow you to publish/delete/install packages etc.

To setup a personal access token you'll need to login to Github and go to your [Personal access tokens settings](https://github.com/settings/tokens). Here you'll want to create a new token with only the required permissions. If you don't plan to publish or manage your own packages you can just set the `read:packages` scope but if you will then you'll need to also add the `write:packages` scope - simple enough.

![The github personal access token scopes page showing scopes set for read packages ability](screenshot-2021-01-31-at-15.43.12.png "Github personal access token settings")

Once you've created your token the best thing to do is to set it up as a variable in your environment, within your bash profile or zsh profile etc. Ive added the steps for ZSH using Vim below  FINISH

If you're using mixing and matching repositories and also different packages from different Github users/organisations or if you're using Yarn then it's best to modify your `.npmrc` to scope your registry items to your org/user and change the url a little:

```
//npm.pkg.github.com/:_authToken=${GITHUB_PKG_AUTH_TOKEN}

@OWNER:registry=https://npm.pkg.github.com/
```

Notice the name of the owner is now not in the url but set as the scope of the registry url at the start of the line, this will allow you to use Npm or yarn correctly without any changes or need for a separate `.Yarnrc` file.
