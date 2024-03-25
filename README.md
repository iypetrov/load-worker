# SET UP

Create **.env** file in the root directory with content like this (don't forget to add an empty line at the end):
```
ENVIRONMENT=DEV
CLIENT_ID=some-id
CLIENT_SECRET=some-secret
USERNAME=admin@email.com
PASSWORD=admin
```
- **ENVIRONMENT** - DEV, TEST, STAGING, PROD
- **CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD** - use your own


After that run:
- `$ npm install`
- `$ npm run bundle`

# HOW TO USE

Look at `scripts` folders and use some of the bash scripts (explained there)

If you can't run a script, try:
- `$ chmod +x file.sh`
- `$ dos2unx file.sh`

# K6
 
Make sure that all K6 tests:
- are in `src` folder
- name of the tests should end with `*-test.ts`