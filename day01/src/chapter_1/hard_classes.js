import { Employee } from "./classes";

export class Company {
    constructor(companyName, currentProjects, completedProjects, staff) {
        this.companyName = companyName;
        this.currentProjects = [];
        this.completedProjects = [];
        this.staff = {
            developers: {
                frontend: [],
                backend: []
            },
            managers: []
        };
    }

    addProject(task){
        this.currentProjects.push(task);
    }
    addNewCompanyMember(projectName){
        if (projectName instanceof FrontendDeveloper) {
            this.staff.developers.frontend.push(projectName)
        } else if (projectName instanceof BackendDeveloper) {
            this.staff.developers.backend.push(projectName)
        } else if (projectName instanceof Manager) {
            this.staff.managers.push(projectName);
        }
        projectName.Company = this.companyName
    }

    getMembersQuantity() {
        return this.staff.developers.backend.length + this.staff.developers.frontend.length + this.staff.managers.length
    }

    completeProject(project){
        let indexprod = this.currentProjects.indexOf(project);
        this.currentProjects.splice(indexprod, 1);
        this.completedProjects.push(project);
        if (project.team.manager) {
            project.team.manager.projectQuantity += 1;
        }
        project.team.developers.frontend.forEach(dev => dev.projectQuantity += 1);
        project.team.developers.backend.forEach(dev => dev.projectQuantity += 1);

    }
}
export class Project {
    constructor(ptojectName, minQualification){

        this.ptojectName = ptojectName;
        this.minQualification = minQualification;
        this.team = {
            manager: null,
            developers: {
                frontend : [],
                backend : []
            }
        };
    }    
    addNewProjectMember(member) {
        if (member instanceof Manager) {
            if (this.team.manager === null && member.grade >= this.minQualification) {
                this.team.manager = member;
            }
        }
        if (member instanceof FrontendDeveloper && member.grade >= this.minQualification) {
            this.team.developers.frontend.push(member);
        }
        if (member instanceof BackendDeveloper && member.grade >= this.minQualification) {
            this.team.developers.backend.push(member);
        }
    }
}

export class Manager extends Employee {
    constructor(name, grade, hardSkills, company) {
        super(name, grade, hardSkills, company);
        this.projectQuantity = 0;
    }

    checkMember(minQualification, member) {
        return member.grade >= minQualification && member.company === this.company;
    }
    
    }

export class FrontendDeveloper extends Employee {
    constructor(name, grade, hardSkills, company) {
        super(name, grade, hardSkills, company)
        this.stack = []
        this.developerSide = 'frontend';
        this.projectQuantity = 0;
    }
    expandStack(newTech) {
        this.stack.push(newTech);
    }
}

export class BackendDeveloper extends Employee {
    constructor(name, grade, hardSkills, company) {
        super(name, grade, hardSkills, company)
        this.stack = [];
        this.developerSide = 'backend';
        this.projectQuantity = 0;
    }
    expandStack(newTech) {
        this.stack.push(newTech);
    }
}