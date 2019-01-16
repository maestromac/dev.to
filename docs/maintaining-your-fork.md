### Maintaining Your Fork

Now that you have a copy of your fork, there is work you will need to do to keep it current.

before you proceed, be sure to add you have add the official repository as your upstream remote.

```
# navigate to your local dev.to directory, add the upstream remote with
$ git remote add upstream https://github.com/thepracticaldev/dev.to.git
```

You have the option to either merge or rebase from Upstream's master. There are no hard rule to which one you should use.

_This instruction assumes you named your forked repo "origin" and the offical repo "upstream"_

#### How to keep your fork's master up to date with origin's master?

It's been a few days/weeks/months since you clicked that forked button. Changes are, lots of new things and bugfixes already took place and it won't be reflected on the forked repository. Here's what you need to do

0. Navigate to your local dev.to's directory
1. Make sure you are on your master's branch (`git checkout master`)
1. Pull down from master! (`git pull upstream master`)
1. The prior step updated your local (your computer) repo's master. While optional, you should have this changes reflected on your github fork (online). Do this with `git push origin master`.

### Wait why do I have to do any of this?

So it's been a while since you clicked that fork button, or it may have been only an hour since. You decided to contribute (thank you very much!), then you found that there's a conflict on this PR. This may not happen all the time, but when it does, it means someone else have done some work on the very same file you just changed (and that their work is already merged to master before yours). If you don't run into any conflict, it still is a good idea to take those changes into account. This is how you incorporate the new unaccounted change to your feature branch.

0. Navigate to your local dev.to's repository.
1. If you have incomplete work, be sure to commit/stash them.
1. Get your master up-to-date with the steps above! ("How to keep your fork's mater up to date").
1. Now that your master reflects the latest change, you have two main choices of how you want to incorporate that into your feature branch.
   a. You can merge that fresh work onto yours. To do this: 1. Navigate back to your feature branch, `git checkout your-feature-branch`) 1. Run `git merge master`. 1. [Resolve the merge confict](https://help.github.com/articles/addressing-merge-conflicts/) if you come across any. 1. Commit the merge. 1. Review your changes. 1. Push your branch up to your repository, `git push origin your-feature-branch`🎉
   b. You can rebase that fresh work into yours. To do this: 1. Navigate back to your feature branch, `git checkout your-feature-branch`) 1. Run `git rebase master` 1. Resolve your rebase conflict if you come into any. 1. Review your changes. 1. Push your branch up to your repository, `git push origin your-feature-branch`🎉

#### Merge

To merge from master

    0.
    1. Navigate to master

#### Rebasing from Upstream

Do this prior to every time you create a branch for a PR:

Make sure you are on the master branch

```
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
```

If your aren't on `master`, resolve outstanding files / commits and checkout the `master` branch

```
$ git checkout master
```

Do a pull with rebase against `upstream`

```
$ git pull --rebase upstream master
```

This will pull down all of the changes to the official `master` branch, without making an additional commit in your local repo.

(Optional) Force push your updated `master` branch to your GitHub fork

```
$ git push origin master --force
```

This will overwrite the `master` branch of your fork.

#### Also see

- [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)
- [The difference between origin and upstream](https://stackoverflow.com/questions/9257533/what-is-the-difference-between-origin-and-upstream-on-github)
