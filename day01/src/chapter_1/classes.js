
// У экземпляра класса должны присутствовать св-ва:
// -name string.
// -grade string Для простоты предположим, что система грейдов будет иметь значения от L1 до L4.
// -hardSkills string[].
// -company string.


// Так же должны иметься три метода:

// -changeCompany(newCompanyName) - сотрудник может сменить компанию, либо же просто уволиться.
// -upGrade() - сотрудник может повысить квалификацию.
// -addSkill(newSkillName) - сотрудник может дополнить список своих скиллов.



export class Employee {

    constructor(name, grade, hardSkills, company) {
    this.name = name;
    this.grade = grade;
    this.hardSkills = [];
    this.company = company;
    }
    changeCompany(newCompanyName) {
            return this.company += newCompanyName
        }

     upGrade() {
     const grades = ['L1', 'L2', 'L3', 'L4'];
    let currentGradeIndex = grades.indexOf(this.grade);
    this.grade = grades[currentGradeIndex + 1];
    }
        
     addSkill(newSkillName) {
       return this.hardSkills.push(newSkillName);
    }

    // toString () {
    // return `${this.name} ${this.grade} ${this.company} ${this.hardSkills}`; // метод созданный для проверки класса на работоспособность
    //}
}
    // res.addSkill('ci/cd, docker, js')
    //  res.addSkill('js')
    // console.log(res.toString());