const fs = require('fs');
const content = fs.readFileSync('C:/Users/SDN WEDUSAN/.gemini/antigravity/scratch/deep-learning-modul-ajar/js/curriculum-db.js', 'utf8');

// We can extract all subject IDs by loading the DB if it is formatted as an export/global object
// Since curriculum-db.js defines a global variable CURRICULUM_DB, let's execute it in a VM context.
const vm = require('vm');
const context = {};
vm.createContext(context);
vm.runInContext(content, context);

const db = context.CURRICULUM_DB;
const subjectList = [];
if (db) {
  for (const kelas in db) {
    if (db[kelas].subjects) {
      db[kelas].subjects.forEach(s => {
        subjectList.push({ class: kelas, id: s.id, title: s.title });
      });
    }
  }
}

console.log(JSON.stringify(subjectList, null, 2));
