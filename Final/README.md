<h1>WayFinder</h1>

<h3>MapQuest Navigation Web Application</h3>

<h2>Overview</h2>
<p>Displays navigation directions given two locations from the user. Navigation history is saved and can be retrieved by date. 
  Built using HTML, Javascript, CSS, PHP, the MapQuest API for navigation data, and AWS EC2 for temporary hosting and storage. 
  Makes use of phpLiteAdmin (web-based SQLite), JQuery, AJAX, JSON, and Bootstrap. Final project submission for Miami University's 
  CSE 383: Web Application Programming during the Fall 2021 semester. Project requirements emphasize a multi-page/multi-tab web 
  client with a focus on responsive 
  design. The following samples are based on screenshots taken on Safari running on a 15-inch Macbook Pro.
</p>

<h2>Landing Page</h2>
<p>Notice how the section's layout changes as the window's width is shrunk down. The third screenshot is a result of clicking the menu icon shown on the upper-right corner of the second screenshot</p>
<img height="300" src="https://github.com/karimsammouri/MU-CSE-383/blob/main/Final/Screenshots/Landing.png">
<img height="300" src="https://github.com/karimsammouri/MU-CSE-383/blob/main/Final/Screenshots/LandingShrunk.png">
<img height="300" src="https://github.com/karimsammouri/MU-CSE-383/blob/main/Final/Screenshots/LandingShrunkMenu.png">

<h2>Navigator Page</h2>
<p>Includes form where user can enter two locations. Sample usage can be seen below.</p>
<img width="500" src="https://github.com/karimsammouri/MU-CSE-383/blob/main/Final/Screenshots/Navigator.png">

<h2>Navigator Page: Live</h2>
<p>The following is the result of entering "Oxford, OH" and "Cincinnati, OH" as the starting and final locations, respectively. The form also accepts the following input formats: "Oxford,OH"; "oxford,oh"; "Oxford, Ohio"; "Oxford,Ohio"; "oxford,ohio. At the time 
of the following screenshot, the MapQuest API was not supplying the image URLs associated with each navigation instruction the way it's supposed to. When I worked on this project two years ago, each navigation instruction was followed by an associated GPS image. </p>
<img width="500" src="https://github.com/karimsammouri/MU-CSE-383/blob/main/Final/Screenshots/NavigatorLive.png">

<h2>History Page</h2>
<p>Allows the user to view previous navigation queries based on a given date. This feature relied on a phpLiteAdmin setup on a temporary 
AWS EC2 instance provided by the course. Since I no longer have access to the EC2 instance, this feature no longer works and can't be demonstrated.</p>
<img width="500" src="https://github.com/karimsammouri/MU-CSE-383/blob/main/Final/Screenshots/History.png">
