workflow "Build and Test" {
  resolves = ["GitHub Action for npm"]
  on = "push"
}

action "task" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["task"]
  args = "test"
}

workflow "On PR" {
  on = "pull_request"
  resolves = ["GitHub Action for npm-2"]
}

action "GitHub Action for npm-1" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "GitHub Action for npm-2" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["GitHub Action for npm-1"]
  args = "test"
}
