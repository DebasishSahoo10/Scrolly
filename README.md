<h1 align="center">Scrolly 🤳</h1>


## 🙂 About
This Project is a Social Media app and has been coded to showcase React Skills (Frontend in general) under the Fifth Asignment of NeoGcamp. So for the front end is on React and to mock the backend (mostly API calls) [MockBee](https://mockbee.netlify.app/) has been used. And to put User Authorisation in place JWT Tokens has been used. The Template that has been used is `Vite's React + JavaScript`. Mockbee doesn't not natively support Vite's templates, that's why I need to change few stuffs in backend code, majorly with the help of NeoGcamp community, a huge thanks to everyone who helped.

## 🏁 Getting Started
To get your own copy of the Project (to run it on your local server). First Fork this repo. then open the repo in your choice of IDE. then follow below steps
1. create a .env file in the root folder and put this in that file
    ```
     REACT_APP_JWT_SECRET = "ANY_STRING_WILL_GO_HERE_IN_THIS_FORMAT"
    ```
2. Install NPM Modules
    ```
    npm install
    ```
3. And finally to run this on your local host
    ```
    npm run dev
    ```
and there you go ✳️

## 🚀 Features and Utilities
- **Infinite Scrolling** (All the data doesn't load initially, some initial data loads on the first render, then with the help of Intersection Observer, app tracks if user has scrolled all the rendered data, and only then it will render some more data. PS : Mockbee's APIs doesn't natively comes with fetch rate limit, so this is more like a walkround)
- **User Image Upload** (User can upload images from his local device. with the native browser API `URL.createObjectURL`, it is working as expected)
- **Link Copying to System Clipboard** (Whenever user clicks on share icon, the link of the app gets copied to his system's clipboad. With another native API `navigator.clipboard.writeText`, this became possible)
- **Event Delegation** (While user selects from list of Avatars, instead of attaching each DOM node of all the avatars, I attached the event listener to the parent container. React uses it in their codebase, so I just wanted to test it somewhere.)
- **All the Features from my last Project** (every feature like SPA, Full Responsiveness, Private Routes, Toasts, Lazy Imports, Redux Toolkit for state management from my [last project](https://github.com/DebasishSahoo10/The-Look-Shop) is there in this one too.)
- **All the Typical Social Media Actions** : (Follow, Unfollow, Bookmark, Add Post, Edit Post, Delete Post, Change Bio, Change Profile Picture, Change Portfolio URL, Search Users)

## 🦄 What is different from previous projects
- Improved Lighthouse Perfomance : In the last Project, I faced a major problem of Cumulative Layout Shifts(CLS). So for this one, I have managed to reduce it drastically and grab it down to the safe number. Some other perfomance improvements are also done. 
- CSS Moduling : Overflowing of CSS values and Leaking of Selectors have irritated to me the HELL, in the last project. In this one, I have used CSS Modules from the day one, so maintaining is really really better here.
- Cleaner Code : I have got a good sense from the last project where my components are event calls are getting bigger and messsier, so for this one, I have tried to write even cleaner and more maintainable components.

## ✍️ Design and Credits
For this project, I gave myself a challenge. Earlier, I used to design the app in a way where it will be easier for me to code. But in the industry, this is not the process. So when I sat down to design this, I designed the whole app from the point of view of 'what is the best modern and unique looking design I can pull off'. And then I took the challenge to re-create it in the code. Your reviews are welcome on this. I have tried, but couldn't follow any design style, if you find some neubrutalism touches, those were not-intended. the full figma file goes here : 
- [Figma File](https://www.figma.com/community/file/1256511911372216955/Social-Media---SCROLLY)

## 🎈 Future Versions
I have not decided if I will be adding any new things to the app or not, as I already completed all the requirements for the assignement, but Hey who doesn't want his app to be perfect, so I will try my best, below are some of the possible future additions. And I welcome everyone to send the Pull Requests on anything, you feel, should be improved:
- Comments : Currently this feature is not there as it requires another level of complexities. So might add it later.

## 🤜🤛 Connect with me
Thank you for checking this project out. If you have any queries regarding the project or have some suggestions, feel free to connect with me on my social links given below :

[![Twitter Link](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/dddddddeeeeevvv)
[![Linkedin Link](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/debasishsahoo1998)