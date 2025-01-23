This guide explains how to create prototypes using GOV.UK Prototype Kit and using the MOJ Frontend

## Manual installation

You can install the GOV.UK Prototype Kit and MOJ Frontend manually. You must follow the [GOV.UK Design System prototype setup guide](https://design-system.service.gov.uk/get-started/prototyping/) first. Once you've done that, continue below.

### Installing MOJ Frontend

The CPS Design System uses a lot of patterns from MOJ Frontend and it is useful to install this as well. To install it, run these steps:

1. open Terminal
2. change the directory to your prototype. For example, `cd path/to/prototype`
3. run `npm install @ministryofjustice/frontend --save`
4. add `window.MOJFrontend.initAll()` to `app/assets/javascripts/application.js` below the line doing the same for `GOVUKFrontend`

## Updating MOJ Frontend

The current version of MOJ Frontend is **3.3.1**.

You can check which version your prototype is running by opening `package.json` in the root folder of your prototype. Look for `"@ministryofjustice/frontend"` under `"dependencies"`.

To update your prototype to the latest version of MOJ Frontend:

1. open `package.json` in the root folder of your prototype in a text editor
2. Under `dependencies`, update the reference to MOJ Frontend to `"@ministryofjustice/frontend": "3.3.1",`
3. save `package.json`
4. open Terminal/command line
5. change the directory to your prototype's directory. For example, `cd path/to/prototype`
6. run `npm install`
