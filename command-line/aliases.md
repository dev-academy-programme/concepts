# Command Line Aliases

If you have a command you run often, you might like to make a short-cut name for it.

Examples of commands that might be useful to have short-hands for:

- `git checkout origin master`
- `cd ~/projects/EDA`
- `git log --graph --stat`
- `ps auxw | grep ...`  (where ... is some process you're searching for)

This is how you create them:

```sh
alias gcm="git checkout origin master"
alias eda="cd ~/workspace"
alias glog="git log --graph --stat"
alias findps="ps auxw | grep"
```

Now to run `git checkout origin master` you can simply type `gcm` by itself.

To make sure your aliases are available after you reboot, you can create them in your `~/.zshrc` if you're using the Zsh shell or in your `~/.bashrc` file if you're using the Bash shell.

To see which aliases have already been created, run the `alias` command by itself. If you're looking for a specific alias, you can `grep` it. For example, to look for an alias that has _checkout_ somewhere in it, try this:

```sh
alias | grep checkout
```

