# README #

### API-Automation ###

    API Test Automation build with

    | Tools & Technologies    |
    |---------------------    |
    | Cypress                 |
    | BDD                     |
    | Java Script             |
    | POM                     |

### Prerequisites ###

    Make sure you have installed the following prerequisites on your development machine:

    | OS      | Node                                       |
    |---------|--------------------------------------------|
    | Windows | `winget install OpenJS.NodeJS.LTS`         |
    | macOS   | `brew install node@latest`                 |

### Files System ###

    -- cypress
        -- e2e (Test Inside e2e)
            -- features 
            -- step_definitions
        -- fixtures (Data)
        -- support (Support folder)
            -- commands.js (common util)
            -- e2e.js (loaded before test dependencies e2e)
        -- reports (reports)
    -- cypress.config.js (config)
    -- cypress.report.js (report generator)
    -- Dockerfile 
    -- package.json (package management)

### How Do I Get Set Up? ###

    * Link : https://github.com/sajjasivakumar/r3.git
    * Do git clone into your machine

### Contribution Guidelines ###

    * Cd to console-ui-automation
    * Do git pull
    * Make sure master is update date
    * Create a branch from master
    * Work on branch 
    * Add and Commit your changes
    * Add reviewer and get it approved
    * And Merge your changes to master
    * Delete your Branch in local as in upstreams 
    * Do fllow same steps every time 

### Executing The Tests ###

    * Build the project

    ```shell
    ncu -u
    ```
    ```shell
    npm install
    ```
    OR
    ```shell
    npm i
    ```

### Run In CLI ###

    ```shell
        npx cypress run
        npm run report
    ```

### Run The Test In parallel ###

    ```shell
    npm run clean
    ```
    ```shell
    npm run cy:parallel
    ```
    ```shell
    npm run report
    ```

### Open Cypress Runner UI ###

    ```shell
        npx cypress open
    ```

### To Build This Image Just Use The Following Command Line ###

    ```shell
    docker build -f Dockerfile -t api-automation .
    docker image ls -a
    docker run -it <IMAGE ID> /bin/bash
    ```
### Total Feature Tags ###

Total Count:

    |   Name                 | Count                  |
    |----------------------  |----------------------  |
    | No of Feature Files    | 01                     |
    | No of Tests Scenario   | 05                     |
    | Runing Tests Scenario  | 05                     |


### To Run An Example ###

* Run with mutiple tags
   
    ```shell
        npx cypress run --spec 'cypress/e2e/features/*.feature' --headed --env TAGS='@APITest'
    ```
    
* TAG INSTANCE: Headless Chrome

    ```shell
        npx cypress run --spec cypress/e2e/features/*.feature --headed --browser chrome --config baseUrl=https://open.er-api.com/v6,retries=0 --env test_env=sandbox,TAGS=@APITest
    ```

### Who do I talk to? ###

    * Repo owner or admin siva.sajja68@gmail.com
