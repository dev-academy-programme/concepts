# Developing for mobile

Less than 50% of people use desktop to view web pages now, so it's fairly foolish to not bear this in mind when we are slapping web pages together.

So what does mobile first actually look like in a development practice context? And how exactly can you do it effectively?

Luckily we have lots of fabulous tools to help us!

## Stylesheets

Let's just spend a quick moment on stylesheets.
A 'mobile first' approach on stylesheets means that all you base styles a written for the mobile format of the page, and then you use media queries to specify the desktop and tablet styles.

This approach will need a fairly open communication with your designer (if the project has one) as it will mean that you will require all the mobile designs first and formost. In my experience I have found that quite a hard nut to crack and I often find that mobile designs can be sent on as an afterthough. In order to make this work, it is important the mobile designs are locked in first. Often the markup and content will differ across the platforms, so it will affect how you structure your html.

Kotare's final project did a really good job of mobile first approach,

- [tandem](https://github.com/Tandem-NZ/tandem/blob/master/public/styles/sass/_desktop.scss)

## Debugging mobile

There are loads of different ways we can debug and play with mobile, the first is obviosuly to shrink our browsers to size. However, that can sometimes not work.

Due to the enormity of some client side files, a popular technique is to use JS to sniff out what device someone is browsing on, and from that only deliver certain styles/js/html. This is becoming more common in front end work as Google search ranking will now depcrecate your website if it is carrying thousands of lines of unused styles. (side note - it also ranks your site on how mobile friendly it is and this will effect the search algorithm as well)

Compare for example the [woolandthegang](https://www.woolandthegang.com) website shrunk, and the chrome iphone 5 simulator.

However, although the chrome simulator is getting better by the day, it is still not quite perfect. At this point (for some reason) there is a clear difference between the chrome version of iPhone 5 and the view I see on my iphone 5.

Luckily, there are more options to us!

**localhost on mobile**

The wonders of the wifi network mean that you can access the server you are running on your computer from your phone.

- check your phone is running on the same wifi network
- find the IP address of your computer
- in your phones search bar, use the ip in place of 'localhost', eg, if your machines IP address was '192.168.0.100' type in '192.168.0.100:3000' as your web address and VIOLA! You will have your app running on your phone, being served from your computer.

**Inspecting iphones with safari**
There are two options now for debugging iphones
The first (and I find most useful) with safari
This works for any ios devices, so all the ipads ect, which is SUPER USEFUL!

- On your iPad, iPhone or iPod touch, tap Settings > Safari > Advanced and toggle on Web Inspector.
- On your Mac, launch Safari and go to Safari menu > Preferences > Advanced then check “Show Develop menu in menu bar”, if you have not done so already.
- Connect your iOS device to your Mac with the USB cable.
- Now on your iPad open the web site that you want to debug, then, on your mac, open Safari and go to the “Develop” menu. You will now see your iOS devices that you have connected with your Mac. If you do not have any page open on your iOS device, you will see a message saying “No Inspectable Applications”.
- Now you can debug the page that is open on mobile Safari just like you would debug on Mac, inspect DOM elements, modify CSS, measure page performance and run Javascript commands.XS

http://appletoolbox.com/2014/05/use-web-inspector-debug-mobile-safari/


Xcode also has a new simulator, though this is only for iphone 6 and above

- open xcode
- select debug
- select your weapon (phone) of choice!

**Inspecting androids with chrome**
Pretty much exactly the same applies with Chrome and android devices. In the phone settings you can select developer mode and then inspect it from the browser

here is a useful blog on how to do this:
https://developer.chrome.com/devtools/docs/remote-debugging

## Extra excitment, demo-ing your mobile things on desktop

- Have your iphone plugged in
- Open quicktime player on your mac
- select the little arrow on the dropdown, and select your phone