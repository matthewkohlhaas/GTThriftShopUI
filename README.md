# GT ThriftShop Web Application (Front End)

## Release Notes - Version 1.0:

### New Features:

* User Interface has been overhauled to make it more responsive (support more screen sizes)
* Users can now explicitly make an offer on an item listing
* A new settings screen allows users to unblock users that they have previously blocked
* Item listings can now have multiple images
* The item listings feed can now be filtered by category
* Users can now manage and close their listings

### Bug Fixes

None

### Known Bugs and Defects

None

## Install Guide

### Pre-requisites

* Node.js is needed to run the project. The node installer can be downloaded at https://nodejs.org/en/download/
* Angular CLI is needed to run and build the project
  * To install, run "npm install -g @angular/cli" in a terminal after first installing node
  * More information can be found at https://cli.angular.io/
  
### Dependencies

Node Package Manager handles all this project's dependencies. Running "npm install" in the main project directory will automatically install all necessary dependencies.

### Download Instructions

* The code can be downloaded as a .zip from the project's repository at https://github.com/matthewkohlhaas/GTThriftShopUI
* This project's repository can also be cloned by running "git clone https://github.com/matthewkohlhaas/GTThriftShopUI.git"
* If you don't have git, an installer can be downloaded at https://git-scm.com/downloads

### How to Run Locally

* First, make sure a MongoDB database and an instance of the web service are running
  * Instructions to do this are in its documentation at https://github.com/matthewkohlhaas/GTThriftShopUI
* Open a terminal in the main project directory and run "npm install" (This must be done only once)
* In the same terminal, run "ng serve"
* To use the web app, open a web browser such as Google Chrome and visit http://localhost:4200

### How to Prepare the Project for Deployment

Open "src/environments/environment.prod.ts" and set "DOMAIN" to the URL that the application will be deployed to, eg. 'gtthriftshop.com' (do not include 'https://' or a '/' at the end).

### How to Build

Open a terminal in the main directory of the project and run "ng build --prod --base-href "https://gtthriftshop.com/"." If you are deploying to a different domain than gtthriftshop.com, use that domain in its place. After building, the built application will be in the "dist" directory.

### How to Deploy

First, purchase a domain name from a domain name registrar such as GoDaddy. If available, try to register gtthriftshop.com or some variation on it. Next, choose a web hosting service such as HostGator, and set up an account. Many services that offer web hosting also offer domain name purchases, so you can kill two birds with one stone. In fact, both HostGator and GoDaddy offer domains and web hosting. Once your hosting services account is set up, upload all the files located in "dist" to the space provided by the web hosting service.

* Domains names can be registered with GoDaddy at https://www.godaddy.com/domains/domain-name-search
* HostGator web hosting can be found at https://www.hostgator.com/web-hosting

### Troubleshooting

When running the app, you may encounter the error message, "Error: Cannot find module." Make sure to install all necessary dependencies by opening a terminal in the main project directory and running "npm install." If the problem persists, delete the folder, "Node Modules," if it exists and try again.
