const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

let deep = 3;
run_tasks('tasks');

function run_tasks(tasks_path) {
    if(--deep < 0){
        throw new Error('Something wrong in require tasks!');
        return;
    }

    tasks_path = path.join('../', tasks_path);

    if(fs.existsSync(tasks_path)){
        require(tasks_path)(gulp);
    }else{
        run_tasks(tasks_path)
    }
}