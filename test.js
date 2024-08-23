const ResumeParser = require('./src');

const fileDir = process.cwd() + '/files/';
ResumeParser
	.parseResumeUrl("https://api.hubbedin.com/v1/files/79a7cd52-a9b3-404f-bfec-6818ab6487d7.pdf")  //input file, output dir
	.then(file => {
		let resume = { ...file }

		let name = (resume?.name || "").split(" ");
		let lastName = name.pop();
		let firstName = name.join(" ");

		let candidate = {
			firstName,
			lastName,
		}

		if (resume.phone) {
			candidate.phones = [resume.phone];
		}

		if (resume.email) {
			candidate.emails = [resume.email]
		}

		if (resume.profiles) {
			candidate.websites = [resume.profiles]
		}

		if (resume.skills) {
			candidate.skills = [resume.skills.replace(/(?:\r\n|\r|\n)/g, ',').split(",").filter((n) => { return n.trim() })]
		}

		if (resume.education) {
			candidate.educations = [
				{
					description: resume.education
				}
			]
		}

		if (resume.experience) {
			candidate.experiences = [
				{
					description: resume.experience
				}
			]
		}

		console.log(JSON.stringify(candidate));

	})
	.catch(error => {
		console.log('parseResume failed', error);

	});
