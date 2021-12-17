
function showFoto() {
    document.querySelector('.foto-block').innerHTML = `<img src="${data.photo}" alt="${data.first_name} ${data.last_name}" class="img-thumbnail rounded-circle mt-3 mb-3"/>`;
}

function showSkills() {
    let skillsData = '';
    data.skills.forEach(item => {
        skillsData += `<li>${item}</li>`;
    });
    document.querySelector('.skills-list').innerHTML = skillsData;
    document.querySelector('.address').innerHTML = `<p>${data.address}</p>`;
}

function showContact() {
    let contact = document.querySelector('.contacts-block');
    contact.innerHTML += `<li><a href="tel:${data.phone}">${data.phone}</a></li>`;
    contact.innerHTML += `<li><a href="mailto:${data.email}">${data.email}</a></li>`;
    contact.innerHTML += `<li><a href="callto:${data.skype}">${data.skype}</a></li>`;
    contact.innerHTML += `<li><a href="${data.linkedin}">${data.linkedin}</a></li>`;
}

function showEducation() {
    let educationData = '';
    data.education.forEach(item => {
        educationData += `<li>${item[0]}, ${item[1]}</li>`;
    });
    document.querySelector('.education-list').innerHTML = educationData;
}

function showAchievements() {
    let achievementsData = '';
    data.achievements.forEach(item => {
        achievementsData += `<li>${item},</li>`;
    });
    document.querySelector('.achievements-list').innerHTML = achievementsData;
}

function showNameSurJob() {
    document.querySelector('.my-name').innerHTML = `${data.first_name} <span class="color-grey">${data.last_name}</span>`;
    document.querySelector('.job-title').textContent = data.job_title;
    document.querySelector('.profile-data').textContent = data.profile;
}

function showExperience() {
    let expirienceData = '';
    experience.forEach(item => {
        expirienceData += `<section class="mb-5">`;
        expirienceData += ` <h4 class="company-name mb-2">${item.company} - ${item.city}, <i>${item.from} - ${item.to}</i></h4>`;
        expirienceData += `<h5 class="mb-3 experience color-grey">${item.position}</h5>`;
        expirienceData += `<p>${item.description}</p>`;
        expirienceData += `</section>`;
    });
    document.querySelector('.experience-list').innerHTML = expirienceData;
}

showFoto();
showSkills();
showContact();
showEducation();
showNameSurJob();
showAchievements();
showExperience();
