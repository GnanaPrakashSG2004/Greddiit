# <center> Greddiit

## <ins>Instructions to run the website on local machine:</ins>
- Run `docker-compose build` in the current directory
- After that run `docker-compose up` in the same directory
- Now, open `http://localhost:8080/`
- To stop the docker, run `docker-compose down` in the same directory
<hr>

## <ins>Routes:</ins>
- `/signin`: For user signin
- `/signup`: For user signup
- `/profile`: For seeing user profile and editing
<hr>

- `/mysubgreddiits`: For list of subgreddiits the user is moderator of and to create a new subgreddiit
- `/mysubgreddiits/:id`: Individual mysubgreddiit page
- `/mysubgreddiits/:id/users`: Users of  mysubgreddiit
- `/mysubgreddiits/:id/reports`: Reports of mysubgreddiit
- `/mysubgreddiits/:id/stats`: Stats of mysubgreddiit
- `/mysubgreddiits/:id/requests`: Join requests of mysubgreddiit
<hr>

- `/allsubgreddiits`: For list of all subgreddiits
- `/allsubgreddiits/:id`: For individual subgreddiit page
<hr>

- `/savedposts`: For saved posts of user
<hr>

## <ins>Assumptions regarding implementation</ins>
- The whole subgreddiit info is clickable which when clicked redirects to the subgreddiit page
- The reports on which there was no action performed will appear before those that have been acted upon
- When posts are deleted from reports, that report is removed from the list of reports
- For sorting of subgreddiits in ascending/descending order, name of subgreddiit is used
- Only one of ascending and descending can be chosen at a time while sorting
- User cannot report posts posted by himself or by the moderator
- Email must be valid to check the working of email bonus
- User is allowed to either upvote or downvote on a post at a time
  - Clicking upvote(downvote) on an already upvoted(downvoted) post removes the upvote(downvote)
- Entering password while editing the profile page changes the user's password to the entered password
- Some pages require reloading to show the updated information after performing some action
- Errors on few pages are shown in the console when a request fails
<hr>