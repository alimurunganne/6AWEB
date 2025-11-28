import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-home',
standalone: true,
imports: [RouterOutlet, CommonModule],
templateUrl: './home.html',
styleUrls: ['./home.css'],
})
export class Home {
// Profile Image
profileImageURL = '/assets/images/anne-profile.jpg';

// Personal Information
fullName = 'Anne Nichole Alimurung';
location = 'Angeles City';
mobile = '0994 387 8418';
email = '[annenicholealimurung@gmail.com]';

// Personal Profile
personalProfile = `     I am a motivated Web Development student with a strong interest in creating responsive,
    user-friendly websites and applications. Through coursework and personal projects, I have
    gained practical experience with modern web technologies and enjoy learning new tools that
    enhance the user experience. I am seeking opportunities such as internships, part-time roles,
    or project collaborations to apply my skills, grow as a developer, and contribute to
    real-world digital solutions.
  `;

// Key Skills
keySkills = [
'Frontend Development (HTML5, CSS3, JavaScript)',
'Modern Frameworks (Angular, React, Vue.js)',
'UI/UX Design Principles',
'Version Control with Git and GitHub',
'Backend Development (Node.js, Python, PHP)',
'Database Management (MySQL, NoSQL, MongoDB)',
'System Planning and Technical Documentation',
'Agile Development and Team Collaboration',
];

// Technical Proficiencies
technicalProficiencies = {
designTools: ['Figma'],
development: ['HTML5', 'CSS3', 'Responsive Design', 'Basic UI/UX'],
toolsAndPlatforms: ['VS Code'],
};
}
