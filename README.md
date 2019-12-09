# «Beauty Salon» - a beauty salon for men and women
The application contains several pages: "Home", "Services", "Login" - a page for authentication, "Appointment" - a page for booking an appointment and "Account". On "Home" page you can find information about salon and a team of the salon. On "Services" page you can find a list of services for men and women. Booking an appointment is available only for authenticated clients. "Account" page stores all appointments of users and personal information about users (phone and name which are necessary for booking an appointment). Every user not only can book or cancel appointments after login ("Account" page), but also can change the personal information.

## Technology stack and techniques used in project:
	* Antd library
	* Firebase Realtime database
	* Redux Form
	* Redux Thunk
	* Axios
	* BEM methodology
	* CSS Flex Layout
	* Responsive Web Design approach
	* Test Runner: Jest, Testing Utilities: Enzyme

## You can use commands bellow to run project:
	* npm install
	* npm start

## For testing:
	* npm install --save jest enzyme-adapter-react-16 react-test-renderer
  * documentation - https://jestjs.io/docs/en

### Project overview:

- Antd library allows to import ready components in the project. Components like navigation menu, buttons, cards and others have been imported for styling.
- HTTP requests such as GET, POST, PUT and DELETE are done by Axios. Axios allows not only to intercept request and response and automatic transform JSON data, but also to handle errors from backend.
- Firebase Realtime database has been used for storing data about services, appointments and personal information of clients. Authentication has been done by Firebase. Also, only authenticated users have access to appointments and personal information. This protection has been achieved by setting rules in Firebase.
- Local Storage is used for storing token, id of a user and expiration time during one hour to allow the user use an application even after reloading or updating the application without login again.
- Some pages like "Account", "Logout" and "Appointment" are not available for not authenticated users. These users will be redirected to "Home" page if they try to get access to the pages.  
- Redux Thunk has been used for writing async action creators.
- Redux Form. Individual validators for each field have been used to provide synchronous client-side validation to the form. If the value is valid, the validation function returns undefined. If the value is invalid, the validation function returns an error. This is a string, which displays to user immediately.
- Responsive Web Design has been achieved through flexboxes and media expressions.
- The application is cross browser compatible with Chrome, Firefox, Edge.
- Tests have been written only for reducers. 
