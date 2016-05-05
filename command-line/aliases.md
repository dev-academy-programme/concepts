If you have a command you run often, you might like to make a short-cut name for it.

Examples of commands that might be useful to have short-hands for:
- `git checkout origin master`
- `cd ~/projects/EDA`
- `git log --graph --stat`
- `ps auxw | grep ...`  (where ... is some process you're searching for)

You can create aliases in your `~/.bashrc` (or `~/.zshrc` file if you're using zsh)

They look like this :

```bash
alias gcom="git checkout origin master"
alias eda="cd ~/projects/EDA"
alias glog="git log --graph --stat"
alias findps="ps auxw | grep"
```