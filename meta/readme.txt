IN5320 Assignment 2 - Add lecture schedules to your google calendar!
Created by Håvard Wanvik Stenersen
Contact: haavaws@ifi.uio.no



This web application allows you to retrieve lecture schedule for courses at UiO and add them to your google calendar.
To add events to your calendar, it is necessary to sign in to google and allow the web app to make changes to your calendar. This sign-in is done via Google's authentication interface, which means no log-in information is seen by the app.

Information handled by this app: Calendar names in you Google Calendar. Adding events to your Google Calendar.
No data from your Google account is stored apart from session information which google stores in the browser.
The only information stored by this application is cached data about courses in a semester from the UiO data API. No usage data is stored.



The application was created from the create-react-app template, and is thus based on that template.



The following account, created by me, can be used, which is also associated with the client ID and API key required to interact with the google API:
Username:
in5320oblig2test@gmail.com

Password:
IN5320Oblig2Test123

I give anyone who wishes to test, use, build upon, etc. this web application full permission to make use of the previously mentioned account.



Usage:
The uppermost section of the user interface handles interaction with Google. By pressing the 'Sign in' button, you will be prompted to sign in to google, after which you will be prompted to give this web app permission to access and change your Google Calendar. After granting signing in and granting permission, the section will change to have a 'Sign out' and an 'Add to calendar' button. By pressing the sign out button, you will be signed out of Google, and you will at the same time revoke permission for this web application to read and make changes to your Google Calendar. The 'Add to calendar' button will open a prompt through which you will be able to add any events you have selected in the application to your Google Calendar. At this point, the web application will retrieve all calendars associated with your Google Calendar that you have permission to write to. You will then be able to select one of these calendars through a DDL, and can then submit the selected lecture events to the selected calendar. The application will then add those events to your Google Calendar, and you will receive a resonse notifying you if the action was performed successfully.
The next section contains fields which help you search for courses whose schedules you can add to your Google Calendar.You will be able to select from  10 years, including the current year, next year, and eight years in the past.In addition, you can choose between the autumn and spring semester.Changing the year or semester fields will make a request to the UiO data API(http://data.uio.no/studies/v1), to get all the courses for the matching year-semester combination. This information will be stored locally, and will be considered expired when it is an hour old, at which point it will be deleted whenever a new request is made. Typing the search field will filter the courses of the selected year-semester combination. This filter is implemented as a prefix filtering, meaning it matches any course that starts with the search string.
Next is the first list that appears. This is the list of courses specified by the fields in the previous section. Clicking on a course, or hitting enter in the search field, will make a request to the UiO data API for the lecture schedule of that particular course for that year-semester combiation. If the width of the application is sufficiently small, the list of courses will then be hidden, otherwise, it will take up space to the left of the screen, and the schedule for lectures will appear to the right, or as the sole list, in place of the list of courses.
In that section, you will be able to select the events that you want to add to your calendar. The first thing that will appear is a list of the different types of lectures that are included in the course. Clicking on one of these will reveal all the events associated with that type of lecture. Clicking on these events will select them, and clicking them again will deselect them. You can also select events by group, by clicking on the check mark next to the group descriptor, which will select everything from that group, or by clicking the check mark in the header, which will select all events in the schedule. Clicking on these check marks will select all associated events regardless of if you have already selected any courses from the associated group or elsewhere, and if you press the check mark when ALL associated events have already been selected, all associated events will then instead be deselected. Clicking the back arrow in the header, or on the same course in the course list will close the schedule and reset any selections you have performed. Clicking on another course will close the current schedule and open the schedule for the selected course, which will also reset any selections you have made.
After you have selected the desired events, you can sign in, if you haven't already, and then add them to your Google Calendar if you wish, by doing as explained above.
Note that the application does not include any functionality for removing events, added or preexisting, although the persmissions granted to the application when signing in do allow for it.




Installation:
1. Place the "img", "public" and "src" folders into a single directory.
2. Navigate to the directory in terminal and execute "npm install"
3. Then execute npm start
Note: The domain this web-app runs on needs to be white-listed for the ClientID and API key used. Currently, only localhost is whitelisted, and is probably sufficient for testing. More domains can be whitelisted as explained in step 6. of the Troubleshooting seciton, or you can send me an e-mail at haavaws@ifi.uio.no if you want me to whitelist other domains.



Troubleshooting:
1. There is an issue where the Google API will for unknown reasons fail to load and respond. Simply reloading the page should fix the issue.
2. There is an issue where the Google API will fail to load. This issue is cause by your browser disallowing third party sites to store cookies and other data. Enabling this is likely to fix the issue.
3. Make sure scripts are allowed.
4. The UiO data API seems to be at least somewhat unstable, and was down for a few days previously. If courses aren't being loaded, this may be why. A link should appear to let you check for yourself if the API is still up. Please note that even should the courses fail to fetch due to API error, manual fetching of schedules may still be available. This can be done by simply typing in the exact code of the course (i.e. IN5320) in the search field, followed by hitting enter. This will open the schedule for that particular course if the API is available.
5. The web app has only really been tested with Google Chrome, and somewhat with Firefox, and only the most recent version(Chrome: Version 69.0.3497.100(Official Build)(64 - bit); Firefox: 62.0.3(64 - bit)). As such other browsers may display odd behaviour or simply not work.
6. Please note that the Google API requires whitelisting of domains for API requests.This means that any request that is made with the specified client ID and API key will fail if they are made from any other domain. Localhost is whitelisted and may be used, otherwise, other domains may be added to the whitelist using the "Authorized domains" field at this(https://console.developers.google.com/apis/credentials/consent?project=in5320-assignment-2) address, and the "Authorized JavaScript origins" field at this (https://console.developers.google.com/apis/credentials/oauthclient/474152757205-e909mipnlaeaq9d0h3235q3tkr3seu8r.apps.googleusercontent.com?project=in5320-assignment-2) address, or send an e-mail to me at (haavaws@ifi.uio.no) and I can add it for you. Make sure to log in with the test user provided above, or create your own credentials by following step 1 here (https://developers.google.com/calendar/quickstart/js), and adding the ClientID and API key to the App state in the clientId and apiKey fields.



Copyright:
The images used in this web application are all licensed:
/img/PacmanLoading.svg - CC0 License - Unrestricted free use: https://loading.io/
/img/EclipseLoading.svg - CC0 License - Unrestricted free use: https://loading.io/
/img/BackIcon.png - CC BY-ND 3.0 (https://creativecommons.org/licenses/by-nd/3.0/) - Requires attribution: https://icons8.com/icon/60636/back
/img/CancelX.png - CC BY-NC 3.0 (https://creativecommons.org/licenses/by-nc/3.0/) - Requires attribution: https://www.iconfinder.com/icons/103181/close_cross_delete_remove_icon
/img/CheckedCheckmark.png - CC0 License - Unrestricted free use: https://www.iconsdb.com/green-icons/check-mark-3-icon.html
/img/CheckedCheckmarkSmall.png - Same as above
/img/UncheckedCheckmarkSmall.png - CC0 License - Unrestricted free use: https://www.iconsdb.com/guacamole-green-icons/check-mark-3-icon.html

Acknowledgements are made in the application footer.



Disclaimer: This web application is in no way associated with, nor endorsed by, the websites mentioned above and Google.