# Resume Parser

A Simple NodeJs library to parse Resume / CV to JSON.

This library parse through CVs / Resumes in the word (.doc or .docx) / TXT / PDF format to extract the necessary information in a predefined JSON format. If the CVs / Resumes contain any social media profile links then the solution should also parse the public social profile web-pages and organize the data in JSON format (e.g. Linkedin public profile, Github, etc.)

## Usage

```
const ResumeParser = require('resume-parser');

// From file to file
ResumeParser
  .parseResumeFile('./files/resume.doc') // input file, output dir
  .then(json => {
    console.log(json);
  })
  .catch(error => {
    console.error(error);
  });

// From URL
ResumeParser
  .parseResumeUrl('http://www.mysite.com/resume.txt') // url
  .then(data => {
    console.log('Yay! ', data);
  })
  .catch(error => {
    console.error(error);
  });
```

At this moment application will work fine, but! By default it anything that listed on [ anytext]( https://www.npmjs.com/package/any-text).

## Extending

All 'action' are by building `src/dictionary.js` file. For now it has only basics rules, but it's very flexible (although a bit complicated) and extensible. Just put your rule according to existing and following main principles and enjoy!

## Contributions

Thanks to 
- [Alexey Lizurchik](https://github.com/likerRr) [https://github.com/likerRr/code4goal-resume-parser](https://github.com/likerRr/code4goal-resume-parser) 
- [Parminder Klair](https://github.com/perminder-klair) [https://github.com/perminder-klair/resume-parser](https://github.com/perminder-klair/resume-parser) 

