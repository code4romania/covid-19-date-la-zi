## Steps to do after creating a new repo from this template

1. Replace repo name slug in links from README.md and CONTRIBUTING.md

```shell
sed -i 's/standard-repo-template/NEW_REPO_SLUG_HERE/g' README.md
sed -i 's/standard-repo-template/NEW_REPO_SLUG_HERE/g' .github/CONTRIBUTING.md
```

2. Put repo name in the title from README.md and CONTRIBUTING.md

```shell
sed -i 's/Project name/NEW_PROJECT_NAME_HERE/g' README.md
sed -i 's/Code for Romania standard project/NEW_PROJECT_NAME_HERE -/g' .github/CONTRIBUTING.md
```

3. Update appropriate styleguide link in CONTRIBUTING.md under *Best practices - Coding best practices*

4. Go to settings and check the Sponsorships (Sponsorships help your community know how to financially support this repository.) checkbox :wink:

5. Delete this file :smile:
